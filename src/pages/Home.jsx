import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const linkedinUrl = "https://www.linkedin.com/in/yaseen-b-muhammed-4722732ba";
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heyRef = useRef(null);
  const imRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const [hasNavigatedFromDashboard, setHasNavigatedFromDashboard] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const hasScrolledAwayRef = useRef(false); // Track if user has scrolled away from top

  useEffect(() => {
    // Check if we came from dashboard
    const cameFromDashboard = sessionStorage.getItem('cameFromDashboard');
    if (cameFromDashboard) {
      setHasNavigatedFromDashboard(true);
      sessionStorage.removeItem('cameFromDashboard');
      // Scroll to "Hey" section immediately
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const hey = heyRef.current;
    const im = imRef.current;
    const name = nameRef.current;
    const title = titleRef.current;

    // Initial animation for "Hey" - appears immediately
    gsap.fromTo(hey, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Scroll-triggered animations for vertical scrolling
    gsap.fromTo(im,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: im,
          start: "top 90%",
          end: "top 10%",
          scrub: false,
          toggleActions: "play none none reverse",
          scroller: container
        }
      }
    );

    gsap.fromTo(name,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: name,
          start: "top 90%",
          end: "top 10%",
          scrub: false,
          toggleActions: "play none none reverse",
          scroller: container
        }
      }
    );

    gsap.fromTo(title,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          end: "top 10%",
          scrub: false,
          toggleActions: "play none none reverse",
          scroller: container
        }
      }
    );

    // Handle scroll events for navigation back to dashboard
    const handleScroll = () => {
      if (!container) return;

      const scrollTop = container.scrollTop;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Track if user has scrolled away from the top
      if (scrollTop > 50) {
        hasScrolledAwayRef.current = true;
      }

      // Check if scrolled to the very top (Hey section) AND has scrolled away before
      if (scrollTop <= 10 && hasScrolledAwayRef.current) {
        // Set a timeout to prevent accidental navigation
        scrollTimeoutRef.current = setTimeout(() => {
          // Navigate back to dashboard
          sessionStorage.setItem('returnToDashboard', 'true');
          navigate('/');
        }, 300); // Reduced timeout for better UX
      }
    };

    // Add scroll event listener
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [navigate]);

  const handleConnect = () => {
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Navigation indicator */}
      {/* <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
        <span className="text-white text-sm font-medium">
          Scroll down, then scroll up to return to Dashboard
        </span>
      </div> */}

      <div 
        ref={containerRef}
        className="w-full h-full flex flex-col items-start overflow-y-auto overflow-x-hidden" 
        style={{
          background: 'transparent',
          minWidth: '100vw',
          minHeight: '100vh',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: {
            display: 'none'
          }
        }}
      >
        {/* Hey section - Full height, positioned at left */}
        <div 
          ref={heyRef} 
          className="h-screen flex items-center justify-start pl-16 relative"
          style={{
            minHeight: '100vh',
            width: '100vw'
          }}
        >
          <h1 className="text-[20vw] font-bold text-white leading-none">Hey</h1>
          
          {/* Scroll indicator for Hey section */}
          <div className="absolute bottom-8 left-16 flex flex-col items-center space-y-2">
            <span className="text-gray-500 text-sm font-medium">Scroll to continue</span>
            <div className="w-0.5 h-8 bg-gray-400 animate-pulse"></div>
          </div>
        </div>

        {/* I'm section - Full height, same size as Hey */}
        <div 
          ref={imRef}
          className="h-screen flex items-center justify-start pl-16"
          style={{
            minHeight: '100vh',
            width: '100vw'
          }}
        >
          <h2 className="text-[20vw] font-bold text-white leading-none">
            I'm
          </h2>
        </div>

        {/* Name section - Full height, positioned below I'm */}
        <div 
          ref={nameRef}
          className="h-screen flex flex-col items-start justify-center pl-16"
          style={{
            minHeight: '100vh',
            width: '100vw'
          }}
        >
          <h2 className="text-[20vw] font-bold text-white leading-none">
            Yaseen
          </h2>
          <h2 className="text-[20vw] font-bold text-white leading-none">
            BSM
          </h2>
        </div>

        {/* Content section - Description paragraph */}
        <div 
          ref={titleRef}
          className="h-screen flex items-center justify-center px-16"
          style={{
            minHeight: '100vh',
            width: '100vw'
          }}
        >
          <p className="text-3xl text-gray-300 italic max-w-5xl leading-relaxed text-center">
            "I am Yaseen B Muhammed, a full-stack developer from Trivandrum, Kerala, where creativity meets logic in my work. With a lifelong passion for design, I bring imagination to the front end, crafting visual experiences, while my drive for problem-solving fuels my back-end development. I find purpose in bridging these worlds, creating seamless, meaningful connections between technology and human experience."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;