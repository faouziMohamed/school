import { findMissingField } from "@/lib/helpers/utils.server";
import {
  createNewUser,
  getAllUsers,
  getUserByEmail,
} from "@/lib/packages/teachers/teacher.service";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getAllUsers();
  if (!users) {
    return NextResponse.json(
      {
        message: "No user exists on the app, retry later",
        users: [],
      },
      { status: 400 },
    );
  }
  return NextResponse.json({ users });
}

export async function POST(request) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      { message: "A body is expected on the request but none has been found" },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, password } = body;
  const missingFields = findMissingField(body);

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: "Some fields are mandatory but they are missing",
        missingFields,
      },
      { status: 400 },
    );
  }

  const maybeUser = await getUserByEmail(email);
  if (maybeUser) {
    return NextResponse.json(
      {
        message: "An account with the provided email already exists",
        signInPath: "/api/v1/sign-in",
      },
      { status: 400 },
    );
  }
  console.log({ body });
  /**
   * @type {import("@prisma/client").User & import("@prisma/client").UserProfile}
   * */
  const data = {
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "USER",
  };

  const newUser = await createNewUser(data);
  console.log({ newUser });
  if (!newUser) {
    return NextResponse.json(
      {
        message:
          "An unexpected error has occured, plese try creating the user later",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      user: newUser,
      url: `/api/v1/users/${newUser.id}`,
    },
    { status: 201 },
  );
}
