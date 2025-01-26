'use server';

import prisma from '@/lib/db/prisma.orm';
import { capitalizeWords } from '@/lib/helpers/utils';
import { findMissingField, hashPassword } from '@/lib/helpers/utils.server';
import { getClassById } from '@/lib/packages/classes/classes.service';
import { isUserExistByEmail } from '@/lib/packages/teachers/teacher.service';
import { ROUTES } from '@/lib/routes/client.route';
import { revalidatePath } from 'next/cache';

/**
 * Create a new student and add them the the given class
 * @param {Object} previous
 * @param {FormData} formData
 * @returns {Promise<{success: boolean, error: null|string}>}
 */
export async function submitCreateNewTeacherForGivenClass(previous, formData) {
  try {
    // noinspection JSValidateTypes
    /**
     * @type {CreateUserInput&{classId: number; slug: string}}
     */
    const data = Object.fromEntries(formData);
    const missingFields = findMissingField(data);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing fields: ${missingFields.join(', ')}`,
      };
    }

    const teacherExists = await isUserExistByEmail(data.email);

    if (teacherExists) {
      return {
        success: false,
        error: 'A Teacher with this email already is on the platform',
      };
    }

    const classExists = await getClassById(Number(data.classId));
    if (!classExists) {
      return {
        success: false,
        error: 'The class does not exist, please select a valid class',
      };
    }
    const hashPwd = await hashPassword(data.password);
    const profileCreate = {
      firstName: capitalizeWords(data.firstName),
      lastName: capitalizeWords(data.lastName),
      phone: data.phone,
      role: 'USER',
    };
    const newClassTeacher = await prisma.classTeacher.create({
      data: {
        classe: { connect: { id: Number(data.classId) } },
        teacher: {
          create: {
            email: data.email.toLocaleLowerCase(),
            password: hashPwd,
            profile: { create: profileCreate },
          },
        },
      },
    });

    if (!newClassTeacher) {
      return {
        success: false,
        error:
          'An error occurred while creating the student, please try again later',
      };
    }

    revalidatePath(ROUTES.CLASS_ROOMS_SLUG(data.slug));
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to create class', success: false };
  }
}

/**
 * Create a new student and add them the the given class
 * @param {Object} props
 * @param {number} props.classId
 * @param {number} props.teacherId
 * @param {string} props.classSlug
 * @returns {Promise<{success: boolean, error: null|string}>}
 */
export async function submitAddTeacherToClass({
  classId,
  teacherId,
  classSlug,
}) {
  try {
    // check if the classStudent with classId and userId exists already
    const classTeacherExists = await prisma.classTeacher.findUnique({
      where: {
        teacherId_classId: {
          teacherId: Number(teacherId),
          classId: Number(classId),
        },
      },
    });
    if (classTeacherExists) {
      return {
        success: false,
        error: 'The Teacher has already been assigned to the class',
      };
    }
    const newClassTeacher = await prisma.classTeacher.create({
      data: {
        classId: Number(classId),
        teacherId: Number(teacherId),
      },
    });

    if (!newClassTeacher) {
      return {
        success: false,
        error:
          'An error occurred while adding the student to the class, please try again later',
      };
    }
    revalidatePath(ROUTES.CLASS_ROOMS_SLUG(classSlug));
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to add student to class', success: false };
  }
}
