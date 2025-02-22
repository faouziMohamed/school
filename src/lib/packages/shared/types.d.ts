import {
  Classe as klass,
  Course as Kourse,
  Student as IStudent,
  StudentAttendance as IStudentAttendance,
  StudentNotification as IStudentNotification,
  StudentProfile as IStudentProfile,
  TeacherAttendance as ITeacherAttendance,
  User as IUser,
  UserNotification as IUserNotification,
  UserRole as Role,
} from '@prisma/client';

export type FrontUser = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  role: FrontUserRole;
  profileId: number;
  createdAt: string;
  classes: FrontUserClass[];
};

type FrontUserClass = {
  name: string;
  description: string;
  slug: string;
};

export type FrontUserWithToken = FrontUser & {
  token: string;
};

export type AppUser = IUser;
export type AppUserWithToken = AppUser & {
  token: string;
};

export type Student = IStudent;
export type StudentProfile = IStudentProfile;

export type UserRole = Role;
export type StudentNotification = IStudentNotification;
export type UserNotification = IUserNotification;

export type Classe = klass & {
  id: number;
  slug: string;
  _count: { classTeacher: number; classCourse: number; classStudent: number };
};

export type Course = Kourse & {
  description: string;
  classCourses: {
    classe: { name: string; description: string; slug: string };
  };
};

export type StudentAttendance = IStudentAttendance;
export type TeacherAttendance = ITeacherAttendance;

type FrontUserRole = 'student' | 'teacher' | 'admin';
type AuthAction = 'register' | 'login';

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars
  type JWT = FrontUserWithToken;
}
declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: FrontUser;
    role: FrontUserRole;
  }
}

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
};

export type LoginInput = {
  email: string;
  password: string;
  role: Role;
};

export type CreateUserBody = Omit<CreateUserInput, 'role'> & {
  role: FrontUserRole;
  action: AuthAction;
};

export type CreateStudentBody = Omit<CreateUserInput, 'role'>;

export type LoginBody = Omit<LoginInput, 'role'> & {
  role: FrontUserRole;
  action: AuthAction;
};

export type CreateNewClassInput = {
  name: string;
  description: string;
};

export type CreateNewCourseInput = {
  name: string;
  description: string;
};

export type ScheduleData = {
  id: string;
  courseId: string;
  courseName: string;
  startAt: string | Date;
  endAt: string | Date;
  teacherName: string;
  className: string;
};
