import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import axios from 'axios';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3001/shorturls', {
        url,
        validity: validity ? parseInt(validity) : undefined,
        shortcode: shortcode || undefined,
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <Stack spacing={2} maxWidth={400}>
      <TextField label="Long URL" onChange={e => setUrl(e.target.value)} />
      <TextField label="Validity (minutes)" onChange={e => setValidity(e.target.value)} />
      <TextField label="Custom Shortcode (optional)" onChange={e => setShortcode(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>

      {result && (
        <div>
          <p>Short URL: <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a></p>
          <p>Expires at: {result.expiry}</p>
        </div>
      )}
    </Stack>
  );
}
