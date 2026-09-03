"use client";

import katex from "katex";
import { useMemo } from "react";

/** The only gate into innerHTML, so it escapes everything that is not maths. */
function escape(s: string): string {
  return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}

/**
 * Vardiklis writes problems as plain Lithuanian with the maths between dollar
 * signs. Split on the dollar, and every odd piece is a formula.
 */
export default function MathText({ text }: { text: string }) {
  const html = useMemo(
    () =>
      text
        .split("$")
        .map((part, i) =>
          i % 2 === 0
            ? escape(part)
            : katex.renderToString(part, { throwOnError: false, displayMode: false }),
        )
        .join(""),
    [text],
  );

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
