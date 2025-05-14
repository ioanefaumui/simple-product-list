import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { ProductFilter } from "@/components/product-filter";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(""),
}));

test("product-filter matches snapshot", () => {
  const { baseElement } = render(<ProductFilter />);
  expect(baseElement).toMatchSnapshot();
});
