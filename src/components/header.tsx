import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="flex items-center p-2 w-full sticky top-0 border-b">
      <SidebarTrigger />
      <p className="ml-4">Gestão de produtos</p>
    </header>
  );
}
