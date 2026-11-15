import 'bootstrap/dist/css/bootstrap.min.css';
import Page from './components/Page';
import AuthProvider from './context/AuthProvider';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Page />
    </AuthProvider>
  );
}

export default App;
