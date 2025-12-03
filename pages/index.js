// /pages/index.js
import Link from 'next/link';
import { Card, Col, Row, Typography, Button } from 'antd';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { theme, toggleTheme } = useApp();

  // Apply theme styles dynamically
  const pageStyle = {
    padding: 24,
    backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
    color: theme === 'dark' ? '#f0f0f0' : '#000000',
    minHeight: '100vh',
  };

  return (
    <div style={pageStyle}>
      <Title level={2} style={{ color: theme === 'dark' ? '#f0f0f0' : '#000000' }}>
        Welcome to Summit Global Course App
      </Title>
      <Paragraph style={{ color: theme === 'dark' ? '#d9d9d9' : '#333333' }}>
        This is your entry point. Use the navigation below to explore products and dashboard.
      </Paragraph>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Link href="/products">
            <Card
              hoverable
              title="Products"
              style={{
                backgroundColor: theme === 'dark' ? '#141414' : '#fafafa',
                color: theme === 'dark' ? '#f0f0f0' : '#000000',
              }}
            >
              <p>Browse, add, edit, and manage products.</p>
            </Card>
          </Link>
        </Col>

        <Col xs={24} md={12}>
          <Link href="/dashboard">
            <Card
              hoverable
              title="Dashboard"
              style={{
                backgroundColor: theme === 'dark' ? '#141414' : '#fafafa',
                color: theme === 'dark' ? '#f0f0f0' : '#000000',
              }}
            >
              <p>View product statistics, categories, and random product highlights.</p>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
