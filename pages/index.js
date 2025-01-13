import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

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

const AppWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  // Ensures client-specific logic runs only on the client side
  useEffect(() => {
    // This will set isClient to true once the component is mounted on the client side
    setIsClient(true);
  }, []); // Only run once on mount

  if (!isClient) {
    return null; // Avoid rendering during SSR
  }

  // Dynamically load ReactDOM in the client-side only
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <AuthProvider {...cognitoAuthConfig}>
            <App />
          </AuthProvider>
        </React.StrictMode>
      );
    }
  }, [isClient]); // Ensure this runs after the client mount

  return <div id="root" />; // Make sure there's an element with id="root" in the DOM
};

AppWrapper();
