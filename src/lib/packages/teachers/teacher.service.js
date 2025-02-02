import { USER_PROFILE_SELECT, USER_SELECT } from './teacher.constant';
import prisma from '@/lib/db/prisma.orm';
import { getTeacherWithClasses } from '@/lib/helpers/utils.server';

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: USER_SELECT,
    });
    return users.map(getTeacherWithClasses);
  } catch (error) {
    console.log('error getting users', error.message);
    return [];
  }
}

/**
 * @param {Object} userData
 * @param {string} userData.firstName
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.phone
 * @param {string} userData.password
 * @param {UserRole} userData.role
 */
export async function createNewUser(userData) {
  try {
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            role: userData.role,
          },
        },
      },
      select: USER_SELECT,
    });
  } catch (error) {
    console.log('error?', error.message);
    return null;
  }
}

export async function getUserById(userId) {
  try {
    return prisma.user.findUnique({
      where: { id: Number(userId) },
      select: USER_SELECT,
    });
  } catch (error) {
    console.log('error getting user', error.message);
    return null;
  }
}

export async function getUserByEmail(email) {
  try {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        profile: {
          select: USER_PROFILE_SELECT,
        },
      },
    });
  } catch (error) {
    console.log('error getting user', error.message);
    return null;
  }
}

export async function isUserExistByEmail(email) {
  const user = await getUserByEmail(email);
  return !!user;
}

/**
 * @param {number} userId
 * @param {Object} data
 * @param {string?} data.firstName
 * @param {string?} data.lastName
 * @param {string?} data.email
 * @param {string?} data.phone
 * @param {string?} data.password
 * @param {UserRole?} data.role
 */
export async function updateUserById(userId, data) {
  /**
   * @type {import('@prisma/client').UserProfile}
   * */
  const profileData = {};

  /**
   * @type {import('@prisma/client').User}
   * */
  const userData = {};
  if (data.firstName) {
    profileData.firstName = data.firstName;
  }
  if (data.lastName) {
    profileData.lastName = data.lastName;
  }
  if (data.phone) {
    profileData.phone = data.phone;
  }
  if (data.role) {
    profileData.role = data.role || 'USER';
  }

  if (data.email) {
    userData.email = data.email.toLowerCase();
  }
  if (data.password) {
    userData.password = data.password;
  }

  if (
    Object.keys(profileData).length === 0 &&
    Object.keys(userData).length === 0
  ) {
    return null;
  }

  return prisma.user.update({
    where: { id: Number(userId) },
    data: {
      ...(Object.keys(userData).length > 0 ? userData : {}),
      ...(Object.keys(profileData).length > 0
        ? { profile: { update: profileData } }
        : {}),
    },
    select: USER_SELECT,
  });
}

export async function deleteUserById(userId) {
  try {
    return prisma.user.delete({
      where: { id: Number(userId) },
      select: USER_SELECT,
    });
  } catch (error) {
    console.log('error deleting user', error.message);
    return null;
  }
}

/**
 * @param {string} search
 */
export async function searchTeachersByNames(search) {
  try {
    const users = await prisma.user.findMany({
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
      select: USER_SELECT,
    });
    return users.map(getTeacherWithClasses);
  } catch (error) {
    console.log('error getting users', error.message);
    return [];
  }
}
