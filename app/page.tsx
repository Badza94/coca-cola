"use client";

import AnimatedSVG from "@/components/animate-svg";
import { Nav } from "@/components/nav-responsive";
import SvgMask from "@/components/svg-mask";
import { COLORS } from "@/types/enum";
import { useState } from "react";

export default function Home() {
  const [bgColor, setBgColor] = useState<COLORS>(COLORS.RED);

  return (
    <main className="main">
      <Nav bgColor={bgColor} />
      <AnimatedSVG />
      <SvgMask bgColor={bgColor} setBgColor={setBgColor} />
    </main>
  );
}
