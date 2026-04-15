import { motion } from "motion/react";

const FROST_STYLE: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  padding: "0.6em 1.2em",
  borderRadius: "30px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  isolation: "isolate",
};

function FrostPill({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ ...FROST_STYLE, ...style }}>
      {/* Blurred background — pre-generated image, fixed position */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/heroimg-blur.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -2,
        }}
      />
      {/* Subtle tint overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 10, 15, 0.1)",
          borderRadius: "30px",
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HeroReact() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      id="hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/heroimg.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Headline */}
        <div className="mb-7 flex flex-col items-center gap-1">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <FrostPill style={{ width: "100%", maxWidth: 750, textAlign: "center" }}>
              <span
                className="font-display font-extrabold leading-[1.05] tracking-tight"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                  color: "var(--color-text)",
                }}
              >
                Non vendiamo
                <br />
                distributori.
              </span>
            </FrostPill>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            style={{ marginTop: 4 }}
          >
            <FrostPill style={{ width: "100%", maxWidth: 750, textAlign: "center" }}>
              <span
                className="font-display font-extrabold leading-[0.92] tracking-tight hero-accent-text"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
              >
                Costruiamo business.
              </span>
            </FrostPill>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="mb-11 max-w-xl"
        >
          <FrostPill>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              Dal singolo distributore al negozio automatico H24 completo.
              Consulenza, vendita e assistenza tecnica.
            </p>
          </FrostPill>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contatti"
            className="hero-cta-primary group px-9 py-4 bg-accent font-body font-bold text-base rounded-xl transition-all duration-400"
            style={{ color: "var(--color-bg)" }}
          >
            <span className="flex items-center gap-2">
              Richiedi Informazioni
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <FrostPill style={{ borderRadius: "0.75rem" }}>
            <a
              href="#servizi"
              className="font-body font-medium text-base transition-all duration-400"
              style={{ color: "var(--color-text)" }}
            >
              Scopri i servizi
            </a>
          </FrostPill>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float opacity-40">
        <div className="w-[22px] h-[34px] border-[1.5px] border-text-muted/40 rounded-full flex items-start justify-center pt-2">
          <div className="w-[3px] h-[6px] bg-accent rounded-full animate-[fade-up_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
