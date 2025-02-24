import { generateSlug } from '@/lib/helpers/utils';
import { findCourseMissingField } from '@/lib/helpers/utils.server';
import { getClassById } from '@/lib/packages/classes/classes.service';
import {
  createAndAssignCourseToTeacherOnClassByIds,
  findCourseBySlug,
  getCourseByClassId,
} from '@/lib/packages/courses/courses.service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const nextParam = await params;
  const classId = nextParam.classId;
  if (Number.isNaN(Number(classId))) {
    return NextResponse.json(
      { message: 'Incorrect Class Id' },
      { status: 400 },
    );
  }
  const courses = await getCourseByClassId(classId);
  return NextResponse.json({ data: courses });
}

export async function POST(request, { params }) {
  const nextParam = await params;
  const classId = Number(nextParam.classId);
  if (Number.isNaN(classId)) {
    return NextResponse.json(
      { message: 'Class Id Id incorrect' },
      { status: 400 },
    );
  }

  /**
   * @type {CreateNewCourseBody}
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

  if (Number(body.classId) !== classId) {
    return NextResponse.json(
      { message: 'Class Id does not match' },
      { status: 400 },
    );
  }

  const missingFields = findCourseMissingField(body);
  if (missingFields.length) {
    return NextResponse.json(
      { message: `Missing fields: ${missingFields.join(', ')}` },
      { status: 400 },
    );
  }

  const courseSlug = generateSlug(body.name);
  const courseExists = await findCourseBySlug(courseSlug);
  if (courseExists) {
    return NextResponse.json(
      {
        message:
          'A course with the same name already exists, please choose another name',
      },
      { status: 400 },
    );
  }

  const classExists = await getClassById(classId);
  if (!classExists) {
    return NextResponse.json(
      { message: 'The class does not exist, please select a valid class' },
      { status: 404 },
    );
  }

  const assigned = await createAndAssignCourseToTeacherOnClassByIds(
    body,
    courseSlug,
  );

  if (!assigned) {
    return NextResponse.json(
      { message: 'Course creation and assignment failed' },
      { status: 500 },
    );
  }

  return NextResponse.json(assigned);
}
