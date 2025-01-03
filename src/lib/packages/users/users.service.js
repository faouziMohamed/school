import prisma from "../db/prisma.orm";

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(userData) {
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: String(userData.email).toLowerCase(),
        phone: userData.phone,
        role: "STUDENT",
        password: userData.password,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function isUserExistByEmail(email) {
  try {
    return !!(await prisma.user.findUniqueOrThrow({ where: { email } }));
  } catch {
    return false;
  }
}

export async function getUserById(userId) {
  return await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
}

export async function getUserByEmail(email) {
  return await prisma.user.findFirst({
    where: {
      email: String(email).toLowerCase(),
    },
  });
}
