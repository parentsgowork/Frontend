import React, { useState } from 'react';

const ApiTester =({apiName, requestFn}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setResponse(null);
        setError(null);

        try {
            const res = await requestFn();
            setResponse(res);
            setError(null);
        } catch (err) {
            setError(err);
            setResponse(null);
        }
    };

    return (
        <div>
            <h2>{apiName} API Test</h2>
            <button onClick={handleClick}>Test API</button>
            <div>
                <Strong>✅ Response:</Strong>
                {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            </div>
            <div>
                <Strong>❌ Error:</Strong>
                {error && <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>}
            </div>
        </div>
    );
}

export default ApiTester;