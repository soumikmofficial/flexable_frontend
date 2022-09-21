import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setIsAuthenticated(true);
          // router.push("/dashboard");
        }
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
          console.log("signed out");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        dark
      />
    </>
  );
}

export default MyApp;
