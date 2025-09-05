import type { Metadata } from "next";
import "./globals.css";
import { WizardProvider } from "../contexts/WizardContext";

export const metadata: Metadata = {
  title: "Choiz - Prueba técnica",
  description: "Prueba técnica - Front End",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen"
      >
        <WizardProvider>
          {children}
        </WizardProvider>
      </body>
    </html>
  );
}
