import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Splash from './Splash';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowSplash(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full bg-black">
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <>
          <Navbar />
          <main className="flex-grow w-full py-[100px]">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};

export default Layout;