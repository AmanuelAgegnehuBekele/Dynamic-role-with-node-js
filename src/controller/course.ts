import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { defineAbilitiesFor, ForbiddenOperationError } from "../casl/abilities";
import { getPerm, getUser } from "../utils/user";

const prisma = new PrismaClient();

export const createCourse = async (req: Request, res: Response) => {
  const { name, courseDetails } = req.body;
  const userId = req.session.user.userId;
  const role = await getPerm(req.session.user.userId);
  const user = await getUser(req.session.user.userId);
  try {
    const abilities = await defineAbilitiesFor(role, user);
    ForbiddenOperationError.from(abilities).throwUnlessCan("create", "Course");
    const course = await prisma.course.create({
      data: {
        name: name,
        courseDetails: courseDetails,
        userId: userId,
      },
    });
    res.status(201).json({
      message: "Course created successfully",
      data: { course: course },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const role = await getPerm(req.session.user.userId);
    const user = await getUser(req.session.user.userId);
    const abilities = await defineAbilitiesFor(role, user);
    ForbiddenOperationError.from(abilities).throwUnlessCan("read", "Course");
    const course = await prisma.course.findMany();
    if (course.length === 0) {
      res.status(404).json({
        message: "Course not found",
      });
    } else {
      res.status(200).json({
        course: course,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    const role = await getPerm(req.session.user.userId);
    const user = await getUser(req.session.user.userId);
    const abilities = await defineAbilitiesFor(role, user);
    ForbiddenOperationError.from(abilities).throwUnlessCan("read", "Course");
    const course = await prisma.course.findUnique({
      where: {
        courseId: courseId,
      },
    });
    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
    } else {
      res.status(200).json({
        course: course,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const body = req.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        courseId: courseId,
      },
      data: body,
    });
    res.status(201).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  try {
    await prisma.course.delete({
      where: {
        courseId: courseId,
      },
    });
    res.status(200).json({
      message: "Course delete successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
