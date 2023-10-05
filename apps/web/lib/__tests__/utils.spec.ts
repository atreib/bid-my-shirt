/* eslint-disable no-constant-condition -- mocking tests... */
/* eslint-disable no-constant-binary-expression -- mocking tests... */
/* eslint-disable @typescript-eslint/no-unnecessary-condition -- mocking tests... */

import { describe, it, expect } from "vitest";
import * as sut from "../utils";

describe("cn", () => {
  it("Should merge multiple classes", () => {
    const result = sut.cn("a", "b", false && "no", true ? "yes" : "no");
    expect(result).toBe("a b yes");
  });
});

describe("makeErrorFromDF", () => {
  it("Should make error instance from DF error result", () => {
    const result = sut.makeErrorFromDF({
      success: false,
      inputErrors: [],
      environmentErrors: [],
      errors: [
        {
          message: "a",
        },
        {
          message: "b",
        },
      ],
    });
    expect(result).toEqual(new Error("a, b"));
  });
});
