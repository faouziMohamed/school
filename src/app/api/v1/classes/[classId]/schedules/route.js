import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { parseTime, WORK_DAYS } from '@/lib/helpers/utils';
import { getClassTeacherCourseByIds } from '@/lib/packages/classes/classes.service';
import {
  createSchedule,
  getAllClassSchedules,
  getScheduleByTimeClassCourseIdAndDay,
} from '@/lib/packages/schedules/schedules.service';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

/**
 * @param {import('next/server').NextRequest} request
 */
export async function POST(request) {
  /** @type {{user?: FrontUser}} */
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { message: 'Unauthorized Access detected' },
      { status: 401 },
    );
  }
  const user = session.user;
  if (user.role !== 'admin') {
    return NextResponse.json(
      { message: 'Forbidden Access detected' },
      { status: 403 },
    );
  }
  /** @type {CreateScheduleBody} */
  const body = await request.json();
  const { classId, courseId, note = '', day, endTime, startTime } = body;
  const { classTeacherId } = body;
  if (Number.isNaN(Number(classId))) {
    return NextResponse.json(
      { message: 'Incorrect class id' },
      { status: 400 },
    );
  }
  if (Number.isNaN(Number(courseId))) {
    return NextResponse.json(
      { message: 'Incorrect course id' },
      { status: 400 },
    );
  }

  if (Number.isNaN(Number(classTeacherId))) {
    return NextResponse.json(
      { message: 'Incorrect correlation id' },
      { status: 400 },
    );
  }

  if (!WORK_DAYS.includes(day)) {
    return NextResponse.json({ message: 'Incorrect day' }, { status: 400 });
  }

  if (!startTime || !endTime) {
    return NextResponse.json(
      { message: 'Incorrect times, please provide start and end time' },
      { status: 400 },
    );
  }

  // the times are expected in the format HH:mm
  const startTimeParts = startTime.split(':');
  const endTimeParts = endTime.split(':');
  if (startTimeParts.length !== 2 || endTimeParts.length !== 2) {
    return NextResponse.json(
      { message: 'Incorrect time format, please provide HH:mm' },
      { status: 400 },
    );
  }

  const parsedStartTime = parseTime(startTime);
  const parsedEndTime = parseTime(endTime);
  if (!parsedStartTime || !parsedEndTime) {
    return NextResponse.json(
      { message: 'Incorrect time format, please provide HH:mm' },
      { status: 400 },
    );
  }

  const isStartTimeBeforeEndTime = parsedStartTime.isBefore(parsedEndTime);
  if (!isStartTimeBeforeEndTime) {
    return NextResponse.json(
      {
        message:
          'Start time should always be before end time. Example: 08:00 - 09:00',
      },
      { status: 400 },
    );
  }

  const ctc = await getClassTeacherCourseByIds(courseId, classTeacherId);
  if (!ctc) {
    return NextResponse.json(
      {
        message: `The combination of class id ${classId} and course id ${courseId} does not exist`,
      },
      { status: 404 },
    );
  }
  const scheduleExists = await getScheduleByTimeClassCourseIdAndDay({
    classTeacherCourseId: Number(ctc.id),
    day: day.toUpperCase(),
    startTime,
    endTime,
  });
  if (scheduleExists) {
    return NextResponse.json(
      { message: 'Schedule already exists for this class and course' },
      { status: 409 },
    );
  }
  /** @type {CreateScheduleBody} */
  const data = {
    classId: Number(classId),
    courseId: Number(courseId),
    classTeacherId: Number(classTeacherId),
    day: day.toUpperCase(),
    startTime,
    endTime,
    note,
  };
  try {
    const schedule = await createSchedule(data);
    if (!schedule) {
      return NextResponse.json(
        { message: 'Error creating schedule' },
        { status: 400 },
      );
    }
    return NextResponse.json(schedule, { status: 201 });
  } catch (e) {
    console.error('Error creating schedule ==>', e, '\n\n\n');
    return NextResponse.json(
      { message: 'Error creating schedule' },
      { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  const nextParam = await params;
  const classId = nextParam.classId;
  if (Number.isNaN(Number(classId))) {
    return NextResponse.json(
      { message: 'Incorrect Class Id' },
      { status: 400 },
    );
  }

  const schedules = await getAllClassSchedules(classId);
  return NextResponse.json({ data: schedules });
}
