import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // You can change this to 'auto' for instant scroll
    });
  }, [pathname]);

  return null;
}