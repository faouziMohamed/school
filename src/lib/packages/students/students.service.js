import { PROFILE_SELECT, STUDENT_SELECT } from './student.constant';
import prisma from '@/lib/db/prisma.orm';
import { getStudentWithClasses } from '@/lib/helpers/utils.server';

export async function getAllStudents() {
  try {
    const users = await prisma.student.findMany({
      select: STUDENT_SELECT,
    });
    return users.map(getStudentWithClasses);
  } catch (error) {
    console.log('error getting users', error.message);
    return [];
  }
}

/**
 * @param {Object} studentData
 * @param {string} studentData.firstName
 * @param {string} studentData.lastName
 * @param {string} studentData.email
 * @param {string} studentData.phone
 * @param {string} studentData.password
 */
export async function createNewStudent(studentData) {
  try {
    const newStudent = await prisma.student.create({
      data: {
        email: studentData.email,
        password: studentData.password,
        profile: {
          create: {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            phone: studentData.phone,
          },
        },
      },

      select: STUDENT_SELECT,
    });

    console.log('user', newStudent);
    return newStudent;
  } catch (error) {
    console.log('error?', error.message);
    return null;
  }
}

export async function isStudentExistByEmail(email) {
  try {
    return !!(await prisma.student.findUniqueOrThrow({
      where: { email },
    }));
  } catch {
    return false;
  }
}

export async function getStudentById(studentId) {
  return prisma.student.findFirst({
    where: { id: Number(studentId) },
    select: STUDENT_SELECT,
  });
}

export async function getStudentByEmail(email) {
  return prisma.student.findFirst({
    where: {
      email: String(email).toLowerCase(),
    },
    select: {
      id: true,
      email: true,
      password: true,
      profile: {
        select: PROFILE_SELECT,
      },
    },
  });
}

/**
 * @param {number} studentId
 * @param {Object} data
 * @param {string?} data.firstName
 * @param {string?} data.lastName
 * @param {string?} data.email
 * @param {string?} data.phone
 * @param {string?} data.password
 * @param {UserRole?} data.role
 */
export async function updateUserById(studentId, data) {
  /**
   * @type {import('../shared/types').StudentProfile}
   * */
  const profileData = {};

  /**
   * @type {import('../shared/types').Student}
   * */
  const studentData = {};
  if (data.firstName) {
    profileData.firstName = data.firstName;
  }
  if (data.lastName) {
    profileData.lastName = data.lastName;
  }
  if (data.phone) {
    profileData.phone = data.phone;
  }

  if (data.email) {
    studentData.email = data.email.toLowerCase();
  }
  if (data.password) {
    studentData.password = data.password;
  }

  if (Object.keys(data).length === 0 && Object.keys(studentData).length === 0) {
    return null;
  }

  return prisma.student.update({
    where: { id: Number(studentId) },
    data: {
      ...(Object.keys(studentData).length > 0 ? studentData : {}),
      ...(Object.keys(profileData).length > 0
        ? { profile: { update: profileData } }
        : {}),
    },
    select: STUDENT_SELECT,
  });
}

export async function deleteUserById(userId) {
  return prisma.student.delete({
    where: { id: Number(userId) },
  });
}

/**
 * @param {string} search
 */
export async function searchStudentsByNames(search) {
  try {
    const users = await prisma.student.findMany({
      where: {
        OR: [
          { email: { contains: search } },
          {
            profile: {
              OR: [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
              ],
            },
          },
        ],
      },
      orderBy: [
        { profile: { firstName: 'asc' } },
        { profile: { lastName: 'asc' } },
        { email: 'asc' },
      ],
      select: STUDENT_SELECT,
    });
    return users.map(getStudentWithClasses);
  } catch (error) {
    console.log('error getting users', error.message);
    return [];
  }
}
