//import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// Import Amplify and configuration
//import { Amplify } from 'aws-amplify';
//import awsExports from './aws-exports'; // Import your AWS Amplify configuration
import { AuthProvider } from "react-oidc-context";

// Configure Amplify
const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_X5evnEAAS",
  client_id: "6v3vrfja0ofkuckrbde5fe0t6h",
  redirect_uri: "https://master.d3nx2e36z49zwg.amplifyapp.com",
  response_type: "code",
  scope: "email openid phone",
};

function Home() {
  const auth = useAuth();
  const router = useRouter(); // Initialize Next.js router for redirection

  const signOutRedirect = () => {
    const clientId = "6v3vrfja0ofkuckrbde5fe0t6h";
    const logoutUri = "https://master.d3nx2e36z49zwg.amplifyapp.com";
    const cognitoDomain = "https://us-east-1x5evneaas.auth.us-east-1.amazoncognito.com";
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

export default Home;
