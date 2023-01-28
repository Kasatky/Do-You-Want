import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import CabinetAdmin from './CabinetAdmin/CabinetAdmin';
import App from './App/App';
import DashboardPage from './DashboardPage/DashboardPage';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<CabinetAdmin />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
