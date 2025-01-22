import { createNewClass } from '@/lib/packages/classes/classes.service';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      { message: 'A body is expected on the request but none has been found' },
      { status: 400 },
    );
  }

  const { name, description = '' } = body;

  const missingFields = [];
  if (!name) {
    missingFields.push('name');
  }

  if (!description) {
    missingFields.push('description');
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

  console.log({ body });
  const newClass = await createNewClass({
    description,
    name,
  });
  console.log({ newClass });
  if (!newClass) {
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
      classe: newClass,
      url: `/api/v1/classes/${newClass.id}`,
    },
    { status: 201 },
  );
}
