import {
  createNewStudent,
  getAllStudents,
  isStudentExistByEmail,
  searchStudentsByNames,
} from '@/lib/packages/students/students.service';
import { NextResponse } from 'next/server';

/**
 * @param {import('next/server').NextRequest} request
 */
export async function GET(request) {
  const search = request.nextUrl.searchParams.get('search');
  const students = search
    ? await searchStudentsByNames(search)
    : await getAllStudents();

  return NextResponse.json({ data: students });
}

export async function POST(request) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      { message: 'A body is expected on the request but none has been found' },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, password } = body;

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

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: 'Some fields are mandatory but they are missing',
        missingFields,
      },
      { status: 400 },
    );
  }

  const studentExists = await isStudentExistByEmail(email);
  if (studentExists) {
    return NextResponse.json(
      {
        message: 'An account with the provided email already exists',
        signInPath: '/api/v1/sign-in',
      },
      { status: 400 },
    );
  }

  const data = {
    firstName,
    lastName,
    email,
    phone,
    password,
  };

  const newStudent = await createNewStudent(data);
  console.log({ newStudent });
  if (!newStudent) {
    return NextResponse.json(
      {
        message:
          'An unexpected error has occured, plese try creating the student later',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      user: newStudent,
      url: `/api/v1/student/${newStudent.id}`,
    },
    { status: 201 },
  );
}
