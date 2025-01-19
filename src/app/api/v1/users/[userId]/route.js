import { getUserById } from "@/lib/packages/teachers/teacher.service";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const nextParam = await params;
  const userId = nextParam.userId;
  if (Number.isNaN(Number(userId))) {
    return NextResponse.json({ message: "Id incorret" }, { status: 400 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json(
      { message: "User et Id introuvable" },
      { status: 404 },
    );
  }
  return NextResponse.json({ user });
}
