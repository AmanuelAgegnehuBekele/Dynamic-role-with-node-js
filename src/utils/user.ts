import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPerm = async (id: any) => {
  const user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });

  const roleId: any = user?.roleId;
  const role = await prisma.permRole.findMany({
    where: {
      roleId: roleId,
    },
    include: {
      permission: true,
    },
  });
  if (!user) {
    return "User not found";
  } else {
    return role;
  }
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });
  if (!user) {
    return "User not found";
  } else {
    return user;
  }
};
