import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App/App';
import store from './store';
import { createTheme, ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#ffffffbd',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.5em",
          color: "grey",
          backgroundColor: "white"
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#643c80',
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#464b68'
    },
  },
  typography: {
    fontFamily: [
      'Alegreya Sans',
      'sans-serif'
    ].join(','),
  },

});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
