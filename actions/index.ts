"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathServer(
  orignalPath: string,
  type?: "layout" | "page",
) {
  revalidatePath(orignalPath, type);
}
