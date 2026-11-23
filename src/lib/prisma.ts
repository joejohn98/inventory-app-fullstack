import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

function getDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    const sslmode = parsed.searchParams.get("sslmode");
    // pg-connection-string emits a security deprecation warning when sslmode is
    // 'require', 'prefer', or 'verify-ca' without 'uselibpqcompat=true'.
    // In pg v8 / pg-connection-string v2, those are treated as aliases for 'verify-full'.
    // Setting 'sslmode=verify-full' preserves existing behavior and silences the warning.
    if (
      sslmode &&
      ["require", "prefer", "verify-ca"].includes(sslmode) &&
      !parsed.searchParams.has("uselibpqcompat")
    ) {
      parsed.searchParams.set("sslmode", "verify-full");
      return parsed.toString();
    }
  } catch {
    // If DATABASE_URL is not a standard URL, fall back to raw value
  }

  return url;
}

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
});
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
export default prisma;
