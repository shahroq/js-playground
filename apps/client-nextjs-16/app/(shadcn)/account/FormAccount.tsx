"use client";
import { useActionState } from "react";
import Form from "next/form";
import { editAccountAction } from "@/auth/actions";
import { Json } from "@jsp/shared/comps";
import { User } from "@jsp/shared/types";
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

type Props = {
  user?: User;
};

export default function FormAccount({ user }: Props) {
  const [state, action, isPending] = useActionState(editAccountAction, {
    success: false,
    message: "",
  });

  return (
    <Form action={action}>
      <Json data={state} className="mb-5" />

      <FieldSet>
        <FieldLegend>Account Info</FieldLegend>
        {state && !state.success && state.message && (
          <FieldDescription></FieldDescription>
        )}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="input-field-name">Name</FieldLabel>
            <Input
              id="input-field-name"
              type="name"
              name="name"
              defaultValue={user?.name}
            />
            <FieldDescription></FieldDescription>
          </Field>
          <Field orientation="responsive">
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Edit Account
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
