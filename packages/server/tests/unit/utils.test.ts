import { describe, it, expect } from "bun:test";
import { utils } from "@/common/container";

describe("add :", () => {
  it("should return the addition of two number correctly", () => {
    expect(utils.add(1, 2)).toBe(3);
  });
});

describe("User Functions: ", () => {
  it("should return the user", () => {
    const admin = utils.isAdmin(1);
    console.log(admin);
    expect(admin).toBeTrue();
  });
});
