# 🛍️ Simple Product List

Aplicação web para **gestão de produtos** desenvolvida como parte de um teste técnico de frontend.  
Feita com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** e **Vitest** para testes.

---

## 📸 Preview

<!-- Substitua com um screenshot do seu projeto se quiser -->
![Preview](./public/screenshot.png)

---

## ✅ Funcionalidades implementadas

- 📦 **Listagem de produtos** com nome, categoria, descrição, preço e imagem
- ➕ **Cadastro de produto** via modal com formulário validado
- 🔍 **Busca por nome** e **filtros por faixa de preço**
- ↕️ **Ordenação por preço (asc/desc)**
- 📄 **Paginação de resultados**
- 🧼 **Reset de filtros**
- 💻 **Layout responsivo**
- 🧪 **Teste de snapshot** com Vitest

---

## 🧰 Tecnologias & Ferramentas

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- [ShadCN UI](https://ui.shadcn.dev/) (componentes de interface)
- [json-server](https://github.com/typicode/json-server) (API fake local)

---

## 🧑‍💻 Como rodar o projeto localmente

```bash
# Instale as dependências
npm install

# Em outro terminal, rode o projeto Next.js
npm run dev
# Esse comando irá rodar o servidor next e json server com o concurrency
