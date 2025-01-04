import prisma from "@/lib/db/prisma.orm";
import { CLASSE_SELECT } from "./classe.constant";
/**
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 */
export async function createNewClass(data) {
  const { name, description = "" } = data;

  if (!name) {
    return throwError("The name of the class is required");
  }

  return prisma.classe.create({
    data: {
      name,
      description,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
}

export async function getClassById(classId) {
  return prisma.classe.findUnique({
    where: {
      id: Number(classId),
    },
    select: {
      id: true,
      name: true,
      description: true,
      courses: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  });
}

export async function deleteClassById(classId) {
  return prisma.classe.delete({
    where: {
      id: Number(classId),
    },
    select: CLASSE_SELECT,
  });
}
