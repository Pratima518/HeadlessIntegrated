import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import { useAuth } from "react-oidc-context";
import CreateProvider from './CreateProvider'; // Make sure the path is correct

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "6v3vrfja0ofkuckrbde5fe0t6h";
    const logoutUri = "https://master.d3nx2e36z49zwg.amplifyapp.com";
    const cognitoDomain = "https://us-east-1x5evneaas.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <CreateProvider />;
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-provider" element={<CreateProvider />} />
      </Routes>
    </Router>
  );
}