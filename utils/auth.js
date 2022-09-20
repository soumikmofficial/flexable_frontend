import supabase from "./supabaseClient";

// todo: signIn
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

// todo: single function to dynamically login using any provider
export const signInWithProvider = async (provider) => {
  console.log("signing in with provider", process.env.NEXT_PUBLIC_ORIGIN);
  const { user, session, error } = await supabase.auth.signIn({
    provider,
  });

  return { session, error };
};

// todo: sign up
export const signUp = async ({ email, password }) => {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    { redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/dashboard` }
  );
  return { user, session, error };
};
