import { genSequence } from "@/lib/helpers/utils";

const genId = genSequence();
export const navBarItems = [
  {
    id: genId(),
    name: "Home",
    href: "/",
    permissions: ["admin", "instructor", "student"],
  },
  {
    id: genId(),
    name: "My Courses",
    href: "/my-courses",
    permissions: ["student", "instructor"],
  },
  {
    id: genId(),
    name: "My Classes",
    href: "/my-classes",
    permissions: ["student", "instructor"],
  },
  {
    id: genId(),
    name: "Courses Schedule",
    href: "/courses-schedule",
    permissions: ["student", "instructor", "admin"],
  },
  {
    id: genId(),
    name: "Course Catalog",
    href: "/course-catalog",
    permissions: ["student", "instructor", "admin"],
  },
  {
    id: genId(),
    name: "Users",
    href: "/users",
    permissions: ["admin"],
  },
  {
    id: genId(),
    name: "Settings",
    href: "/settings",
    permissions: ["student", "instructor", "admin"],
  },
];
