"use client"; // 만약 Next.js 13+ app 디렉토리 사용 중이라면 필요

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { text } from "stream/consumers";

export default function Slide() {
  const slideProps = [
    {
      name: "박지은 (기획자)",
      text: "항상 책임감 있게 업무를 처리하며, 주어진 일을 넘어 스스로 할 수 있는 부분을 찾아나가는 주도적인 동료입니다.",
    },
    {
      name: "이상훈 (프론트엔드 개발자)",
      text: "개발과 디자인 사이의 소통을 자연스럽게 이끌어주는 분입니다.",
    },
    {
      name: "정소영 (팀장)",
      text: "처음보다 훨씬 성장한 모습이 인상 깊습니다. 피드백을 잘 수용하고, 빠르게 실무에 반영하는 능력이 탁월합니다.",
    },
    {
      name: "김도윤 (백엔드 개발자)",
      text: "문제가 발생했을 때 단순히 넘기지 않고, 원인을 파악해 개선하려는 태도가 돋보였습니다.",
    },
  ];

  const splideRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 Splide 초기화
    if (splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 3,
        gap: "1rem",
        arrows: false,
        pagination: false,
        autoScroll: {
          speed: 1,
          pauseOnHover: true,
        },
      });

      // AutoScroll 확장을 별도로 등록
      splide.mount({ AutoScroll });

      // 클린업 함수
      return () => {
        if (splide) {
          splide.destroy();
        }
      };
    }
  }, []);

  return (
    <div className="splide" ref={splideRef}>
      <div className="splide__track">
        <ul className="splide__list">
          {slideProps.map((item, index) => (
            <li
              key={index}
              className="splide__slide p-4 bg-gray-100 rounded shadow h-48 flex flex-col gap-4 items-center justify-center"
            >
              <p>{item.name}</p>
              <p className="text-center text-lg font-bold">{item.text}</p>
            </li>
          ))}
          {/* 추가 슬라이드 예시 */}
        </ul>
      </div>
    </div>
  );
}
