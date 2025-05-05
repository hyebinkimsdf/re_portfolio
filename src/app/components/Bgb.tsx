"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(useGSAP);

export function Bgb() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const app = [
    { img: "", title: "테스트", link: "/about" },
    { img: "", title: "테스트2", link: "/work" },
    { img: "", title: "테스트3" },
  ];
  // GSAP drag Animation
  useGSAP(
    () => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        Draggable.create(item, {
          onPress: () => {
            gsap.to(item, {
              duration: 0.1,
              scale: 1.2,
              rotate: gsap.utils.random(-9, 9),
              zIndex: 100,
            });
          },
          onRelease: () => {
            gsap.to(item, {
              duration: 0.4,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              ease: "elastic.out(0.5, 0.3)",
            });
          },
        });
      });
    },
    { scope: containerRef } // 이 DOM 범위 안에서만 적용됨
  );

  return (
    <div
      ref={containerRef}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 items-center justify-center shadow-xl w-fit h-24 px-10 py-4 rounded-2xl border-2 border-solid border-[#E5E7EB] "
    >
      {app.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="appItem w-20 h-20 rounded-xl shadow-lg bg-white text-center flex items-end justify-center py-2 cursor-grab"
        >
          <Link href={item.link ?? "#"} onClick={(e) => e.stopPropagation()}>
            <Image src={item.img} alt="..." width={80} height={80} />
          </Link>

          {/* <p>{item.title}</p> */}
        </div>
      ))}
    </div>
  );
}
