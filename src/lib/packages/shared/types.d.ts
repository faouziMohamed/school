import {
  Classe as klass,
  Student as IStudent,
  StudentAttendance as IStudentAttendance,
  StudentNotification as IStudentNotification,
  StudentProfile as IStudentProfile,
  TeacherAttendance as ITeacherAttendance,
  User as IUser,
  UserNotification as IUserNotification,
  UserRole as Role,
} from '@prisma/client';

export type ApiError = { error: string; status: number };
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
  id: number;
  name: string;
  description: string;
  slug: string;
  stats: {
    teachers: number;
    students: number;
    courses: number;
  };
};

export type FrontTeacher = FrontUser & {
  classTeacherId: number;
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
  _count: {
    classTeachers: number;
    classStudents: number;
  };
};

export type ShortFrontClasse = {
  id: number;
  name: string;
  description: string;
  slug: string;
};

export type FrontCourseCorrelation = {
  correlationId: number;
  teacherId: number;
  teacherUrl: string;
  classId: number;
  classSlug: string;
  className: string;
};
export type FrontCourse = {
  id: number;
  name: string;
  description: string;
  slug: string;
  url: string;
  correlation: FrontCourseCorrelation[];
};

export type ShortFrontCourse = Omit<FrontCourse, 'url' | 'correlation'>;

export type SingularFrontCourseCorrelation = {
  classTeacherId: number;
  teacherId: number;
  classId: number;
};
export type SingularFrontCourse = {
  id: number;
  name: string;
  description: string;
  slug: string;
  correlation: SingularFrontCourseCorrelation;
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
export type CreateNewCourseBody = CreateNewCourseInput & {
  classId: number;
  classTeacherId: number;
};

export type ScheduleTime = `${number | string}:${number | string}`;
export type FrontScheduleData = {
  id: string;
  correlationId: number;
  day: WorkDay;
  startTime: ScheduleTime;
  endTime: ScheduleTime;
  note: string;
  course: ShortFrontCourse;
  classe: ShortFrontClasse;
  teacher: FrontUser;
};

export type ClassSchedule = {
  classId: string;
  className: string;
  schedules: FrontScheduleData[];
};

export type WorkDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export type CreateScheduleInput = {
  courseId: number;
  day: WorkDay;
  startTime: string;
  endTime: string;
  note: string;
};

export type CreateScheduleBody = CreateScheduleInput & {
  classId: number;
  classTeacherId: number;
};
