import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import CreateProvider from './CreateProvider'; // Make sure the path is correct

function App() {
  const [isClient, setIsClient] = useState(false);  
  const auth = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const signOutRedirect = () => {
    const clientId = "3ik1c2jpn4m7urf6duvslnfoa6";
    const logoutUri = "https://main.d2a8o3mvbrxbc1.amplifyapp.com";
    const cognitoDomain = "https://us-east-1x5evneaas.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

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

export default App;