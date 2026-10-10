import "./globals.css";

export const metadata = {
  title: "AgriHarvest",
  description: "Produits agricoles frais, locaux et de qualité",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
