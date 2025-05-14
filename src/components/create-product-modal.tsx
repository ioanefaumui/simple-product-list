"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { ProductService } from "@/services";
import { Dices } from "lucide-react";
import { toast } from "sonner";

export function CreateProductModal() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    category: "",
    amount: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        category: "",
        amount: "",
        description: "",
        image: "",
      });
      setErrors({});
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "amount") {
      const raw = value.replace(/\D/g, "");
      const numeric = Number(raw) / 100;

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(numeric);

      setForm((prev) => ({ ...prev, amount: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  function parseCurrencyBR(value: string): number {
    return Number(value.replace(/[^\d,.-]/g, "").replace(",", "."));
  }

  const handleSubmit = async () => {
    const productService = new ProductService();
    const newErrors: Record<string, string> = {};

    if (!form.name) newErrors.name = "Nome é obrigatório";
    if (!form.category) newErrors.category = "Categoria é obrigatória";
    if (!form.amount) newErrors.amount = "Preço é obrigatório";
    if (!form.description) newErrors.description = "Descrição é obrigatória";
    if (!form.image) newErrors.image = "Imagem é obrigatória";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await productService.create({
        name: form.name,
        category: form.category,
        amount: parseCurrencyBR(form.amount),
        description: form.description,
        image: form.image,
      });
      setOpen(false);
      toast(`Produto criado com sucesso!`);
      setForm({
        name: "",
        category: "",
        amount: "",
        description: "",
        image: "",
      });
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      toast(`Houve um erro ao criar o produto.`);
    }
  };

  const gerarImagemAleatoria = () => {
    const id = Math.floor(Math.random() * 200) + 1;
    const url = `https://picsum.photos/id/${id}/300/200`;

    setForm((prev) => ({ ...prev, image: url }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="ml-auto" onClick={() => setOpen(true)}>
        Adicionar produto
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Nome</Label>
            <Input
              name="name"
              aria-invalid={!!errors.name}
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              className="aria-[invalid='true']:border-destructive"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label>Categoria</Label>
            <Input
              name="category"
              aria-invalid={!!errors.category}
              value={form.category}
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.category && (
              <p className="text-sm text-destructive mt-1">{errors.category}</p>
            )}
          </div>
          <div>
            <Label>Preço</Label>
            <Input
              name="amount"
              aria-invalid={!!errors.amount}
              value={form.amount || ""}
              onChange={handleChange}
              autoComplete="off"
              type="text"
              inputMode="numeric"
            />
            {errors.amount && (
              <p className="text-sm text-destructive mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <Label>Descrição</Label>
            <Input
              name="description"
              aria-invalid={!!errors.description}
              value={form.description}
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <Label>Imagem (URL)</Label>
            <div className="relative">
              <Input
                name="image"
                aria-invalid={!!errors.image}
                value={form.image}
                onChange={handleChange}
                autoComplete="off"
                type="text"
                className="pr-10"
              />
              <button
                type="button"
                onClick={gerarImagemAleatoria}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <Dices size={16} />
              </button>
            </div>
            {errors.image && (
              <p className="text-sm text-destructive mt-1">{errors.image}</p>
            )}
          </div>
          <Button className="w-full mt-4" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
