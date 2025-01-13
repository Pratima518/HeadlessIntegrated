import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/router"; // Next.js router for redirection

function App() {
  const auth = useAuth();
  const router = useRouter(); // Initialize Next.js router for redirection

  const signOutRedirect = () => {
    const clientId = "6v3vrfja0ofkuckrbde5fe0t6h"; // Replace with your actual client ID
    const logoutUri = "https://master.d3nx2e36z49zwg.amplifyapp.com"; // Replace with your actual logout URI
    const cognitoDomain = "https://us-east-1x5evneaas.auth.us-east-1.amazoncognito.com"; // Replace with your actual Cognito domain
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Automatically redirect to /create-provider if the user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/create-provider"); // Redirect to CreateProvider page
    }
  }, [auth.isAuthenticated, router]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <div>Redirecting to Create Provider...</div>;
  }

  return (
    <div>
      <h1>Welcome to LPHeadlessIntegrated</h1>
      <button onClick={() => auth.signinRedirect()}>Sign In</button>
    </div>
  );
}

export default App;
