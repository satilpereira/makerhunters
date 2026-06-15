import { DefaultSession } from "next-auth";
import type { DefaultUser } from "next-auth";
import { Users as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User extends Omit<DefaultUser, "id"> {
    id: string | number;
    userId?: PrismaUser["id"];
    email: PrismaUser["email"];
    name: PrismaUser["name"];
    last_name: PrismaUser["last_name"];
    image_url?: PrismaUser["image_url"];
    google_id?: PrismaUser["google_id"];
    github_id?: PrismaUser["github_id"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number;
    userId?: PrismaUser["id"];
    email: PrismaUser["email"];
    name: PrismaUser["name"];
    last_name: PrismaUser["last_name"];
    image_url?: PrismaUser["image_url"];
    google_id?: PrismaUser["google_id"];
    github_id?: PrismaUser["github_id"];
  }
}