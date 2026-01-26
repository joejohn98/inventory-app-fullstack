import { headers } from "next/headers";
import { auth, Session } from "./auth";
import { redirect } from "next/navigation";

export const getUserSession = async (): Promise<Session | null> => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  return user;
};

export const requireAuth = async (): Promise<Session> => {
  const session = await getUserSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
};
