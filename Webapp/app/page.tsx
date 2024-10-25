// app/page.tsx

"use client"; // Mark the component as a Client Component

import React, { useEffect, useState } from 'react';

const ValidatePage = () => {
  const [provider, setProvider] = useState('');
  const [service, setService] = useState('');
  const [secret, setSecret] = useState('');
  const [response, setResponse] = useState(true); // Assuming boolean
  const [report, setReport] = useState(false); // Assuming boolean
  const [providers, setProviders] = useState<string[]>([]); // Ensure this is initialized as an empty array
  const [services, setServices] = useState<string[]>([]); // Ensure this is initialized as an empty array
  const [result, setResult] = useState<any>(null); // Use appropriate type based on expected response
  const [error, setError] = useState<string | null>(null); // Explicitly type error as string | null
  const [loading, setLoading] = useState(false);

  // Fetch providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/getProvider');
        if (!res.ok) {
          throw new Error('Failed to fetch providers');
        }
        const data = await res.json();
        setProviders(data || []); // Set providers directly to data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while fetching providers');
        }
      }
    };

    fetchProviders();
  }, []);

  // Fetch services when the provider changes
  useEffect(() => {
    const fetchServices = async () => {
      if (provider) {
        try {
          const res = await fetch(`/api/getServices?provider=${encodeURIComponent(provider)}`);
          if (!res.ok) {
            throw new Error('Failed to fetch services');
          }
          const data = await res.json();
          setServices(data || []); // Set services directly to data
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred while fetching services');
          }
        }
      }
    };

    fetchServices();
  }, [provider]); // Fetch services whenever the provider changes

  const handleValidate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider, service, secret, response, report }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Error message is now correctly typed
      } else {
        setError('An unknown error occurred during validation');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Validate Input</h1>
      <div>
        <label>
          Provider:
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="">Select a provider</option>
            {providers.length > 0 ? ( // Check if providers array is not empty
              providers.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))
            ) : (
              <option disabled>No providers available</option> // Handle case when no providers are available
            )}
          </select>
        </label>
      </div>
      <div>
        <label>
          Service:
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={!provider} // Disable until a provider is selected
          >
            <option value="">Select a service</option>
            {services.length > 0 ? ( // Check if services array is not empty
              services.map((srv) => (
                <option key={srv} value={srv}>
                  {srv}
                </option>
              ))
            ) : (
              <option disabled>No services available</option> // Handle case when no services are available
            )}
          </select>
        </label>
      </div>
      <input
        type="text"
        placeholder="Secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <div>
        <label>
          Response:
          <input
            type="checkbox"
            checked={response}
            onChange={() => setResponse((prev) => !prev)}
          />
        </label>
        <label>
          Report:
          <input
            type="checkbox"
            checked={report}
            onChange={() => setReport((prev) => !prev)}
          />
        </label>
      </div>
      <button onClick={handleValidate} disabled={loading}>
        {loading ? 'Validating...' : 'Validate'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div>
          <h2>Validation Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ValidatePage;
