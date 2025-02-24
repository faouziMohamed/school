import prisma from '@/lib/db/prisma.orm';
import { dbScheduleToFrontSchedule } from '@/lib/helpers/utils.server';
import { SCHEDULE_CLASS_COURSE_INCLUDE } from '@/lib/packages/schedules/schedules.constant';

/**
 * Create a new class schedule
 * @param {CreateScheduleBody} data
 */
export async function createSchedule(data) {
  return prisma.classSchedule.create({
    data: {
      classTeacherCourse: {
        connect: {
          classTeacherId_courseId: {
            classTeacherId: Number(data.classTeacherId),
            courseId: Number(data.courseId),
          },
        },
      },
      day: data.day.toUpperCase(),
      startTime: data.startTime,
      endTime: data.endTime,
      note: data.note,
    },
    include: {
      classTeacherCourse: true,
    },
  });
}

/**
 * Get a class schedule by its id
 * @param {Object} options
 * @param {number} options.classTeacherCourseId
 * @param {string} options.day
 * @param {string} options.startTime
 * @param {string} options.endTime
 */
export async function getScheduleByTimeClassCourseIdAndDay({
  classTeacherCourseId,
  day,
  startTime,
  endTime,
}) {
  return prisma.classSchedule.findUnique({
    where: {
      classTeacherCourseId_day_startTime_endTime: {
        classTeacherCourseId: Number(classTeacherCourseId),
        day: day.toUpperCase(),
        startTime,
        endTime,
        // classTeacherCourse: {
        //   classTeacherId: Number(classTeacherId),
        // },
      },
    },
  });
}

/**
 * Get all class schedules by class id
 * @param {number} classId
 */
export async function getAllClassSchedules(classId) {
  const schedules = await prisma.classSchedule.findMany({
    where: {
      classTeacherCourse: {
        classTeacher: {
          classId: Number(classId),
        },
      },
    },
    include: {
      classTeacherCourse: { select: SCHEDULE_CLASS_COURSE_INCLUDE },
    },
  });
  return schedules.map(dbScheduleToFrontSchedule);
}
