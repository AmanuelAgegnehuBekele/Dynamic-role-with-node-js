import { NextFunction, Request, Response } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    res.status(400).json({
      message: "Please login",
    });
  }
};

export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    next();
  } else {
    res.status(401).json({
      message: "already logged in",
    });
  }
};
