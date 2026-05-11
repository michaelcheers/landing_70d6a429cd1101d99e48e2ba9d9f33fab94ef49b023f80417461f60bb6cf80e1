import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '/src/App.jsx';

// Deep-link recovery from 404.html shim.
const deep = sessionStorage.getItem('mp_deeplink');
if (deep) {
  sessionStorage.removeItem('mp_deeplink');
  history.replaceState(null, '', deep);
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
