import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import bgDefault from '../assets/bgimage.JPG';
import humanDefault from '../assets/1.PNG';

const AnimatedNavImage = ({ text = 'WELCOME', png = humanDefault, bg = bgDefault }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.wavy-char');
      gsap.fromTo(
        chars,
        { y: 0 },
        {
          y: (i) => Math.sin(i * 0.5) * 10, // Adjust multiplier for desired wave height and speed
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
    }
    return () => {
        if (textRef.current) {
            gsap.killTweensOf(textRef.current.querySelectorAll('.wavy-char')); // Clean up GSAP animations on unmount
        }
    };
  }, [text]); // Re-run animation if text changes

  // Determine font size based on text length
  let dynamicFontSize;
  if (text.length <= 4) {
    dynamicFontSize = '5vw'; // Larger for shorter texts
  } else if (text.length <= 7) {
    dynamicFontSize = '4vw'; // Medium for slightly longer texts
  } else {
    dynamicFontSize = '4vw'; // Smaller for very long texts
  }

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '0.8rem' }}>
      {/* Background */}
      <img
        src={bg}
        alt="background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      {/* Texts */}
      <div
        ref={textRef} // Add ref here
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              fontSize: dynamicFontSize, // Apply dynamic font size here
              fontWeight: 900,
              color: '#ffe600',
              textShadow: '2px 2px 8px rgba(0,0,0,0.18)',
              opacity: 0.92,
              lineHeight: 1,
              margin: 0,
              letterSpacing: '0.04em',
              WebkitTextStroke: '2px #ffe600',
              userSelect: 'none',
            }}
          >
            {text.split('').map((char, charIdx) => (
              <span key={charIdx} className="wavy-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      </div>
      {/* Human PNG */}
      <img
        src={png}
        alt="human"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0, // Aligns bottom of image with bottom of container
          transform: 'translateX(-50%)', // Centers horizontally
          height: '80%',
          width: 'auto',
          objectFit: 'contain', // Ensures image is fully visible
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default AnimatedNavImage; 