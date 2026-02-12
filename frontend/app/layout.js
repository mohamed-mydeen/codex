import "./globals.css";

export const metadata = {
  title: "Contacts App",
  description: "Store name, phone and details",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
