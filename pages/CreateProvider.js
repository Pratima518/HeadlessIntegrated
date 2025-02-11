import React, { useState } from 'react';

const CreateProvider = () => {
  const [providerName, setProviderName] = useState('');
  const [providerDescription, setProviderDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleProviderNameChange = (e) => setProviderName(e.target.value);
  const handleProviderDescriptionChange = (e) => setProviderDescription(e.target.value);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send values of provider and providerDescription to the backend
      const res = await fetch('/api/create-provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: providerName,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create provider');
      }

      const data = await res.json();
      setResponse(data);
      alert('Provider created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create Provider</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Provider Name"
          value={providerName}
          onChange={handleProviderNameChange}
          style={{ padding: '10px', margin: '5px', fontSize: '16px', width: '200px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Provider Description"
          value={providerDescription}
          onChange={handleProviderDescriptionChange}
          style={{ padding: '10px', margin: '5px', fontSize: '16px', width: '200px' }}
        />
      </div>

      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Provider'}
      </button>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateProvider;