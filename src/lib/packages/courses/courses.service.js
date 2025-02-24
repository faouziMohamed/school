import {
  CLASS_COURSE_CO_SELECT,
  CLASS_TEACHER_SELECT,
  COURSE_SEARCH_SELECT,
  COURSE_SELECT,
} from './course.constant';
import prisma from '@/lib/db/prisma.orm';
import { capitalize } from '@/lib/helpers/utils';

/**
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 */
export async function createNewCourse(data) {
  const { name, description = '' } = data;
  try {
    return prisma.course.create({
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
  } catch (error) {
    console.log('creation error', error);
    return null;
  }
}

/**
 * @param {string} slug
 */
export async function findCourseBySlug(slug) {
  return prisma.course.findUnique({
    where: { slug },
    select: COURSE_SELECT,
  });
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
 * @param {string} name
 */
export async function searchCoursesByName(name) {
  try {
    return prisma.course.findMany({
      where: {
        OR: [{ name: { contains: name } }, { slug: { contains: name } }],
      },
      select: COURSE_SEARCH_SELECT,
    });
  } catch (error) {
    console.log('Search course error', error);
    return [];
  }
}

/**
 * @param {number} classId
 */
export async function findCoursesByClassId(classId) {
  const classCourse = await prisma.classTeacherCourse.findMany({
    where: { classId: Number(classId) },
    select: {
      course: { select: CLASS_COURSE_CO_SELECT },
    },
  });
  return classCourse.map((cc) => cc.course);
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
 * @param {number} courseId
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 *
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
 * @param {number} teacherId
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

/**
 * @param {number} classId
 */
export async function getCourseByClassId(classId) {
  const jointCtc = await prisma.classTeacherCourse.findMany({
    where: {
      classTeacher: {
        classe: { id: Number(classId) },
      },
    },
    select: CLASS_TEACHER_SELECT,
  });
  return jointCtc.map((jcc) => ({
    ...jcc.course,
    correlation: {
      correlationId: jcc.id,
      classTeacherId: jcc.classTeacher.id,
      teacherId: jcc.classTeacher.teacherId,
      classId: jcc.classTeacher.classId,
    },
  }));
}

export async function assignCourseToTeacherOnClassByIds(
  courseId,
  classTeacherId,
) {
  return prisma.classTeacherCourse.create({
    data: {
      classTeacher: { connect: { id: Number(classTeacherId) } },
      course: { connect: { id: Number(courseId) } },
    },
    select: CLASS_TEACHER_SELECT,
  });
}

/**
 * Create a new class course
 * @param {CreateNewCourseBody} data
 * @param {string} courseSlug
 */
export async function createAndAssignCourseToTeacherOnClassByIds(
  data,
  courseSlug,
) {
  return prisma.classTeacherCourse.create({
    data: {
      classTeacher: { connect: { id: Number(data.classTeacherId) } },
      course: {
        create: {
          name: capitalize(data.name),
          description: capitalize(data.description),
          slug: courseSlug,
        },
      },
    },
    select: CLASS_TEACHER_SELECT,
  });
}
