import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from 'slugify';
import { prisma } from '@/prisma'
import { PrismaClient } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const checkForAuth = async (roles: Role[]) => {

  const session = await auth();
  // Check if the user is authenticated.
  if (!session) throw new Error('Your are not logged in. Please login and try to create a store.');

  // Check for Permission.
  const hasRole = roles.find((role) => role === session.user.role);

  if (!hasRole) throw new Error('You don not have permission to create record.');
  return session;
}

export const generateUniqueSlug = async (input: string, slugField: string, model: {findUnique: Function}) => {
  const base = slugify(input, { lower: true, strict: true, trim: true });
  let slug = base;
  let suffix = 1;

  while (await model.findUnique({
    where: { slug }
  })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;

}