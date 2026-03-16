"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/auth/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
}
