"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  useEffect(() => {
    if (currentUser?.profileName) {
      router.replace("/dashboard");
    } else if (currentUser && !currentUser.profileName) {
      router.replace("/user");
    }
  }, [currentUser, router]);

  return <>{children}</>;
}
