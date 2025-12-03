// /pages/_app.js
import { AppProvider } from '../context/AppContext';
import LayoutApp from '../components/LayoutApp';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <LayoutApp>
        <Component {...pageProps} />
      </LayoutApp>
    </AppProvider>
  );
}
    