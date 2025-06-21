import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SupabaseClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { AppRole } from "@/types/courses";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function camelObject<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelObject(item)) as T;
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const camelKey = snakeToCamel(key);
        (acc as any)[camelKey] = camelObject(value);
        return acc;
      },
      {} as Record<string, any>,
    ) as T;
  }

  return obj;
}

export interface UserMetadata {
  role?: AppRole;
  email?: string;
  id?: string;
}

export async function getUserMetadata(
  supabase: SupabaseClient,
): Promise<UserMetadata> {
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error("Authentication error: Failed to retrieve JWT claims.");
  }

  const claims = data.claims;
  const id = claims.sub;
  const email = claims.email ?? undefined;
  const role = claims.user_role as AppRole | undefined;

  return { role, id, email };
}
