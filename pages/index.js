import React from 'react';
import dynamic from 'next/dynamic';
//import App from './App';
//import { AuthProvider } from 'react-oidc-context';
//import awsExports from '../aws-exports'; // Adjust the path as needed
//import '../styles/globals.css'; // Import your global styles

const DynamicAuthProvider  = dynamic(
  () => import('react-oidc-context').then(mod => mod.AuthProvider),
  { ssr: false }
);

const DynamicApp = dynamic(() => import('./App'), { ssr: false });

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_X5evnEAAS",
  client_id: "6v3vrfja0ofkuckrbde5fe0t6h",
  redirect_uri: "https://main.d2a8o3mvbrxbc1.amplifyapp.com",
  response_type: "code",
  scope: "email openid phone",
};

function Home() {
  return (
    <DynamicAuthProvider  {...cognitoAuthConfig}>
      <DynamicApp />
    </DynamicAuthProvider >
  );
}

export default Home;