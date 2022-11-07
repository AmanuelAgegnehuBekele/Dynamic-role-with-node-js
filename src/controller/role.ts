import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { roleSchema } from "../validator/role";
const prisma = new PrismaClient();

export const createRole = async (req: Request, res: Response) => {
  const validate = await roleSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validate.error?.message) {
    res.status(400).json({ message: validate.error.message });
  } else {
    const { name, description, permission } = req.body;
    try {
      const role = await prisma.role.create({
        data: {
          name: name,
          description: description,
        },
      });

      const roleId = role.roleId;
      let permissions: any = [];

      permission.map((p: any) => {
        permissions.push({
          permissionId: p,
          roleId: roleId,
        });
      });

      await prisma.permRole.createMany({
        data: permissions,
      });

      res.status(201).json({
        message: "Role created successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const role = await prisma.role.findMany();
    if (role.length === 0) {
      res.status(404).json({ message: "Role not found" });
    } else {
      res.status(200).json({
        role: role,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId;
    const role = await prisma.role.findUnique({
      where: {
        roleId: roleId,
      },
    });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
    } else {
      res.status(200).json({
        role: role,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const roleId = req.params.roleId;
  const roleExists = await prisma.role.findUnique({
    where: { roleId: roleId },
  });
  if (!roleExists) {
    res.status(404).json({
      message: "Role not found",
    });
  } else {
    const body = req.body;
    try {
      const updatedRole = await prisma.role.update({
        where: {
          roleId: roleId,
        },
        data: body,
      });
      res.status(200).json({
        message: "Role updated successfully",
        role: updatedRole,
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const roleId = req.params.roleId;
  const roleExists = await prisma.role.findUnique({
    where: { roleId: roleId },
  });
  if (!roleExists) {
    res.status(404).json({
      message: "Role not found",
    });
  } else {
    try {
      await prisma.role.delete({
        where: { roleId: roleId },
      });
      res.status(200).json({
        message: "Role deleted successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};
