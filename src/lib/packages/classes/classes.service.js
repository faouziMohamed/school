import prisma from '@/lib/db/prisma.orm';
import { capitalize, generateSlug } from '@/lib/helpers/utils';
import { adaptUserFromDb } from '@/lib/helpers/utils.server';
import { CLASSE_SELECT } from '@/lib/packages/classes/classe.constant';
import {
  CLASS_COURSE_CO_SELECT,
  CLASS_TEACHER_SELECT,
} from '@/lib/packages/courses/course.constant';
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
  const classes = await prisma.classe.findMany({
    select: CLASSE_SELECT,
  });
  return classes.map((klass) => {
    const { classTeachers } = klass;
    const countCourses = classTeachers.reduce((acc, curr) => {
      return acc + curr._count.classTeacherCourses;
    }, 0);
    return {
      id: klass.id,
      name: klass.name,
      slug: klass.slug,
      description: klass.description,
      stats: {
        teachers: klass.classTeachers.length,
        students: klass._count.classStudents,
        courses: countCourses,
      },
    };
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
  const teachers = await prisma.classTeacher.findMany({
    where: { classId: klass.id },
    include: {
      teacher: { select: CLASS_TEACHERS_SELECT },
    },
  });
  return teachers.map((student) => adaptUserFromDb(student.teacher, 'teacher'));
}

export async function getClassTeacherById(classTeacherId) {
  return prisma.classTeacher.findUnique({
    where: { id: Number(classTeacherId) },
    include: {
      teacher: { select: CLASS_TEACHERS_SELECT },
    },
  });
}

export async function getClassTeachersByClassId(classId) {
  const teachers = await prisma.classTeacher.findMany({
    where: { classId: Number(classId) },
    include: {
      teacher: { select: CLASS_TEACHERS_SELECT },
    },
  });
  return teachers.map((t) => ({
    ...adaptUserFromDb(t.teacher, 'teacher'),
    classTeacherId: t.id,
  }));
}

export async function getCoursesByClassId(klass) {
  const classCourse = await prisma.classCourse.findMany({
    where: { classId: klass.id },
    select: {
      course: { select: CLASS_COURSE_CO_SELECT },
    },
  });
  return classCourse.map((cc) => cc.course);
}

/**
 * @param {number} courseId
 * @param {number} classTeacherId
 */
export async function getClassTeacherCourseByIds(courseId, classTeacherId) {
  return prisma.classTeacherCourse.findUnique({
    where: {
      classTeacherId_courseId: {
        courseId: Number(courseId),
        classTeacherId: Number(classTeacherId),
      },
    },
  });
}

export async function getClassCourseTeacherByIds(courseId, classTeacherId) {
  return prisma.classTeacherCourse.findUnique({
    where: {
      classTeacherId_courseId: {
        classTeacherId: Number(classTeacherId),
        courseId: Number(courseId),
      },
    },
    select: CLASS_TEACHER_SELECT,
  });
}

/**
 * Create a new class course
 * @param {CreateNewCourseInput&{classId: number; slug: string}} data
 * @param {string} courseSlug
 */
export function createClassCourse(data, courseSlug) {
  return prisma.classCourse.create({
    data: {
      classe: { connect: { id: Number(data.classId) } },
      course: {
        create: {
          name: capitalize(data.name),
          description: capitalize(data.description),
          slug: courseSlug,
        },
      },
    },
    select: {
      course: { select: CLASS_COURSE_CO_SELECT },
    },
  });
}
