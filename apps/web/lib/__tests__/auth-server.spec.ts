import { vi, describe, it, expect } from "vitest";
import * as Clerk from "@clerk/nextjs"; // currentUser
import * as NextNavigation from "next/navigation"; // redirect
import { requireUser } from "../auth-server";

vi.mock("next/navigation", () => ({
  redirect: vi.fn().mockReturnValue({ redirected: true }),
}));

describe("requireUser", () => {
  it("Should return the authenticated user", async () => {
    // Arrange
    const mockUser = { id: "mock-user" } as never;
    const currentUserSpy = vi
      .spyOn(Clerk, "currentUser")
      .mockResolvedValueOnce(mockUser);

    // Act
    const result = await requireUser();

    // Assert
    expect(result).toEqual(mockUser);
    expect(currentUserSpy).toHaveBeenCalledWith();
  });

  describe("When user is not authenticated", () => {
    it("Should redirect user", async () => {
      // Arrange
      vi.spyOn(Clerk, "currentUser").mockResolvedValueOnce(null);
      const redirectSpy = vi.spyOn(NextNavigation, "redirect");

      // Act
      const result = await requireUser();

      // Assert
      expect(result).toEqual({ redirected: true });
      expect(redirectSpy).toHaveBeenCalledWith("/");
    });
  });
});
