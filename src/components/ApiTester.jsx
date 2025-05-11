import React, { useState } from 'react';

/**
 * @param {string} apiName - 보여줄 API 이름
 * @param {Function} requestFn - 호출할 API 함수
 * @param {Array<string>} paramLabels - 전달할 파라미터 이름 배열
 * @param {Object} paramDescriptions - 각 파라미터의 설명 객체 (optional)
 */
const ApiTester = ({ apiName, requestFn, paramLabels = [], paramDescriptions = {} }) => {
  const [argsInput, setArgsInput] = useState('{}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setResponse(null);
    setError(null);

    try {
      const args = JSON.parse(argsInput || '{}');
      const argArray = paramLabels.map((key) => args[key]);
      const res = await requestFn(...argArray);
      setResponse(res?.data ?? res);
    } catch (err) {
      setError(err.message || '에러 발생');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, marginBottom: 20 }}>
      <h3>{apiName}</h3>
      <button onClick={handleClick}>요청 보내기</button>

      <div style={{ marginTop: 10 }}>
        <strong>📥 함수 인자 정보</strong>
        <ul style={{ paddingLeft: 20 }}>
          {paramLabels.map((key) => (
            <li key={key}>
              <code>{key}</code>
              {paramDescriptions[key] && (
                <span style={{ marginLeft: 6, color: '#777' }}>
                  ({paramDescriptions[key]})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>📨 인자 값 입력 (JSON)</strong>
        <textarea
          rows={5}
          style={{ width: '100%' }}
          value={argsInput}
          placeholder={JSON.stringify(
            Object.fromEntries(paramLabels.map((k) => [k, ''])),
            null,
            2
          )}
          onChange={(e) => setArgsInput(e.target.value)}
        />
      </div>

      <div>
        <strong>✅ Response:</strong>
        <pre>{response ? JSON.stringify(response, null, 2) : '-'}</pre>
      </div>

      <div>
        <strong>❌ Error:</strong>
        <pre>{error || '-'}</pre>
      </div>
    </div>
  );
};

export default ApiTester;
