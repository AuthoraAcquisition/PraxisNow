import "./globals.css";

export const metadata = {
  title: "Praxis",
  description: "Integration beats endless information."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
