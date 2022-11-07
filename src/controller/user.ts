import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getPerm, getUser } from "../utils/user";
import { defineAbilitiesFor, ForbiddenOperationError } from "../casl/abilities";
import { ForbiddenError, subject } from "@casl/ability";
import { Console } from "console";
import { userIdValidation } from "../validator/user";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const role = await getPerm(req.session.user.userId);
    const use = await getUser(req.session.user.userId);
    const abilities = await defineAbilitiesFor(role, use);
    ForbiddenOperationError.from(abilities).throwUnlessCan("read", "User");
    const user = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User does not exist",
      });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const role = await getPerm(req.session.user.userId);
    const use = await getUser(req.session.user.userId);
    const abilities = await defineAbilitiesFor(role, use);
    ForbiddenOperationError.from(abilities).throwUnlessCan("read", "User");
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        role: true,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User does not exist",
      });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const body = req.body;
  const role = await getPerm(req.session.user.userId);
  const use = await getUser(req.session.user.userId);

  try {
    const abilities = await defineAbilitiesFor(role, use);
    ForbiddenOperationError.from(abilities).throwUnlessCan(
      "update",
      subject("User", {
        userId: id,
      })
    );
    const updatedUser = await prisma.user.update({
      where: {
        userId: id,
      },
      data: body,
    });
    res.status(201).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const role = await getPerm(req.session.user.userId);
    const use = await getUser(req.session.user.userId);
    const abilities = await defineAbilitiesFor(role, use);
    ForbiddenOperationError.from(abilities).throwUnlessCan("delete", "User");
    await prisma.user.delete({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({
      message: "User delete successfully",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
