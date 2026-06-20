import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../data";
import { usersTable } from "@/data/schema";

/**
 * utility functions
 */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateUser(email: string, password: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();

  if (!user || !user.password) return null;

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };
}
