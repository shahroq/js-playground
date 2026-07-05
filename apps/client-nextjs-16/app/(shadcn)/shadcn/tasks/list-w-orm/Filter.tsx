"use client";
import { SearchIcon } from "lucide-react";
import { Field } from "@/shadcn/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn/components/ui/input-group";
import { useTaskQuery } from "./use-task-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { TaskStatus, taskStatus } from "@jsp/shared/types";

export function Filters() {
  const { query, updateQuery } = useTaskQuery();

  return (
    <>
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

      <Select
        defaultValue={query.status ?? ""}
        onValueChange={(value) =>
          updateQuery({
            status: value === "" ? undefined : (value as TaskStatus),
          })
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="All" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All</SelectItem>
          {taskStatus.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
