"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const UserBlock = () => {
  const { data: sessionQuery } = authClient.useSession();
  const sessionData = sessionQuery ?? null;
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const { data } = await authClient.signOut({
        fetchOptions: {
          onRequest: () => {
            setIsSigningOut(true);
          },
          onSuccess: () => {
            router.push("/");
          },
        },
      });

      if (data?.success) {
        toast.success("Signed out successfully", {
          description: "You have been successfully signed out.",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Sign out failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!sessionData || !sessionData.user) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-gray-300">Not signed in</div>
        <Link href="/sign-in" className="text-purple-400 text-sm">
          Sign in
        </Link>
      </div>
    );
  }

  const user = sessionData.user;

  const name = user.name || user.email || "User";
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
          {user.image ? (
            <Image
              src={user.image}
              width={40}
              height={40}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
      </div>

      <div>
        <button
          onClick={handleSignOut}
          className="text-md lg:text-sm font-medium text-purple-400 hover:text-purple-300"
          disabled={isSigningOut}
        >
          {isSigningOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};

export default UserBlock;
