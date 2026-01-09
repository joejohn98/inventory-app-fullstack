import { headers } from "next/headers";
import { auth, Session } from "./auth";
import { redirect } from "next/navigation";

export const getUserSession = async (): Promise<Session | null> => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) {
    redirect("/sign-in");
  }
  return user;
};
