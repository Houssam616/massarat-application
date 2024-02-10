import React, { useState, useEffect } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Retrieve logs from LocalStorage
    const storedLogs = localStorage.getItem('appLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  return (
    <div>
      <h1>Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
