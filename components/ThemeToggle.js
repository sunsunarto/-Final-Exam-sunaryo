import { Button } from 'antd';
import { useApp } from '../context/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <Button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}