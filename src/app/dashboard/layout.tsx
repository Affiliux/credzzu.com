"use client";

import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="container py-8 overflow-hidden">{children}</main>;
}
