import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "session";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const REMEMBER_ME_MS = 30 * ONE_DAY_MS;

type SessionPayload = {
  userId: string;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Falta la variable de entorno SESSION_SECRET");
  }
  return new TextEncoder().encode(secret);
}

async function encrypt(payload: SessionPayload, expiresAt: Date) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());
}

export async function decrypt(token: string | undefined) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    // Token vencido, modificado o firmado con otra clave
    return null;
  }
}

export async function createSession(userId: string, remember: boolean) {
  const expiresAt = new Date(Date.now() + (remember ? REMEMBER_ME_MS : ONE_DAY_MS));
  const token = await encrypt({ userId }, expiresAt);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Sin "Recordarme" no le ponemos fecha: el navegador la borra al cerrarse
    expires: remember ? expiresAt : undefined,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  return decrypt(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
