import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { SnackbarProvider } from 'notistack';
import LightTheme from './themes/LightTheme';
import Root from './pages/Root';
import { ErrorBoundary } from './components';
import { SplitterProvider } from './context';
import { APP_BASENAME } from './const';

ReactDOM.render(
  <ErrorBoundary>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={LightTheme}>
        <CssBaseline>
          <SnackbarProvider>
            <SplitterProvider splitters={{ vertical: [75, 25] }}>
              <Router basename={APP_BASENAME}>
                <Root />
              </Router>
            </SplitterProvider>
          </SnackbarProvider>
        </CssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
