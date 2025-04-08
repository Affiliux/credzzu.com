"use client";

import React from "react";

import AccountProvider from "./AccountContext";
import { ThemeProvider } from "./theme-provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AccountProvider>{children}</AccountProvider>
    </ThemeProvider>
  );
}
