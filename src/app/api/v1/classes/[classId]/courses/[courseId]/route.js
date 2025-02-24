import {
  getClassCourseTeacherByIds,
  getClassTeacherById,
} from '@/lib/packages/classes/classes.service';
import {
  assignCourseToTeacherOnClassByIds,
  getCourseById,
} from '@/lib/packages/courses/courses.service';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const nextParam = await params;
  const classId = nextParam.classId;
  const courseId = nextParam.courseId;
  if (Number.isNaN(Number(classId)) || Number.isNaN(Number(courseId))) {
    return NextResponse.json(
      { message: 'Class Id or Course Id incorrect' },
      { status: 400 },
    );
  }

  /**
   * @type {{classId: number, courseId: number; classTeacherId: number}}
   */
  const body = await request.json();
  if (!body.classTeacherId) {
    return NextResponse.json(
      { message: 'classTeacherId is required' },
      { status: 400 },
    );
  }

  if (Number.isNaN(Number(body.classTeacherId))) {
    return NextResponse.json(
      { message: 'Invalid classTeacherId' },
      { status: 400 },
    );
  }

  const course = await getCourseById(courseId);
  if (!course) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  const classTeacher = await getClassTeacherById(body.classTeacherId);
  if (!classTeacher) {
    return NextResponse.json(
      { message: 'Class Teacher not found' },
      { status: 404 },
    );
  }

  const alreadyExists = await getClassCourseTeacherByIds(
    courseId,
    body.classTeacherId,
  );
  if (alreadyExists) {
    return NextResponse.json(
      { message: 'Course already assigned to teacher' },
      { status: 400 },
    );
  }

  const assigned = await assignCourseToTeacherOnClassByIds(
    courseId,
    body.classTeacherId,
  );
  if (!assigned) {
    return NextResponse.json(
      { message: 'Course assignment failed' },
      { status: 500 },
    );
  }

  return NextResponse.json(assigned);
}
