import Link from 'next/link';
import { Card, Col, Row, Typography, Button } from 'antd';
import { useApp } from '../context/AppContext';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  const pageStyle = {
    padding: '48px 24px',
    backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
    color: isDark ? '#f0f0f0' : '#000000',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  };

  const cardStyle = {
    backgroundColor: isDark ? '#141414' : '#fafafa',
    borderRadius: 12,
    boxShadow: isDark
      ? '0 2px 8px rgba(255, 255, 255, 0.05)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  const cardBodyStyle = {
    color: isDark ? '#f0f0f0' : '#000000',
  };

  const textStyle = {
    color: isDark ? '#d9d9d9' : '#333333',
    fontSize: 16,
    lineHeight: 1.6,
  };

  return (
    <div style={pageStyle}>
      <Title level={2} style={{ color: isDark ? '#f0f0f0' : '#000000', textAlign: 'center' }}>
        Welcome to Summit Global Course App
      </Title>
      <Paragraph style={{ ...textStyle, textAlign: 'center', maxWidth: 600, margin: '0 auto 32px' }}>
        This is your entry point. Use the navigation below to explore products and dashboard.
      </Paragraph>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <Button type="primary" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={20} md={10}>
          <Link href="/products" style={{ color: 'inherit' }}>
            <Card hoverable style={cardStyle} bodyStyle={cardBodyStyle}>
              <Title level={4} style={{ marginBottom: 12, color: isDark ? '#f0f0f0' : '#000000' }}>
                Products
              </Title>
              <Paragraph style={textStyle}>
                Browse, add, edit, and manage products with ease.
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={20} md={10}>
          <Link href="/dashboard" style={{ color: 'inherit' }}>
            <Card hoverable style={cardStyle} bodyStyle={cardBodyStyle}>
              <Title level={4} style={{ marginBottom: 12, color: isDark ? '#f0f0f0' : '#000000' }}>
                Dashboard
              </Title>
              <Paragraph style={textStyle}>
                View product statistics, categories, and random product highlights.
              </Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
