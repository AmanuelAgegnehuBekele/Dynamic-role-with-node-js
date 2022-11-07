import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { authenticate } from "passport";
import "express-session";
import { createUserValidation, loginValidation } from "../validator/user";

const prisma = new PrismaClient();
export const register = async (req: Request, res: Response) => {
  const validate = await createUserValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validate.error?.message) {
    res.status(400).json({ message: validate.error?.message });
  } else {
    const { email, password, firstName, lastName, role } = req.body;
    try {
      const isEmail = await prisma.user.findUnique({
        where: { email: email },
      });
      if (isEmail) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            roleId: role,
          },
        });
        res.status(201).json({
          message: "user registered successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const validate = await loginValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validate.error?.message) {
    res.status(400).json({ message: validate.error?.message });
  } else {
    const { email, password } = req.body;

    try {
      const userFound = await prisma.user.findUnique({
        where: { email: email },
      });
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        req.session.user = userFound;
        res.status(200).json({
          message: "logged in successfully",
        });
      } else {
        res.status(401).json({ message: "incorrect user name or password" });
      }
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json({ message: "successfully logged out" });
    }
  });
};
