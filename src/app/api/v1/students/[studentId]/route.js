import { getStudentById } from '@/lib/packages/students/students.service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const nextParam = await params;
  const studentId = nextParam.studentId;
  if (Number.isNaN(Number(studentId))) {
    return NextResponse.json({ message: 'Id incorret' }, { status: 400 });
  }

  const student = await getStudentById(studentId);
  if (!student) {
    return NextResponse.json(
      { message: 'student et Id introuvable' },
      { status: 404 },
    );
  }
  return NextResponse.json({ user: student });
}
