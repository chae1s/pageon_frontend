import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import ScrollToTop from './components/ScrollToTop';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
            <NotificationProvider>
                <ScrollToTop />
                <Router />
            </NotificationProvider>
        </BrowserRouter>
    </AuthProvider>

  )
}

export default App;