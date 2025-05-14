"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ProductRead } from "@/types";
import { PaginationMeta, ProductService } from "@/services";
import { ProductPagination } from "./product-pagination";
import { ProductSearch } from "./product-search";
import { ProductFilter } from "./product-filter";
import { CreateProductModal } from "./create-product-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<ProductRead>[] = [
  {
    accessorKey: "image",
    header: "Foto",
    cell: ({ row }) => (
      <div className="relative w-10 h-8">
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          fill
          sizes="(max-width: 640px) 100vw, 40px"
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize min-w-[7.5rem]">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="min-w-[12.5rem]">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Preço</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const router = useRouter();
      const handleDelete = async () => {
        const confirm = window.confirm(`Deseja remover "${product.name}"?`);
        if (!confirm) return;

        const productService = new ProductService();
        try {
          await productService.delete(product.id);
          toast.success("Produto removido com sucesso");
          router.refresh();
        } catch (err) {
          console.error(err);
          toast.error("Erro ao remover produto");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(product.name)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Remover</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface Props {
  products: ProductRead[];
  meta: Omit<PaginationMeta, "data"> | null;
}

export function ProductList({ products = [], meta }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-x-2 gap-y-4 mt-4">
        <div className="flex gap-2 w-full">
          <ProductSearch />
          <ProductFilter />
        </div>
        <div className="col-span-2 text-right">
          <CreateProductModal />
        </div>
      </div>

      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-normal">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <ProductPagination meta={meta} />
      </div>
    </div>
  );
}
