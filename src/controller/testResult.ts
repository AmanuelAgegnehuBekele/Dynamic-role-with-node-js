import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { defineAbilitiesFor, ForbiddenOperationError } from "../casl/abilities";
import { getPerm, getUser } from "../utils/user";
import { testResultSchema } from "../validator/testResult";
const prisma = new PrismaClient();

export const createTestResult = async (req: Request, res: Response) => {
  const body = req.body;
  const validate = await testResultSchema.validate(body, {
    abortEarly: false,
  });
  if (validate.error?.message) {
    res.status(400).json({
      message: validate.error?.message,
    });
  } else {
    const testId = req.params.testId;
    try {
      const testResult = await prisma.testResult.create({
        data: {
          result: body.result,
          student: {
            connect: { userId: body.studentId },
          },
          gradedBy: {
            connect: { userId: body.graderId },
          },
          test: {
            connect: {
              testId: testId,
            },
          },
        },
      });

      res.status(201).json({
        message: "Test result created successfully",
        testResult: testResult,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getTestResults = async (req: Request, res: Response) => {
  try {
    const testId = req.params.testId;
    const testResult = await prisma.test.findMany({
      where: {
        testId: testId,
      },
    });
    if (!testResult) {
      res.status(404).json({
        message: "Test results not found",
      });
    } else {
      res.status(200).json({
        testResult: testResult,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTestResult = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const testResult = await prisma.testResult.findMany({
      where: {
        studentId: userId,
      },
    });
    if (!testResult) {
      res.status(404).json({
        message: "Test result not found",
      });
    } else {
      res.status(200).json({
        testResult: testResult,
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTestResult = async (req: Request, res: Response) => {
  const testResultId = req.params.testResultId;
  const testResultExist = await prisma.testResult.findUnique({
    where: { testResultId: testResultId },
  });
  if (!testResultExist) {
    res.status(404).json({
      message: "Test result not found",
    });
  } else {
    try {
      const body = req.body;
      const testResult = await prisma.testResult.update({
        where: {
          testResultId: testResultId,
        },
        data: {
          result: body.result,
        },
      });
      res.status(200).json({
        message: "Test result updated successfully",
        testResult: testResult,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
};

export const deleteTestResult = async (req: Request, res: Response) => {
  const testResultId = req.params.testResultId;
  const testResultExist = await prisma.testResult.findUnique({
    where: { testResultId: testResultId },
  });
  if (!testResultExist) {
    res.status(404).json({
      message: "Test result not found",
    });
  } else {
    try {
      await prisma.testResult.delete({
        where: {
          testResultId: testResultId,
        },
      });
      res.status(200).json({
        message: "Test result deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};
