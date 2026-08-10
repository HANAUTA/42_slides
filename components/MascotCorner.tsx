"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// 右下マスコットの候補。index を SlideConfig.mascot で指定すれば手動固定できる。
export const CHARACTERS = [
  { src: "/hanau-tan_aboutx2-1.png", width: 164, height: 232 }, // 0
  { src: "/hanau-tan_blogx2.png", width: 218, height: 218 }, // 1
  { src: "/hanau-tan_contact.png", width: 226, height: 226 }, // 2
  { src: "/hanau-tan_newsx3.png", width: 558, height: 558 }, // 3
  { src: "/hanau-tan_servicex2.png", width: 236, height: 236 }, // 4
  { src: "/member.png", width: 474, height: 474 }, // 5
];

interface MascotCornerProps {
  /** CHARACTERS の index。指定するとそのキャラで固定、省略時はランダム */
  index?: number;
}

/** スライド右下に飾るマスコット。index未指定ならスライドが切り替わるたびにランダムに選び直す。 */
export default function MascotCorner({ index }: MascotCornerProps) {
  // サーバーとクライアントで乱数がズレてhydrationエラーになるため、
  // マウント後（クライアント側のみ）に抽選する。
  const [character, setCharacter] = useState<(typeof CHARACTERS)[number] | null>(
    index !== undefined ? CHARACTERS[index] : null,
  );

  useEffect(() => {
    if (index !== undefined) return;
    setCharacter(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
  }, [index]);

  if (!character) return null;

  return (
    <Image
      src={character.src}
      alt=""
      width={character.width}
      height={character.height}
      className="rise-in pointer-events-none absolute bottom-[60px] right-[76px] z-10 h-[170px] w-auto"
    />
  );
}
