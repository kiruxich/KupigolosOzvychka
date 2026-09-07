import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Кто озвучил «Побег из Шоушенка» — актёры русского дубляжа",
  description:
    "Актёры русского дубляжа фильма «Побег из Шоушенка»: персонажи, фотографии, голоса и версии озвучки 2018 и IVI 2021.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
