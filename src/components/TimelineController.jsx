import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function useTimeline(containerRef, setProgress, setActiveDoor) {
  useEffect(() => {
    const proxy = { progress: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=4000',
        scrub: 1,
        pin: true,
      },
    });

    tl.to(proxy, {
      progress: 1,
      onUpdate: () => {
        setProgress(proxy.progress);
        setActiveDoor(Math.floor(proxy.progress * 4)); // total doors = 4
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.killAll();
    };
  }, [containerRef]);
}
