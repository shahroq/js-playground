"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInSchema } from "./validations";
import { signIn, signOut } from ".";
import { pause } from "@jsp/shared/utils";

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
