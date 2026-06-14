"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";
import { WavePattern } from "@/components/shared/wave-pattern";
import { ARMATIS_107, RENDERS } from "@/lib/yacht";

// Reference angle (from the Halide source): rotateX(55deg) rotateZ(-25deg).
// Same tilt on every breakpoint — mobile mirrors desktop.
const REST_X = 55;
const REST_Z = -25;

// The hero is always a dark, cinematic stage (independent of the light content below).
export function IndustrialHero() {
  const t = useTranslations("industrial");
  const plateRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plate = plateRef.current;
    const layer = layerRef.current;
    if (!plate) return;

    plate.style.opacity = "0";
    plate.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.82)";
    const entrance = window.setTimeout(() => {
      plate.style.transition =
        "transform 2.5s var(--ease-out-luxe), opacity 2.2s var(--ease-out-luxe)";
      plate.style.opacity = "1";
      plate.style.transform = `rotateX(${REST_X}deg) rotateZ(${REST_Z}deg) scale(1)`;
    }, 200);

    const onMove = (e: PointerEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      plate.style.transform = `rotateX(${REST_X + y / 2}deg) rotateZ(${
        REST_Z + x / 2
      }deg) scale(1)`;
      if (layer) layer.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.clearTimeout(entrance);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const readout: [string, string][] = [
    [t("readout.latitude"), ARMATIS_107.latitude],
    [t("readout.loa"), ARMATIS_107.loa],
    [t("readout.beam"), ARMATIS_107.beam],
  ];

  return (
    <section className="relative h-svh w-full overflow-hidden bg-[#0a0a0a] text-bone select-none">
      {/* brand wave texture (light lines on the dark stage) */}
      <WavePattern variant="light" className="z-0 opacity-[0.06]" />

      {/* ---- 3D stage with the tilted render plate ---- */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ perspective: "2000px" }}
      >
        <div
          ref={plateRef}
          className="relative aspect-[16/9] w-[94vw] max-w-[1120px] will-change-transform sm:w-[76vw]"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.8s var(--ease-out-luxe)" }}
        >
          <div ref={layerRef} className="absolute inset-0 overflow-hidden rounded-[42px] transition-transform duration-500 ease-out">
            <Image
              src={RENDERS.profileGolden}
              alt={ARMATIS_107.model}
              fill
              priority
              sizes="94vw"
              className="object-cover grayscale brightness-[0.66] contrast-[1.12]"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[42px]"
              style={{ boxShadow: "inset 0 0 150px 46px #0a0a0a" }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[42px] border border-white/15" />
          </div>

          {/* topographic contour rings, lifted in Z.
              Desktop: unchanged. Mobile: denser + wider coverage so the rings
              fill the screen and continue downward past the plate. */}
          <div
            className="pointer-events-none absolute hidden sm:block"
            style={{
              inset: "-50%",
              width: "200%",
              height: "200%",
              transform: "translateZ(120px)",
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 38px, rgba(255,255,255,0.05) 39px, transparent 40px)",
            }}
          />
          <div
            className="pointer-events-none absolute block sm:hidden"
            style={{
              inset: "-160%",
              width: "420%",
              height: "420%",
              transform: "translateZ(70px)",
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 20px, rgba(255,255,255,0.11) 21px, transparent 22px)",
            }}
          />
        </div>
      </div>

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ---- Interface grid ---- */}
      <div className="pointer-events-none absolute inset-0 z-40 grid grid-rows-[auto_1fr_auto] p-6 md:p-10">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <Link
              href="/"
              className="pointer-events-auto inline-block transition-opacity hover:opacity-60"
              aria-label="ARMATIS"
            >
              <ArmatisWordmark variant="light" height={17} priority />
            </Link>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              {t("category")}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <LanguageSwitcher className="text-bone" />
            <dl className="space-y-1 text-right font-mono text-[10px] uppercase tracking-[0.16em]">
              {readout.map(([label, value]) => (
                <div key={label} className="flex justify-end gap-3">
                  <dt className="text-white/35">{label}</dt>
                  <dd className="tabular-nums text-bone">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Center — giant model number + tagline */}
        <div className="flex items-center justify-center">
          <div className="text-center mix-blend-difference">
            <h1 className="font-display font-extralight leading-[0.82] tracking-tight text-white">
              <span className="block text-[clamp(6rem,26vw,22rem)]">
                {ARMATIS_107.modelNumber}
              </span>
            </h1>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white md:text-[11px]">
              {t("tagline")}
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between gap-6">
          <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
            <p className="text-bone">[ {t("archiveLabel")} ]</p>
            <p>{t("archiveLine")}</p>
          </div>

          <a
            href="#specs"
            className="armatis-cta pointer-events-auto bg-bone px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-white"
          >
            {t("cta")}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#vision"
        className="pointer-events-auto absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-label={t("scroll")}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          {t("scroll")}
        </span>
        <span className="armatis-scrollline block h-12 w-px bg-gradient-to-b from-bone to-transparent" />
      </a>

      <style>{`
        .armatis-cta {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 86% 100%, 0 100%);
        }
        .armatis-scrollline {
          transform-origin: top;
          animation: armatis-flow 2.4s var(--ease-out-luxe) infinite;
        }
        @keyframes armatis-flow {
          0%   { transform: scaleY(0); transform-origin: top; }
          45%  { transform: scaleY(1); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @media (prefers-reduced-motion: reduce) {
          .armatis-scrollline { animation: none; }
        }
      `}</style>
    </section>
  );
}
