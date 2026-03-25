"use client";

import StoreProvider from "@/redux/providers/StoreProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        {loading && <Loader />}

        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
