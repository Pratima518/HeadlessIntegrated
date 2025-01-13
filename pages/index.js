import React, { useEffect } from 'react';
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
  }, []); // Empty dependency array means this runs once when the component mounts

  return <div id="root" />; // Ensure there's an element with id="root"
};

AppWrapper();
