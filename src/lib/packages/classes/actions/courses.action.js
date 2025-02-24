'use server';

import { generateSlug } from '@/lib/helpers/utils';
import { findCourseMissingField } from '@/lib/helpers/utils.server';
import {
  createClassCourse,
  getClassById,
  getClassTeacherCourseByIds,
} from '@/lib/packages/classes/classes.service';
import {
  assignCourseToTeacherOnClassByIds,
  findCourseBySlug,
} from '@/lib/packages/courses/courses.service';
import { ROUTES } from '@/lib/routes/client.route';
import { revalidatePath } from 'next/cache';

/**
 * Create a new student and add them the given class
 * @param {Object} previous
 * @param {FormData} formData
 * @returns {Promise<{success: boolean, error: null|string}>}
 */
export async function submitCreateNewCourseForGivenClass(previous, formData) {
  try {
    // noinspection JSValidateTypes
    /**
     * @type {CreateNewCourseInput&{classId: number; slug: string}}
     */
    const data = Object.fromEntries(formData);
    const missingFields = findCourseMissingField(data);

    if (!data.slug) {
      missingFields.push('slug');
    }
    if (!data.classId) {
      missingFields.push('classId');
    }

    if (missingFields.length) {
      return {
        success: false,
        error: `Missing fields: ${missingFields.join(', ')}`,
      };
    }
    const courseSlug = generateSlug(data.name);
    const courseExists = await findCourseBySlug(courseSlug);

    if (courseExists) {
      return {
        success: false,
        error:
          'A course with the same name already exists, please choose another name',
      };
    }

    const classExists = await getClassById(Number(data.classId));
    if (!classExists) {
      return {
        error: 'The class does not exist, please select a valid class',
        success: false,
      };
    }
    const newClassCourse = await createClassCourse(data, courseSlug);

    if (!newClassCourse) {
      return {
        success: false,
        error:
          'An error occurred while creating the course, please try again later',
      };
    }

    revalidatePath(ROUTES.CLASS_ROOMS_SLUG(data.slug));
    revalidatePath(ROUTES.SCHEDULES);
    return { success: true, error: null, course: newClassCourse.course };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to create class', success: false };
  }
}

/**
 * Create a new student and add them the  given class
 * @param {Object} props
 * @param {number} props.classId
 * @param {number} props.courseId
 * @param {string} props.classSlug
 * @returns {Promise<{success: boolean, error: null|string; course?: ClassCourse}>}
 */
export async function submitAddCourseToClass({ classId, courseId, classSlug }) {
  try {
    // check if the classStudent with classId and userId exists already
    const existing = await getClassTeacherCourseByIds(classId, courseId);
    if (existing) {
      return {
        success: false,
        error: 'The course is already added to the class',
      };
    }
    const newClassCourse = await assignCourseToTeacherOnClassByIds(
      classId,
      courseId,
    );

    if (!newClassCourse) {
      return {
        success: false,
        error:
          'An error occurred while adding the course to the class, please try again later',
      };
    }
    revalidatePath(ROUTES.CLASS_ROOMS_SLUG(classSlug));
    revalidatePath(ROUTES.SCHEDULES);
    return { success: true, error: null, course: newClassCourse.course };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to add the course to the class', success: false };
  }
}
