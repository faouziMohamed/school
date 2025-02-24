import { getClassTeachersByClassId } from '@/lib/packages/classes/classes.service';
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
  const teachers = await getClassTeachersByClassId(classId);
  return NextResponse.json({ data: teachers });
}
