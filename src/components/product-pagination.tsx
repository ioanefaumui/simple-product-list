"use client";

import { useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { PaginationMeta } from "@/services";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  meta: Omit<PaginationMeta, "data"> | null;
}

export function ProductPagination({ meta }: Props) {
  if (!meta) return null;

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("pagina") || "1");

  const buildHref = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pagina", String(newPage));
    return `?${params.toString()}`;
  };

  const pagesToShow = 3;
  const pages: (number | "...")[] = [];

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(meta.pages, start + pagesToShow - 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < meta.pages) {
    if (end < meta.pages - 1) pages.push("...");
    pages.push(meta.pages);
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem className="hidden lg:inline-block">
          <Button disabled={!meta.prev} variant="ghost" className="relative">
            <Link
              scroll={false}
              href={buildHref(meta.prev ?? 0)}
              className="absolute inset-0"
            />
            Anterior
          </Button>
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <Button variant="ghost" disabled>
                ...
              </Button>
            ) : (
              <Link href={buildHref(page)} scroll={false}>
                <Button variant={page === currentPage ? "outline" : "ghost"}>
                  {page}
                </Button>
              </Link>
            )}
          </PaginationItem>
        ))}

        <PaginationItem className="hidden lg:inline-block">
          <Button disabled={!meta.next} variant="ghost" className="relative">
            <Link
              scroll={false}
              href={buildHref(meta.next ?? 0)}
              className="absolute inset-0"
            />
            Próxima
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
