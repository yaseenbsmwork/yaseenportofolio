import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Experience from '../pages/Experience';
import welcome from '../assets/welcome.jpg';
import projects from '../assets/projects.jpg';
import aboutVideo from '../assets/about.MOV';
import bg from '../assets/bg3.jpeg';
import profilePicImage from '../assets/profile_pic.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PawPrint } from 'lucide-react';
import AnimatedNavImage from './AnimatedNavImage';
import bgimage from '../assets/bgimage.JPG';
import human1 from '../assets/1.PNG';
import human2 from '../assets/2.PNG';
import human3 from '../assets/3.PNG';
import human4 from '../assets/experience1.PNG'

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  'HOME',
  'PROJECTS',
  'ABOUT',
  'EXPERIENCE',
  'SKILLS',
  'CONTACT',
];

const images = [
  welcome,
  projects,
  aboutVideo,
  bg,
  bg,
  bg,
];

const humanImages = [
  human1, // WELCOME
  human2, // PROJECTS
  human3, // ABOUT
  human4, // EXPERIENCE
  human1, // SKILLS
  human1, // CONTACT
];

const isVideo = (src) => typeof src === 'string' && (src.endsWith('.MOV') || src.endsWith('.mov') || src.endsWith('.mp4'));

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Check if returning from any page
  useEffect(() => {
    const returnFromPage = sessionStorage.getItem('returnToDashboard');
    if (returnFromPage) {
      const pageIndex = parseInt(returnFromPage) || 0;
      setActiveIndex(pageIndex);
      sessionStorage.removeItem('returnToDashboard');
      // Reset scroll position
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
      }
    }
  }, []);

  // Handle up/down arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => Math.min(navItems.length - 1, prev + 1));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle horizontal scroll with navigation detection
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollAmount = e.deltaY;
        
        // Calculate new scroll position
        const newScrollLeft = container.scrollLeft + scrollAmount;
        container.scrollLeft = newScrollLeft;

        // Debug info (remove in production)
        console.log('Scroll Debug:', {
          activeIndex,
          scrollLeft: newScrollLeft,
          scrollWidth: container.scrollWidth,
          clientWidth: container.clientWidth,
          maxScroll: container.scrollWidth - container.clientWidth,
          progress: newScrollLeft / (container.scrollWidth - container.clientWidth)
        });

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Check if scrolled far enough to the right and navigate to respective routes
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const scrollProgress = newScrollLeft / maxScrollLeft;
        
        if (scrollProgress > 0.5) {
          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Set a timeout to prevent accidental navigation
          scrollTimeoutRef.current = setTimeout(() => {
            // Navigate to respective route based on active index
            const routes = ['/home', '/projects', '/about', '/experience', '/skills', '/contact'];
            const targetRoute = routes[activeIndex];
            
            if (targetRoute) {
              sessionStorage.setItem('cameFromDashboard', activeIndex.toString());
              navigate(targetRoute);
            }
          }, 200);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeIndex, navigate]);

  // Render the correct page content
  const renderPage = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div className="h-screen flex items-center justify-start pl-8 relative w-full">
            <h1 className="text-[20vw] font-bold text-gray-900 leading-none">Welcome</h1>
            
            {/* Navigation hint */}
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-gray-700 text-sm font-medium">
                Scroll right to explore →
              </span>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="h-screen flex items-center justify-start pl-8 relative w-full">
            <h1 className="text-[20vw] font-bold text-gray-900 leading-none">Projects</h1>
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-gray-700 text-sm font-medium">Scroll right to view →</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="h-screen flex items-center justify-start pl-8 relative w-full">
            <h1 className="text-[20vw] font-bold text-gray-900 leading-none">About</h1>
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-gray-700 text-sm font-medium">Scroll right to view →</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="h-screen flex items-center justify-start pl-8 relative w-full">
            <h1 className="text-[20vw] font-bold text-gray-900 leading-none">Experience</h1>
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-gray-700 text-sm font-medium">Scroll right to view →</span>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="h-screen flex items-center justify-start pl-8 relative w-full">
            <h1 className="text-[20vw] font-bold text-gray-900 leading-none">Skills</h1>
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-gray-700 text-sm font-medium">Scroll right to view →</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="h-screen flex items-center justify-start pl-8 relative w-full">
            <h1 className="text-[20vw] font-bold text-gray-900 leading-none">Contact</h1>
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-gray-700 text-sm font-medium">Scroll right to view →</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen fixed top-0 left-0 flex flex-col overflow-x-auto overflow-y-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {/* Video or image background */}
      {isVideo(images[activeIndex]) ? (
        <video
          key={images[activeIndex]}
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{objectFit: 'cover', width: '100vw', height: '100vh'}}
        />
      ) : (
        <div
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
          }}
        />
      )}
      {/* Overlay for opacity */}
      <div className="fixed inset-0 bg-white" style={{ opacity: 0.9, zIndex: 1 }} />
      
      {/* Main content container */}
      <div className="flex flex-row w-[200vw] flex-1 pt-16 relative" style={{ zIndex: 2 }}>
        {/* Scroll indicator */}
        <div 
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
          style={{
            writingMode: 'vertical-lr',
            textOrientation: 'mixed',
            transform: 'rotate(180deg) translateY(50%)',
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        >
          <div className="flex items-center space-y-4">
            <span className="text-2xl font-bold text-gray-600 tracking-widest">
              {activeIndex === 0 ? 'SCROLL TO WELCOME' : 'SCROLL'}
            </span>
            <div className="w-0.5 h-16 bg-gray-600 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Left section with number, images, and nav */}
        <div className="flex flex-row items-start" style={{ width: '60vw', height: '100vh' }}>
          {/* Center left: Big current index number */}
          <div className="flex flex-col items-center justify-center relative h-full" style={{ width: '100px' }}>
            <span className="text-7xl font-extrabold text-gray-900 select-none" style={{ letterSpacing: '0.05em' }}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Image list vertically, current image centered and larger */}
          <div className="flex flex-col items-center justify-center relative h-full" style={{ width: '400px', minHeight: '600px' }}>
            {navItems.map((item, idx) => {
              const offset = idx - activeIndex;
              const isCurrent = offset === 0;
              const activeW = 380;
              const inactiveW = 280;
              return (
                <div
                  key={item}
                  className={`transition-all duration-500 mb-4 ${isCurrent ? 'z-10 border-4 border-black' : 'z-0 border-0'} rounded-2xl block`}
                  style={{
                    width: isCurrent ? activeW : inactiveW,
                    aspectRatio: '16/9',
                    opacity: isCurrent ? 1 : 0.5,
                    transform: `translateY(${offset * 120}px) scale(${isCurrent ? 1 : 0.7})`,
                    position: 'absolute',
                    left: '50%',
                    marginLeft: isCurrent ? `-${activeW/2}px` : `-${inactiveW/2}px`,
                    top: '50%',
                    marginTop: isCurrent ? `-${(activeW * 9/16)/2}px` : `-${(inactiveW * 9/16)/2}px`,
                    boxShadow: isCurrent ? '0 8px 32px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                    border: isCurrent ? '3px solid #222' : 'none',
                    cursor: isCurrent ? 'default' : 'pointer',
                    transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
                    background: '#fff',
                    display: 'block',
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <AnimatedNavImage
                    text={item}
                    png={humanImages[idx]}
                    bg={bgimage}
                  />
                </div>
              );
            })}
          </div>

          {/* Left: Navigation List */}
          <div className="w-1/4 flex flex-col items-center justify-center relative h-full">
            <div
              className="flex flex-col items-center justify-center space-y-6 select-none"
              style={{ userSelect: 'none' }}
            >
              {navItems.map((item, idx) => (
                <div
                  key={item}
                  className={`text-2xl font-bold px-4 py-4 cursor-pointer flex items-center transition-colors duration-300 ${activeIndex === idx ? 'text-black' : 'text-gray-400'}`}
                  style={{ minHeight: 64 }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className={`mr-3 transition-transform duration-300 flex items-center ${activeIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} style={{width: 22, height: 22}}>
                    {activeIndex === idx ? <PawPrint size={22} color="#222" /> : null}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Show page content here */}
        <div className="flex-1 flex flex-col items-center justify-center" style={{ width: '140vw' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;