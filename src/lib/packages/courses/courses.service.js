import { USER_SELECT } from '../teachers/teacher.constant';
import { COURSE_SELECT } from './course.constant';
import prisma from '@/lib/db/prisma.orm';

/**
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 * @param {number} data.teacherId
 * @param {number} data.classId
 */
export async function createNewCourse(data) {
  const { name, classId, teacherId, description = '' } = data;
  try {
    return prisma.course.create({
      data: {
        name,
        classId: Number(classId),
        teacherId: Number(teacherId),
        description,
      },
      select: {
        id: true,
        name: true,
        description: true,
        classe: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        teacher: {
          select: USER_SELECT,
        },
      },
    });
  } catch (error) {
    console.log('creation error', error);
    return null;
  }
}

/**
 * @param {number} courseId
 */
export async function getCourseById(courseId) {
  return prisma.course.findUnique({
    where: {
      id: Number(courseId),
    },
    select: COURSE_SELECT,
  });
}

export async function getAllCourses() {
  return prisma.course.findMany({
    select: COURSE_SELECT,
  });
}

/**
 * @param {number} classId
 */
export async function getCoursesByClassId(classId) {
  return prisma.course.findMany({
    where: {
      classId: Number(classId),
    },
    select: COURSE_SELECT,
  });
}

/**
 * @param {number} teacherId
 */
export async function getCoursesByTeacherId(teacherId) {
  return prisma.course.findMany({
    where: {
      teacherId: Number(teacherId),
    },
    select: COURSE_SELECT,
  });
}

/**
 * @param {number} courseId
 */
export async function deleteCourseById(courseId) {
  return prisma.course.delete({
    where: {
      id: Number(courseId),
    },
    select: COURSE_SELECT,
  });
}

/**
 *
 * @param {Object} data
 * @param {string?} data.name
 * @param {string?} data.description
 * @param {number?} data.teacherId
 * @param {number?} data.classId
 */
export async function updateCourseById(courseId, data) {
  const { name, description, teacherId, classId } = data;
  const updateData = {};

  if (name) {
    updateData.name = name;
  }
  if (description) {
    updateData.description = description;
  }
  if (teacherId) {
    updateData.teacherId = Number(teacherId);
  }
  if (classId) {
    updateData.classId = Number(classId);
  }

  if (Object.keys(updateData).length === 0) {
    return null;
  }

  return prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: updateData,
    select: COURSE_SELECT,
  });
}

/**
 * @param {number} courseId
 * @param {number} classId
 */
export async function getCourseByClassAndTeacherId(classId, teacherId) {
  return prisma.course.findFirst({
    where: {
      classId: Number(classId),
      teacherId: Number(teacherId),
    },
    select: COURSE_SELECT,
  });
}

/**
 * @param {number} courseId
 */
export async function getAssociatedClassesByCourseId(courseId) {
  const course = await prisma.course.findUnique({
    where: {
      id: Number(courseId),
    },
    select: { classe: true },
  });

  return course?.classe ?? null;
}

/**
 * @param {number} courseId
 */
export async function getAllCourseSchedulesByCourseId(courseId) {
  return prisma.courseSchedule.findMany({
    where: {
      courseId: Number(courseId),
    },
    select: {
      id: true,
      startAt: true,
      endAt: true,
      note: true,
    },
  });
}
