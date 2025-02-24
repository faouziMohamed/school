import bcrypt from 'bcrypt';

/**
 * Hash a password
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password with a hashed password stored in the database
 * @param {string} password - The password to verify
 * @param {string} hashedPassword - The hashed password stored in the database
 * @returns {Promise<boolean>} - True if the password is correct, false otherwise
 */
export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword); // Fonction correcte pour vérifier le mot de passe
}

/**
 * Find missing fields in a user object
 * @param {Object} user - The user object
 * @param {string} user.firstName - The user's first name
 * @param {string} user.lastName - The user's last name
 * @param {string} user.email - The user's email
 * @param {string} user.phone - The user's phone number
 * @param {string} user.password - The user's password
 * @returns {string[]} - An array of missing fields
 */
export function findUserMissingField({
  firstName,
  lastName,
  email,
  phone,
  password,
} = {}) {
  const missingFields = [];
  if (!firstName) {
    missingFields.push('firstName');
  }
  if (!lastName) {
    missingFields.push('lastName');
  }
  if (!email) {
    missingFields.push('email');
  }
  if (!phone) {
    missingFields.push('phone');
  }

  if (!password) {
    missingFields.push('password');
  }
  return missingFields;
}

/**
 * Find missing fields in a user object
 * @param {Object} course - The user object
 * @param {string} course.name - The course's name
 * @param {string} course.description - The course's description
 * @returns {string[]} - An array of missing fields
 */
export function findCourseMissingField({ name, description } = {}) {
  const missingFields = [];
  if (!name) {
    missingFields.push('name');
  }
  if (!description) {
    missingFields.push('description');
  }
  return missingFields;
}

/**
 *
 * @param {Student|AppUser} newUser
 * @param {FrontUserRole} role
 * @returns {FrontUser}
 */
export function adaptUserFromDb(newUser, role = 'student') {
  return {
    id: newUser.id,
    role: role.toLowerCase(),
    firstName: newUser.profile.firstName,
    lastName: newUser.profile.lastName,
    phone: newUser.profile.phone,
    email: newUser.email,
    createdAt: newUser.profile.createdAt,
    avatarUrl: newUser.profile.avatarUrl,
  };
}

/**
 * @param {UserRole} dbUserRole - The role stored in the database may be null
 * @returns {FrontUserRole}
 */
export function dbUserRoleToFrontUserRole(dbUserRole) {
  return dbUserRole === 'USER' ? 'teacher' : 'admin';
}

/**
 * @param {FrontUserRole} role - The role submitted by the frontend to choose the login portal
 * @param {UserRole} dbUserRole - The role stored in the database may be null
 * @returns {FrontUserRole}
 */
export function discoverFrontUserRole(role, dbUserRole) {
  if (dbUserRole) {
    return dbUserRoleToFrontUserRole(dbUserRole);
  } else {
    return role;
  }
}

export function getStudentWithClasses(user) {
  return {
    ...adaptUserFromDb(user, 'student'),
    classes: user.classStudents.map((classStudent) => ({
      name: classStudent.classe.name,
      description: classStudent.classe.description,
      slug: classStudent.classe.slug,
    })),
  };
}

export function getTeacherWithClasses(user) {
  return {
    ...adaptUserFromDb(user, 'teacher'),
    classes: user.classTeachers.map((classTeacher) => ({
      name: classTeacher.classe.name,
      description: classTeacher.classe.description,
      slug: classTeacher.classe.slug,
    })),
  };
}

/**
 * @returns {FrontScheduleData}
 */
export function dbScheduleToFrontSchedule(schedule) {
  const { classTeacherCourseId, classTeacherCourse } = schedule;
  const { classTeacher, course } = classTeacherCourse;
  const { classe, teacher } = classTeacher;
  /** @type {FrontUser} */
  const frontTeacher = adaptUserFromDb(teacher, 'teacher');
  frontTeacher.role = undefined;
  return {
    id: Number(schedule.id),
    correlationId: Number(classTeacherCourseId),
    day: String(schedule.day).toLowerCase(),
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    note: schedule.note,
    course: {
      id: Number(course.id),
      name: course.name,
      slug: course.slug,
      description: course.description,
    },
    teacher: frontTeacher,
    classe: {
      id: Number(classe.id),
      name: classe.name,
      slug: classe.slug,
      description: classe.description,
    },
  };
}
