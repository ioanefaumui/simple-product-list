"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";

export function ProductFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [orderPrice, setOrderPrice] = useState<"asc" | "desc" | undefined>(
    undefined,
  );

  useEffect(() => {
    setMin(searchParams.get("preco_min") || "");
    setMax(searchParams.get("preco_max") || "");
    setOrderPrice(
      searchParams.get("ordenar_preco") === "desc"
        ? "desc"
        : searchParams.get("ordenar_preco") === "asc"
          ? "asc"
          : undefined,
    );
  }, [searchParams]);

  const hasFilters =
    !!searchParams.get("preco_min") ||
    !!searchParams.get("preco_max") ||
    !!searchParams.get("ordenar_preco");

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    if (min) params.set("preco_min", min);
    else params.delete("preco_min");

    if (max) params.set("preco_max", max);
    else params.delete("preco_max");

    if (orderPrice) {
      params.set("ordenar_preco", orderPrice);
    } else {
      params.delete("ordenar_preco");
    }

    params.set("pagina", "1");

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("preco_min");
    params.delete("preco_max");
    params.delete("ordenar_preco");
    params.delete("pagina");

    setMin("");
    setMax("");
    setOrderPrice(undefined);
    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="relative flex items-center gap-2 w-fit"
        >
          <Filter />
          <span className="hidden sm:inline-block">Filtros</span>
          {hasFilters && (
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-600" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-4 mr-4 ">
        <div>
          <Label className="text-sm mb-1">Preço mínimo</Label>
          <Input
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Ex: 100"
            type="number"
          />
        </div>
        <div>
          <Label className="text-sm mb-1">Preço máximo</Label>
          <Input
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Ex: 500"
            type="number"
          />
        </div>
        <div>
          <Label className="text-sm mb-1">Ordenar por preço</Label>
          <Select
            value={orderPrice}
            onValueChange={(val) => setOrderPrice(val as "asc" | "desc")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Mais baratos</SelectItem>
              <SelectItem value="desc">Mais caros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleApply}>
            Aplicar filtros
          </Button>
          <Button variant="outline" className="w-full" onClick={handleClear}>
            Limpar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
