import { getCourseById } from "@/lib/packages/courses/courses.service";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const nextParam = await params;
  const courseId = nextParam.courseId;
  if (Number.isNaN(Number(courseId))) {
    return NextResponse.json({ message: "Id incorret" }, { status: 400 });
  }

  const course = await getCourseById(courseId);
  if (!course) {
    return NextResponse.json(
      { message: "This course does not exist" },
      { status: 404 },
    );
  }
  return NextResponse.json(course);
}
