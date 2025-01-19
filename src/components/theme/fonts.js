import {
  League_Spartan,
  Lexend,
  Lexend_Deca,
  Space_Grotesk,
} from "next/font/google";

export const lexendeca = Lexend_Deca({
  variable: "--font-primary",
  weight: "variable",
  subsets: ["latin"],
});

export const leagueSpartan = League_Spartan({
  variable: "--font-secondary",
  weight: "400",
  subsets: ["latin"],
});

export const lexend = Lexend({
  variable: "--font-tertiary",
  weight: "variable",
  subsets: ["latin"],
});

export const loveLight = Space_Grotesk({
  variable: "--font-quaternary",
  weight: "400",
  subsets: ["latin"],
});
