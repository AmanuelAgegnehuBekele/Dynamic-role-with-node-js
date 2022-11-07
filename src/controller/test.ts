import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { defineAbilitiesFor, ForbiddenOperationError } from "../casl/abilities";
import { getPerm, getUser } from "../utils/user";
import { testSchema } from "../validator/test";
const prisma = new PrismaClient();

export const createTest = async (req: Request, res: Response) => {
  const validate = await testSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validate.error?.message) {
    res.status(400).json({ message: validate.error.message });
  } else {
    const { name, date } = req.body;
    const courseId = req.params.courseId;
    try {
      const test = await prisma.test.create({
        data: {
          name: name,
          date: date,
          course: {
            connect: {
              courseId: courseId,
            },
          },
        },
      });

      res.status(201).json({
        message: "Test created successfully",
        test: test,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const test = await prisma.test.findMany({});
    if (test.length === 0) {
      res.status(404).json({
        message: "Test not found",
      });
    } else {
      res.status(200).json({
        test: test,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTest = async (req: Request, res: Response) => {
  try {
    const testId = req.params.testId;
    const test = await prisma.test.findUnique({
      where: {
        testId: testId,
      },
    });
    if (!test) {
      res.status(404).json({
        message: "Test not found",
      });
    } else {
      res.status(200).json({
        test: test,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTest = async (req: Request, res: Response) => {
  const testId = req.params.testId;
  const testExists = await prisma.test.findUnique({
    where: { testId: testId },
  });
  if (!testExists) {
    res.status(404).json({
      message: "Test not found",
    });
  } else {
    try {
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
  }
};

export const deleteTest = async (req: Request, res: Response) => {
  const testId = req.params.testId;
  const testExists = await prisma.test.findUnique({
    where: { testId: testId },
  });
  if (!testExists) {
    res.status(404).json({
      message: "Test not found",
    });
  } else {
    try {
      await prisma.test.delete({
        where: {
          testId: testId,
        },
      });
      res.status(200).json({
        message: "Test deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};
