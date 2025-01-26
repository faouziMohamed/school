import { CLASSE_SELECT } from './classe.constant';
import prisma from '@/lib/db/prisma.orm';

/**
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 */
export async function createNewClass(data) {
  const { name, description = '' } = data;

  if (!name) {
    throw Error('The name of the class is required');
  }

  return prisma.classe.create({
    data: { name, description },
    select: CLASSE_SELECT,
  });
}

export async function getClassById(classId) {
  return prisma.classe.findUnique({
    where: { id: Number(classId) },
    select: CLASSE_SELECT,
  });
}

export async function getClassBySlug(slug) {
  return prisma.classe.findUnique({
    where: { slug },
    select: CLASSE_SELECT,
  });
}

export async function getClassByName(name) {
  return prisma.classe.findUnique({
    where: { name },
    select: CLASSE_SELECT,
  });
}

export async function deleteClassById(classId) {
  return prisma.classe.delete({ where: { id: Number(classId) } });
}

export async function getAllClasses() {
  return prisma.classe.findMany({
    select: CLASSE_SELECT,
  });
}
