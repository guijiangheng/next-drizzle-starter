"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [n, setN] = useState(0);

  return (
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
  );
}
