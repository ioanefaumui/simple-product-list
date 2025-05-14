import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { CreateProductModal } from "@/components/create-product-modal";

test("create-product-modal matches snapshot", () => {
  const { baseElement } = render(<CreateProductModal />);
  expect(baseElement).toMatchSnapshot();
});
