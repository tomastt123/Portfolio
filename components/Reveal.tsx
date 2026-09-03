"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Brėžinio dalis „atsiranda ant plėvelės": trumpas, santūrus judesys.
 * Braižinys neturi šokinėti — todėl poslinkis mažas, o trukmė trumpa.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
