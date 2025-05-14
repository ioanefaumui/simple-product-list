import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { ProductSearch } from "@/components/product-search";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(""),
}));

test("product-search matches snapshot", () => {
  const { baseElement } = render(<ProductSearch />);
  expect(baseElement).toMatchSnapshot();
});
