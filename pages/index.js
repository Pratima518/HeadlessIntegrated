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

  // Ensure this code runs after the component mounts
  useEffect(() => {
    setIsClient(true); // Set to true when the component mounts (on client)
  }, []); // Only run once on mount

  // Only render the app once we are sure we are on the client side
  useEffect(() => {
    if (isClient) {
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
    }
  }, [isClient]); // Only run this once the client is set to true

  // Prevent rendering on the server side
  if (!isClient) {
    return null; // Skip rendering during SSR
  }

  return <div id="root" />; // Ensure there's an element with id="root"
};

AppWrapper();
