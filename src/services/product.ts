import { ProductRead } from "@/types";
import { Api } from "./api";

interface ProductFilters {
  nome?: string;
  pagina?: string;
  por_pagina?: string;
  preco?: string;
  preco_min?: string;
  preco_max?: string;
  ordem_nome?: "asc" | "desc";
  ordenar_preco?: "asc" | "desc";
}

export interface PaginationMeta {
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
  data: ProductRead[];
}

export class ProductService {
  private api: Api;

  constructor() {
    this.api = new Api(process.env.API_URL || "http://localhost:4000");
  }

  async getAll(filters: ProductFilters) {
    const url = new URL("/products", this.api["baseUrl"]);
    const {
      nome,
      pagina,
      por_pagina,
      preco,
      preco_min,
      preco_max,
      ordem_nome,
      ordenar_preco,
    } = filters;

    const paginaSegura = Number(pagina);
    const porPaginaSegura = Number(por_pagina);

    if (nome) url.searchParams.set("name", nome);
    if (preco) url.searchParams.set("amount", preco);
    if (preco_min) url.searchParams.set("amount_gte", preco_min);
    if (preco_max) url.searchParams.set("amount_lte", preco_max);

    url.searchParams.set(
      "_page",
      paginaSegura > 0 ? String(paginaSegura) : "1",
    );
    url.searchParams.set(
      "_per_page",
      porPaginaSegura > 0 ? String(porPaginaSegura) : "10",
    );

    const sortFields: string[] = [];

    if (ordenar_preco) {
      sortFields.push(ordenar_preco === "desc" ? "-amount" : "amount");
    } else {
      sortFields.push(ordem_nome === "desc" ? "-name" : "name");
    }

    url.searchParams.set("_sort", sortFields.join(","));

    const res = await this.api.get<PaginationMeta>(url);
    const products = Array.isArray(res) ? res : res.data;
    const meta = !Array.isArray(res) ? res : null;

    return { products, meta };
  }

  async create(data: Omit<ProductRead, "id">) {
    const url = new URL("/products", this.api["baseUrl"]);
    const res = await this.api.post<ProductRead>(url.toString(), data);
    return res;
  }

  async delete(id: string) {
    const url = new URL(`/products/${id}`, this.api["baseUrl"]);
    await this.api.delete(url);
  }
}
