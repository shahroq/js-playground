"use client";
import { useActionState } from "react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { signInDefaultValues, home } from "@/auth/consts";
import { signInWCredentialsReducer } from "@/auth/actions";
import { Json } from "@jsp/shared/comps";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shadcn/components/ui/field";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { Spinner } from "@/shadcn/components/ui/spinner";

export default function FormSignIn() {
  const [state, action, isPending] = useActionState(signInWCredentialsReducer, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || home;

  return (
    <Form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <Json data={state} />
      <FieldSet>
        <FieldLegend>Sign In</FieldLegend>
        {state && !state.success && state.message && (
          <FieldDescription></FieldDescription>
        )}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
            <Input
              id="input-field-email"
              type="email"
              name="email"
              defaultValue={signInDefaultValues.email}
            />
            <FieldDescription></FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
            <Input
              id="input-field-password"
              type="password"
              name="password"
              defaultValue={signInDefaultValues.password}
            />
            <FieldDescription></FieldDescription>
          </Field>
          <Field orientation="responsive">
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Sign In
            </Button>
            <Button type="reset" variant="outline" disabled={isPending}>
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Form>
  );
}
