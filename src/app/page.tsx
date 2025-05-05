import Image from "next/image";
import { Bgb } from "./components/Bgb";
import Link from "next/link";
import MouseMove from "./components/MouseMove";
import Slide from "./components/Slide";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center overflow-hidden">
        <Bgb />
        <Slide />
        {/* <MouseMove /> */}
      </main>
    </div>
  );
}
