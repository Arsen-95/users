import { QueryProvider, Router } from '@/app/providers';
import { ProvidersComposer } from '@/shared/lib';
import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <CssBaseline />
      <ProvidersComposer providers={[QueryProvider]}>
        <Router />
      </ProvidersComposer>
    </>
  );
}

export default App;
