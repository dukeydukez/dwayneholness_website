"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/logos/1.png", alt: "Fasken", width: 130 },
  { src: "/images/logos/2.png", alt: "CSA Group", width: 115 },
  { src: "/images/logos/3.png", alt: "LCBO", width: 115 },
  { src: "/images/logos/4.png", alt: "TD Bank", width: 145 },
  { src: "/images/logos/5.png", alt: "RE/MAX", width: 130 },
  { src: "/images/logos/6.png", alt: "Rotary", width: 115 },
  { src: "/images/logos/7.png", alt: "CBC", width: 130 },
  { src: "/images/logos/8.png", alt: "Canadian Tire", width: 110 },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function LogoBar() {
  return (
    <section
      style={{
        backgroundColor: "#0a0a0a",
        padding: "2rem 2rem",
        borderTop: "1px solid rgba(200,194,180,0.06)",
        borderBottom: "1px solid rgba(200,194,180,0.06)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: 500,
            opacity: 0.6,
          }}
        >
          Trusted by leading brands
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease }}
          className="logo-bar-grid"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {logos.map(({ src, alt, width }, i) => (
            <motion.div
              key={alt}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.45,
                transition: "opacity 0.3s ease",
              }}
              whileHover={{ opacity: 0.85 }}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={56}
                style={{
                  objectFit: "contain",
                  maxHeight: "52px",
                  width: "auto",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
