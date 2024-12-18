// Author: Christopher Kennedy
// Date: 11-26-23

import App from './Components/App';
import { createRoot } from 'react-dom/client';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);