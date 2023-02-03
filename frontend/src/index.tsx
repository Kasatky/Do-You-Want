import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
// import CabinetAdmin from './CabinetAdminPage/CabinetAdmin';
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
          backgroundColor: '#fff',
        },
      },
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
