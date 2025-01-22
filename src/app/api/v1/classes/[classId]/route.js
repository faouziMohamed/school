import { getClassById } from '@/lib/packages/classes/classes.service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const nextParam = await params;
  const classId = nextParam.classId;
  if (Number.isNaN(Number(classId))) {
    return NextResponse.json({ message: 'Id incorret' }, { status: 400 });
  }

  const classe = await getClassById(classId);
  if (!classe) {
    return NextResponse.json(
      { message: 'User et Id introuvable' },
      { status: 404 },
    );
  }
  return NextResponse.json(classe);
}
