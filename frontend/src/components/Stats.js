import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import axios from 'axios';

export default function Stats() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/shorturls/${code}`);
      setStats(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Error fetching stats');
    }
  };

  return (
    <Stack spacing={2} maxWidth={400}>
      <TextField label="Shortcode" onChange={e => setCode(e.target.value)} />
      <Button variant="outlined" onClick={fetchStats}>Get Stats</Button>

      {stats && (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(stats, null, 2)}
        </pre>
      )}
    </Stack>
  );
}
