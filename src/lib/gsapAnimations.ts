import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation presets
export const animations = {
  // Fade in from bottom
  fadeInUp: (element: HTMLElement | string, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' }
    );
  },

  // Fade in from top
  fadeInDown: (element: HTMLElement | string, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' }
    );
  },

  // Stagger animation for lists
  staggerFadeIn: (elements: HTMLElement[] | string, stagger = 0.1) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger,
        ease: 'power2.out',
      }
    );
  },

  // Scroll reveal animation
  scrollReveal: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
          markers: false,
        },
      }
    );
  },

  // Parallax effect
  parallax: (element: HTMLElement | string, strength = 1) => {
    gsap.to(element, {
      y: () => window.innerHeight * strength * 0.5,
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      ease: 'none',
    });
  },

  // Rotate animation
  rotate: (element: HTMLElement | string, duration = 4, repeat = -1) => {
    return gsap.to(element, {
      rotation: 360,
      duration,
      repeat,
      ease: 'none',
    });
  },

  // Hover scale effect
  hoverScale: (element: HTMLElement) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    element.addEventListener('mouseleave', () => {
      gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  },

  // Pulse animation
  pulse: (element: HTMLElement | string, duration = 2) => {
    return gsap.to(element, {
      opacity: 0.6,
      duration: duration / 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  },

  // Bounce animation
  bounce: (element: HTMLElement | string, distance = 10) => {
    return gsap.to(element, {
      y: -distance,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  },
};

export default gsap;
