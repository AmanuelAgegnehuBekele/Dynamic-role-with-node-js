import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPermission = async (req: Request, res: Response) => {
  const { name, action, subject, fields, conditions } = req.body;
  try {
    await prisma.permission.create({
      data: {
        name: name,
        action: action,
        subject: subject,
        fields: fields,
        conditions: conditions,
      },
    });
    res.status(201).json({
      message: "Permission created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permission = await prisma.permission.findMany();
    if (permission.length === 0) {
      res.status(404).json({ message: "Permission not found" });
    } else {
      res.status(200).json({
        permission: permission,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getPermission = async (req: Request, res: Response) => {
  try {
    const permId = req.params.permId;
    const permission = await prisma.permission.findUnique({
      where: {
        permId: permId,
      },
    });
    if (!permission) {
      res.status(404).json({ message: "Permission not found" });
    } else {
      res.status(200).json({
        permission: permission,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  const permId = req.params.permId;
  const body = req.body;
  try {
    const updatedPermission = await prisma.permission.update({
      where: {
        permId: permId,
      },
      data: body,
    });
    res.status(200).json({
      message: "Permission updated successfully",
      permission: updatedPermission,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  const permId = req.params.permId;
  try {
    await prisma.permission.delete({
      where: { permId: permId },
    });
    res.status(200).json({
      message: "Permission deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
