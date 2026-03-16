import StoreProvider from "@/redux/providers/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
