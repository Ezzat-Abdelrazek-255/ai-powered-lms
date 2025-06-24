import { revalidatePathServer } from "@/actions";
import { createClient } from "@/libs/supabase/client";
import { AuthInputs } from "@/types/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function login(formData: AuthInputs, router: AppRouterInstance) {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(formData);
    if (error) throw error;

    router.push("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function logout(router: AppRouterInstance) {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    await revalidatePathServer("/");
    router.push("/auth");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
