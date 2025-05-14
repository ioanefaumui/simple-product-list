"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export function ProductSearch() {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const initial = searchParams.get("nome") || "";
    setValue(initial);
  }, [searchParams]);

  const buildSearchURL = () => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("nome", value.trim());
      params.set("pagina", "1");
    } else {
      params.delete("nome");
    }
    return `?${params.toString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildSearchURL());
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("nome");
    params.set("pagina", "1");
    setValue("");
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full lg:max-w-sm"
    >
      <div className="relative w-full">
        <Input
          placeholder="Buscar produto..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-10"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <Button type="submit">
        <Search />
      </Button>
    </form>
  );
}
