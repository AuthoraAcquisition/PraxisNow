// Root layout: only used by Next.js's built-in 404 page. The site itself is served by app/route.js.
export const metadata = {
  title: "Praxis",
  description: "Integration beats endless information."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#100D0C", color: "#F4EBDD", fontFamily: "Georgia, serif" }}>{children}</body>
    </html>
  );
}
