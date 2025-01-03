import {
  createUser,
  getAllUsers,
  isUserExistByEmail,
} from "@/lib/packages/users/users.service";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getAllUsers();
  if (!users) {
    return NextResponse.json(
      {
        message: "No user exists on the app, retry later",
        users: [],
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ users });
}

export async function POST(request) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      { message: "A body is expected on the request but none has been found" },
      { status: 400 }
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    role = "STUDENT",
  } = body;

  const missingFields = [];
  if (!firstName) {
    missingFields.push("firstName");
  }
  if (!lastName) {
    missingFields.push("lastName");
  }
  if (!email) {
    missingFields.push("email");
  }
  if (!phone) {
    missingFields.push("phone");
  }

  if (!password) {
    missingFields.push("password");
  }

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: "Some fields are mandatory but they are missing",
        missingFields,
      },
      { status: 400 }
    );
  }

  const userExist = await isUserExistByEmail(email);
  if (userExist) {
    return NextResponse.json(
      {
        message: "An account with the provided email already exists",
        signInPath: "/api/v1/sign-in",
      },
      { status: 400 }
    );
  }
  console.log({ body });
  const data = {
    firstName,
    lastName,
    email,
    phone,
    role,
    password,
  };

  const newUser = await createUser(data);
  console.log({ newUser });
  if (!newUser) {
    return NextResponse.json(
      {
        message:
          "An unexpected error has occured, plese try creating the user later",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      user: newUser,
      url: `/api/v1/users/${newUser.id}`,
    },
    { status: 201 }
  );
}
