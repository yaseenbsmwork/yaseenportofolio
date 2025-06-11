import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Splash = ({ onFinish }) => {
  const wavyRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const chars = wavyRef.current.querySelectorAll('.wavy-char');
    gsap.fromTo(
      chars,
      { y: 0 },
      {
        y: (i) => Math.sin(i) * 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.08,
          repeat: -1,
          yoyo: true,
        },
        duration: 1.2,
      }
    );

    const handleFinish = () => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        if (onFinish) onFinish();
      }
    };

    // Multiple interaction handlers
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 0) {
        handleFinish();
      }
    };

    const handleTouchMove = () => {
      handleFinish();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ') {
        handleFinish();
      }
    };

    const handleClick = () => {
      handleFinish();
    };

    // Add all event listeners
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    // Timer fallback
    const timer = setTimeout(handleFinish, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
      gsap.killTweensOf(chars);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <span ref={wavyRef} className="text-6xl font-extrabold text-gray-900">
          {'yaseen bsm'.split('').map((char, i) => (
            <span key={i} className="wavy-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </span>
        <p className="text-gray-500 mt-4 text-sm animate-pulse">
          Scroll, click, or use arrow keys to continue
        </p>
      </div>
    </div>
  );
};
export default Splash; 