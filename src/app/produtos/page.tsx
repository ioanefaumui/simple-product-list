import { ProductList } from "@/components/product-list";
import { ProductService } from "@/services";
import { ProductSearchParams } from "@/types";

export default async function Produtos({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) {
  const q = await searchParams;
  const productService = new ProductService();
  const { meta, products } = await productService.getAll({ ...q });

  return (
    <section className="container-liquid pt-4">
      <h1 className="font-bold">Produtos</h1>
      <ProductList products={products} meta={meta} />
    </section>
  );
}
