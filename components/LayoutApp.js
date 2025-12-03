import { Layout } from 'antd';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useApp } from '../context/AppContext';

const { Header, Content, Footer } = Layout;

export default function LayoutApp({ children }) {
  const { theme } = useApp();

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
        color: theme === 'dark' ? '#f0f0f0' : '#000000',
      }}
    >
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme === 'dark' ? '#141414' : '#fafafa',
          padding: '0 24px',
        }}
      >
        <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#f0f0f0' : '#000000' }}>
          Summit Global Course App
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ThemeToggle />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/products">Products</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </Header>

      <Content style={{ padding: 24 }}>{children}</Content>

      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: theme === 'dark' ? '#141414' : '#fafafa',
          color: theme === 'dark' ? '#f0f0f0' : '#000000',
        }}
      >
        © {new Date().getFullYear()} Summit Global
      </Footer>
    </Layout>
  );
}
