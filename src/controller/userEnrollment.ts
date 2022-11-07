import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { defineAbilitiesFor, ForbiddenOperationError } from "../casl/abilities";
import { getPerm, getUser } from "../utils/user";
const prisma = new PrismaClient();

export const createUserEnrollment = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;
  try {
    const enrolledCourse = await prisma.courseEnrollment.create({
      data: {
        user: {
          connect: {
            userId: userId,
          },
        },
        course: {
          connect: {
            courseId: body.courseId,
          },
        },
      },
    });

    res.status(201).json({
      message: "Enrolled in course successfully",
      enrolledCourse: enrolledCourse,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserEnrollments = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const enroll = await prisma.courseEnrollment.findMany({
      where: {
        userId: userId,
      },
    });
    if (!enroll) {
      res.status(404).json({
        message: "You are not enrolled in any courses",
      });
    } else {
      res.status(200).json({
        enroll: enroll,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserEnrollment = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.session.user.userId;
    const enroll = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    if (!enroll) {
      res.status(404).json({
        message: "You are not enrolled in this course",
      });
    } else {
      res.status(200).json({
        enroll: enroll,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserEnrollment = async (req: Request, res: Response) => {
  try {
    const testId = req.params.testId;
    const body = req.body;
    const test = await prisma.test.update({
      where: {
        testId: testId,
      },
      data: body,
    });
    res.status(200).json({
      message: "Test updated successfully",
      test: test,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserEnrollment = async (req: Request, res: Response) => {
  try {
    const userId = req.session.user.userId;
    const courseId = req.params.courseId;
    await prisma.courseEnrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    res.status(200).json({
      message: "Course dropped successfully",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
