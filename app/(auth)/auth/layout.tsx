import React from "react";

export const runtime = "nodejs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
    </main>
  );
}
