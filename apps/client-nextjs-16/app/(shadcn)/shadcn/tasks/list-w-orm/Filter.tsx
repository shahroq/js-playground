"use client";
import { SearchIcon } from "lucide-react";
import { Field } from "@/shadcn/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn/components/ui/input-group";
import { useTaskQuery } from "./use-query";

export function Filters() {
  const { query, updateQuery } = useTaskQuery();

  return (
    <Field className="max-w-sm">
      <InputGroup>
        <InputGroupInput
          id="inline-start-input"
          placeholder="Search..."
          defaultValue={query.term ?? ""}
          onChange={(e) => updateQuery({ term: e.target.value || undefined })}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
