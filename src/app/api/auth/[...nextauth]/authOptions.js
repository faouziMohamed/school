import { AuthErrorException } from "@/lib/helpers/AuthException";
import { capitalizeWords } from "@/lib/helpers/utils";
import {
  adaptUserFromDb,
  discoverFrontUserRole,
  findMissingField,
  hashPassword,
  verifyPassword,
} from "@/lib/helpers/utils.server";
import {
  createNewStudent,
  getStudentByEmail,
} from "@/lib/packages/students/students.service";
import {
  createNewUser,
  getUserByEmail,
  getUserById,
} from "@/lib/packages/teachers/teacher.service";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      /**
       * @param {CreateUserBody} credentials
       */
      async authorize(credentials) {
        const { email, password, action } = credentials;
        if (!email || !password || !action) {
          throw new AuthErrorException({
            message: "The email, password, and action are required.",
          });
        }
        if (action !== "login" && action !== "register") {
          throw new AuthErrorException({
            message: "Please specify if it's a login or a registration",
          });
        }

        const role = credentials.role;
        if (!role || (role !== "student" && role !== "teacher")) {
          throw new AuthErrorException({
            message: `Invalid role, The role is required and must be either student or teacher`,
          });
        }

        const maybeUser =
          role === "student"
            ? await getStudentByEmail(email)
            : await getUserByEmail(email);

        if (action === "login") {
          // Login an existing user
          if (!maybeUser) {
            throw new AuthErrorException({
              message: "The email or password is incorrect.",
            });
          }
          const hashPwd = maybeUser.password;
          const isCorrect = await verifyPassword(password, hashPwd);
          if (!isCorrect) {
            throw new AuthErrorException({
              message: "The email or password is incorrect.",
            });
          }
          const dbUserRole = maybeUser.profile.role || null;
          const userRole = discoverFrontUserRole(role, dbUserRole);
          return adaptUserFromDb(maybeUser, userRole);
        }

        // Register a new user
        if (maybeUser) {
          throw new AuthErrorException({
            message: "An account with the provided email already exists",
            status: 409,
          });
        }
        const missingFields = findMissingField(credentials);
        if (missingFields.length > 0) {
          throw new AuthErrorException({
            message: "Some fields are mandatory but they are missing",
            description: missingFields,
          });
        }
        const hashPwd = await hashPassword(password);
        /**
         * @type {Omit<CreateUserInput, "role">}
         */
        const userBody = {
          firstName: capitalizeWords(credentials.firstName),
          lastName: capitalizeWords(credentials.lastName),
          email: credentials.email.toLowerCase(),
          phone: credentials.phone,
          password: hashPwd,
        };
        let newUser =
          role === "student"
            ? await createNewStudent(userBody)
            : await createNewUser({ ...userBody, role: "USER" });

        if (!newUser) {
          throw new AuthErrorException({
            message:
              "An error occurred while creating the user, please try again later",
          });
        }
        return adaptUserFromDb(newUser, credentials.role);
      },
    }),
  ],
  strategy: "jwt",
  callbacks: {
    /**
     * @param {object} param0
     * @param {FrontUserWithToken} param0.token
     * @param {FrontUser} param0.user
     */
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      } else {
        /** @type {FrontUserRole} */
        const role = token.user.role;
        const userFromDb =
          role === "student"
            ? await getUserById(token.user.id)
            : await getUserById(token.user.id);

        if (userFromDb) {
          token.user = adaptUserFromDb(userFromDb, role);
        }
      }
      return token;
    },
    /**
     * @param {object} param0
     * @param {FrontUserWithToken} param0.token
     */
    async session({ token, session }) {
      session.user = token.user;
      session.role = token.user.role || "student";
      return session;
    },
  },
};
