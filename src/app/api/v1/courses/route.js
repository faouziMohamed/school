import { getClassById } from '@/lib/packages/classes/classes.service';
import {
  createNewCourse,
  getAllCourses,
  searchStudentsByName,
} from '@/lib/packages/courses/courses.service';
import { getUserById } from '@/lib/packages/teachers/teacher.service';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const search = request.nextUrl.searchParams.get('search');
  const courses = search
    ? await searchStudentsByName(search)
    : await getAllCourses();
  return NextResponse.json({ data: courses });
}

export async function POST(request) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      { message: 'A body is expected on the request but none has been found' },
      { status: 400 },
    );
  }

  const { name, description, teacherId, classId } = body;

  const missingFields = [];
  if (!name) {
    missingFields.push('name');
  }
  if (!description) {
    missingFields.push('description');
  }
  if (!teacherId) {
    missingFields.push('teacherId');
  }
  if (!classId) {
    missingFields.push('classId');
  }

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: 'Some fields are mandatory but they are missing',
        missingFields,
      },
      { status: 400 },
    );
  }

  if (Number.isNaN(Number(teacherId)) || Number.isNaN(Number(classId))) {
    return NextResponse.json(
      {
        message: 'teacherId and classId must be numbers',
      },
      { status: 400 },
    );
  }

  const teacher = await getUserById(teacherId);
  if (!teacher) {
    return NextResponse.json(
      {
        message: 'The teacher does not exist, please provide a valid teacherId',
      },
      { status: 400 },
    );
  }

  const classe = await getClassById(classId);
  if (!classe) {
    return NextResponse.json(
      {
        message: 'The class does not exist, please provide a valid classId',
      },
      { status: 400 },
    );
  }

  const newCourse = await createNewCourse({
    name,
    description,
    teacherId,
    classId,
  });
  if (!newCourse) {
    return NextResponse.json(
      {
        message:
          'An unexpected error has occured, plese try creating the user later',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      course: newCourse,
      url: `/api/v1/courses/${newCourse.id}`,
    },
    { status: 201 },
  );
}
