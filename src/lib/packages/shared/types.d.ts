import {
  UserRole as Role,
  Classe as klass,
  Course as Kourse,
  StudentAttendance as IStudentAttendance,
  TeacherAttendance as ITeacherAttendance,
  CourseSchedule as ICourseSchedule,
  StudentNotification as IStudentNotification,
  UserNotification as IUserNotification,
  User as IUser,
  Student as IStudent,
  StudentProfile as IStudentProfile,
} from "@prisma/client";

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
  courses: Kourse[];
  studentAttendances: IStudentAttendance[];
};

export type Course = Kourse & {
  studentAttendances: IStudentAttendance[];
  teacherAttendances: ITeacherAttendance[];
  courseSchedules: ICourseSchedule[];
};

export type StudentAttendance = IStudentAttendance;
export type TeacherAttendance = ITeacherAttendance;
export type CourseSchedule = ICourseSchedule & {
  techerCourseSchedules: TeacherCourseSchedule[];
};
