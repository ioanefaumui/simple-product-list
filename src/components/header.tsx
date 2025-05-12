import { useEffect, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="flex items-center p-2 w-full sticky top-0 border-b">
      <SidebarTrigger />
    </header>
  );
}
