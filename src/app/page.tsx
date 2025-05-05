"use client";

import { useState } from "react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [n, setN] = useState(0);

  return (
    <>
      <div className="fixed top-3 right-3 flex">
        <ThemeSwitcher />
      </div>

      <div className="flex min-h-svh items-center justify-center gap-2">
        <div>{n}</div>
        <Button
          onClick={() => {
            setN((v) => v + 1);
          }}
        >
          +1
        </Button>
      </div>
    </>
  );
}
