"use client";

import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./GlobalStyles";
import { baseTheme } from "./theme";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
