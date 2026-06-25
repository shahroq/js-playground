"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { sql, eq } from "drizzle-orm";
import { db } from "@/data";
import { signInSchema } from "./validations";
import { signIn, signOut, unstable_update } from ".";
import { pause } from "@jsp/shared/utils";
import { usersTable } from "@/data/schema";
import { auth } from "."; // same place you're importing signIn/signOut from
import { accountSchema } from "./validations";
import { revalidatePath } from "next/cache";

/**
 * sign in w/ credentials reducer
 */

export async function signInAction(prevState: unknown, formData: FormData) {
  await pause(0);
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (e) {
    if (isRedirectError(e)) throw e;

    // return { success: false, message: "Invalid email or password..." };
    return { success: false, message: JSON.stringify(e) };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/e-com" });
}

export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  return user ?? null;
}

export async function editAccountAction(
  prevState: unknown,
  formData: FormData,
) {
  await pause(1000);

  try {
    const session = await auth();

    if (!session?.user?.id) return { success: false, message: "Unauthorized" };

    const account = accountSchema.parse({
      name: formData.get("name"),
    });

    await db
      .update(usersTable)
      .set({ name: account.name })
      .where(eq(usersTable.id, session.user.id));

    await unstable_update({ user: { name: account.name } });

    revalidatePath("/account");

    return { success: true, message: "Account updated successfully" };
  } catch (e) {
    return { success: false, message: JSON.stringify(e) };
  }
}
