import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import './theme/formBootstrap.css';
import './composants/AdminPageTemplate/adminPageTemplate.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import muiTheme from './theme/muiTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
);

reportWebVitals();
