import { describe, it, expect } from "bun:test";
import { add, isAdmin } from "@/common/utils/utils";

describe("add :", () => {
  it("should return the addition of two number correctly", () => {
    expect(add(1, 2)).toBe(3);
  });
});

describe("User Functions: ", () => {
  it("should return the user", () => {
    const admin = isAdmin(1);
    console.log(admin);
    expect(admin).toBeTrue();
  });
});
