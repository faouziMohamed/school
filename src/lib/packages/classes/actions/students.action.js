'use server';

import prisma from '@/lib/db/prisma.orm';
import { capitalizeWords } from '@/lib/helpers/utils';
import { findMissingField, hashPassword } from '@/lib/helpers/utils.server';
import { getClassById } from '@/lib/packages/classes/classes.service';
import { isStudentExistByEmail } from '@/lib/packages/students/students.service';
import { ROUTES } from '@/lib/routes/client.route';
import { revalidatePath } from 'next/cache';

/**
 * Create a new student and add them the the given class
 * @param {Object} previous
 * @param {FormData} formData
 * @returns {Promise<{success: boolean, error: null|string}>}
 */
export async function submitCreateNewStudentForGivenClass(previous, formData) {
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

    const studentExists = await isStudentExistByEmail(data.email);

    if (studentExists) {
      return {
        success: false,
        error: 'A Student with this email already exists',
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
    };
    const newStudent = await prisma.classStudent.create({
      data: {
        classe: { connect: { id: Number(data.classId) } },
        student: {
          create: {
            email: data.email.toLocaleLowerCase(),
            password: hashPwd,
            profile: { create: profileCreate },
          },
        },
      },
    });

    if (!newStudent) {
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
 * @param {number} props.studentId
 * @param {string} props.classSlug
 * @returns {Promise<{success: boolean, error: null|string}>}
 */
export async function submitAddUserToClass({ classId, studentId, classSlug }) {
  try {
    // check if the classStudent with classId and userId exists already
    const existing = await prisma.classStudent.findUnique({
      where: {
        studentId_classId: {
          studentId: Number(studentId),
          classId: Number(classId),
        },
      },
    });
    if (existing) {
      return { success: false, error: 'The student is already in the class' };
    }
    const newStudent = await prisma.classStudent.create({
      data: {
        classId: Number(classId),
        studentId: Number(studentId),
      },
    });

    if (!newStudent) {
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
