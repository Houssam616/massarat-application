class Logger {
    static log(type, postId, deleted = false) {
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] ${type}`;
  
      // Save log entry to LocalStorage
      const existingLogs = localStorage.getItem('appLogs') || '[]';
      const logs = JSON.parse(existingLogs);
  
      // Check if the entry already exists before adding it
      if (!logs.includes(logEntry)) {
        logs.push(logEntry);
        localStorage.setItem('appLogs', JSON.stringify(logs));
        // Log to console for debugging
        console.log(logEntry);
      }
    }
  }
  
  export default Logger;
  