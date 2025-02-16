// src/api/users/model.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsersModel() {
  return await prisma.user.findMany();
}

export async function getUserModel(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function createUserModel(userData: any) {
  return await prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      experience: userData.experience,
      salesforceId: userData.salesforceId,
    },
  });
}

export async function updateUserModel(id: number, userData: any) {
  return await prisma.user.update({
    where: { id },
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      experience: userData.experience,
    },
  });
}

export async function deleteUserModel(id: number) {
  return await prisma.user.delete({ where: { id } });
}

export async function getUserByEmailModel(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
