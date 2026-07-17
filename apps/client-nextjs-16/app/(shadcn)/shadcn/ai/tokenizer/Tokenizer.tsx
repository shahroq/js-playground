"use client";

import { PropsWithChildren, useActionState } from "react";
import { Json } from "@jsp/shared/comps";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shadcn/components/ui/field";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { Button } from "@/shadcn/components/ui/button";
import { tokenizeAction } from "./actions";

export function Tokenizer() {
  const [state, formAction] = useActionState(tokenizeAction, {
    tokens: [],
    count: 0,
  });

  return (
    <div className="space-y-5">
      <form action={formAction}>
        <FieldSet>
          <FieldGroup className="gap-1">
            <Field>
              <FieldLabel htmlFor="prompt">Prompt</FieldLabel>
              <Textarea
                id="prompt"
                name="prompt"
                defaultValue={state.prompt ?? "Hello World!"}
              />
              <FieldDescription />
            </Field>

            <Field orientation="responsive">
              <Button type="submit">Tokenize</Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      {state.tokenStrings && (
        <div className="flex flex-wrap gap-1">
          {state.tokenStrings.map((token, i) => (
            <Chip key={i}>{token}</Chip>
          ))}
        </div>
      )}

      <Json data={state} />
    </div>
  );
}

function Chip({ children }: PropsWithChildren) {
  return (
    <span className="border rounded px-1.5 py-0.5 text-sm font-mono">
      {children}
    </span>
  );
}
