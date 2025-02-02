import prisma from '@/lib/db/prisma.orm';
import { generateSlug } from '@/lib/helpers/utils';
import { adaptUserFromDb } from '@/lib/helpers/utils.server';
import { CLASSE_SELECT } from '@/lib/packages/classes/classe.constant';
import { CLASS_COURSE_SELECT } from '@/lib/packages/courses/course.constant';
import { CLASS_STUDENTS_SELECT } from '@/lib/packages/students/student.constant';
import { CLASS_TEACHERS_SELECT } from '@/lib/packages/teachers/teacher.constant';

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
    data: { name, description, slug: generateSlug(name) },
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

export async function getStudentsByClassId(klass) {
  const students = await prisma.classStudent.findMany({
    where: { classId: klass.id },
    include: {
      student: { select: CLASS_STUDENTS_SELECT },
    },
  });
  return students.map((student) => adaptUserFromDb(student.student, 'student'));
}

export async function getTeachersByClassId(klass) {
  const students = await prisma.classTeacher.findMany({
    where: { classId: klass.id },
    include: {
      teacher: { select: CLASS_TEACHERS_SELECT },
    },
  });
  return students.map((student) => adaptUserFromDb(student.teacher, 'teacher'));
}

export async function getCoursesByClassId(klass) {
  const classCourse = await prisma.classCourse.findMany({
    where: { classId: klass.id },
    select: {
      course: { select: CLASS_COURSE_SELECT },
    },
  });
  return classCourse.map((cc) => cc.course);
}
