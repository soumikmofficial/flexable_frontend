import supabase from "./supabaseClient";

export const signIn = async ({ email, password }) => {
  const { error, session, user } = await supabase.auth.signIn({
    email,
    password,
  });
  return { error, session, user };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// single function to dynamically login using any provider
export const signInWithProvider = async (provider) => {
  console.log("signing in with provider", process.env.NEXT_PUBLIC_ORIGIN);
  const { user, session, error } = await supabase.auth.signIn({
    provider,
  });

  return { session, error };
};