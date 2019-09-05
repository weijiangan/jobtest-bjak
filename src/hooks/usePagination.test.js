import { act } from "react-dom/test-utils";
import { testHook } from "./testUtils";
import { usePagination } from "./usePagination";

let retVal;
beforeEach(() => {
  testHook(() => {
    retVal = usePagination(3);
  });
});

describe("usePagination", () => {
  test("should be on page 1", () => {
    expect(retVal[0]).toBe(1);
  });

  test("should have an setPage function", () => {
    expect(retVal[1]).toBeInstanceOf(Function);
  });

  test("should have an paginator function", () => {
    expect(retVal[2]).toBeInstanceOf(Function);
  });

  test("paginator 2 whole pages", () => {
    expect(retVal[2]([1, 2, 3, 4, 5, 6])).toEqual([[1, 2, 3], 2]);
  });

  test("paginator 3 pages with spare", () => {
    expect(retVal[2]([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([[1, 2, 3], 3]);
  });

  test("setPage should set page correctly", () => {
    act(() => {
      retVal[1](33);
    });
    expect(retVal[0]).toBe(33);
  });
});
