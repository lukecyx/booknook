"use client";

import { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { useServerInsertedHTML } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export function StyledComponentsRegistry({ children }: Props) {
  // Create the stylesheet once per request
  const [sheet] = useState(() => new ServerStyleSheet());

  // Insert styles into the SSR HTML
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // Always wrap children in StyleSheetManager; Next.js will hydrate on the client
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
