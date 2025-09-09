import UrlForm from './components/UrlForm';
import Stats from './components/Stats';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>URL Shortener</h1>
      <UrlForm />
      <h2>URL Statistics</h2>
      <Stats />
    </div>
  );
}

export default App;
