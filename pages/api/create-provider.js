export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name } = req.body; // Receiving data from the React frontend

    // Step 1: Obtain OAuth 2.0 Access Token
    const tokenResponse = await fetch('https://providermanagementapp-ttyxq5-prod.lp.trials.pegaservice.net/dx/uas/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'aLSXMzzzKI9EUvtq',
        client_secret: 'usG5e9Y0vR6i2NLqsVxQEqLjWV5KEcqy',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to obtain access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Use the Access Token to make the API request with dynamic "Name"
    const apiResponse = await fetch('https://providermanagementapp-ttyxq5-prod.lp.trials.pegaservice.net/dx/api/application/v2/cases?viewType=page', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseTypeID: "Provider",
        content: {
          Name: name, // Dynamically setting the "Name" from the frontend
        },
        processID: "pyStartCase",
      }),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to create provider via external API');
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}