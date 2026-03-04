import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stripImages = [
  '/images/yow.jpg',
  '/images/oo.jpg',
  '/images/op.jpg',
  '/images/oi.jpg',
  '/images/ou.jpg',
  '/images/ooo.jpg',
];

export default function RunPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.hero-title', {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      });

      // Film strip scroll animation
      if (filmStripRef.current) {
        gsap.to('.film-strip', {
          x: '-50%',
          scrollTrigger: {
            trigger: '.strip-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            pin: true
          }
        });
      }

      // Run lines animation
      const lines = gsap.utils.toArray('.run-line');
      lines.forEach((line: any) => {
        gsap.to(line, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Sub-text animation
      gsap.utils.toArray('.sub-text').forEach((text: any) => {
        gsap.to(text, {
          opacity: 1,
          x: -20,
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Finish line animation
      gsap.from('.finish-line h1', {
        scrollTrigger: {
          trigger: '.finish-line',
          start: 'top 50%'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="hero h-screen flex flex-col justify-center items-center relative">
        <div className="status-bar absolute bottom-10 w-full flex justify-between px-12 text-sm uppercase"
          style={{ color: '#ff4d00' }}
        >
          <span>System: Active</span>
          <span>Location: The Final Mile</span>
          <span>Status: 99% Complete</span>
        </div>
        
        <h1 className="hero-title text-center z-10 leading-[0.8] tracking-[-5px]"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '12vw'
          }}
        >
          The Last<span className="block text-transparent" style={{ WebkitTextStroke: '2px white' }}>Run</span>
        </h1>
      </section>

      {/* Film Strip Section */}
      <section ref={filmStripRef} className="strip-section h-screen flex items-center overflow-hidden"
        style={{ background: '#050505' }}
      >
        <div className="film-strip flex gap-5 pl-12" style={{ willChange: 'transform' }}>
          {stripImages.map((img, i) => (
            <div 
              key={i} 
              className="strip-item flex-shrink-0 transition-all duration-500"
              style={{ 
                width: '450px', 
                height: '300px',
                filter: 'grayscale(1) contrast(1.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0) contrast(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(1) contrast(1.2)';
              }}
            >
              <img 
                src={img} 
                alt={`Memory ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="450" height="300" fill="%23111"><rect width="450" height="300"/><text x="50%" y="50%" text-anchor="middle" fill="%23ff4d00" font-size="18">Memory ${i + 1}</text></svg>`;
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section ref={narrativeRef} className="narrative-section py-[150px] px-12 relative">
        <span className="run-line block mb-[60px] uppercase leading-none"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '4rem',
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          }}
        >
          Today feels different.
        </span>
        
        <p className="sub-text text-xl max-w-[600px] ml-auto text-right mb-[100px] text-gray-500 pr-5"
          style={{ 
            borderRight: '3px solid #ff4d00',
            opacity: 0
          }}
        >
          We sit in the same room. We wear the same uniforms. We hear the same voices.
        </p>

        <span className="run-line accent block mb-[60px] uppercase leading-none"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '4rem',
            color: '#ff4d00',
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          }}
        >
          Strangers to Family.
        </span>
        
        <p className="sub-text text-xl max-w-[600px] ml-auto text-right mb-[100px] text-gray-500 pr-5"
          style={{ 
            borderRight: '3px solid #ff4d00',
            opacity: 0
          }}
        >
          Some of us were shy. Some were loud. Over time, we became classmates. Then friends. Then family.
        </p>

        <span className="run-line block mb-[60px] uppercase leading-none"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '4rem',
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          }}
        >
          The Quiz. The Deadline.
        </span>
        
        <span className="run-line block mb-[60px] uppercase leading-none"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '4rem',
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          }}
        >
          The Laughter. The Stress.
        </span>
        
        <div className="final-grid grid grid-cols-2 gap-[100px] mt-[200px]">
          <div>
            <span className="run-line block uppercase leading-none mb-4"
              style={{ 
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '2.5rem',
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
              }}
            >
              Value the people.
            </span>
            <p className="text-gray-500">Not everyone here will stay in your life forever. But the memories will. The laughter will.</p>
          </div>
          <div className="text-right self-end">
            <span className="run-line accent block uppercase leading-none mb-4"
              style={{ 
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '2.5rem',
                color: '#ff4d00',
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
              }}
            >
              One Last Principle.
            </span>
            <p className="text-gray-500">Cherish every moment. Protect every memory. Never forget where we started.</p>
          </div>
        </div>
      </section>

      {/* Finish Line */}
      <section ref={finishRef} className="finish-line h-screen flex flex-col justify-center items-center text-center"
        style={{ background: '#ff4d00', color: 'black' }}
      >
        <p className="font-mono uppercase mb-4">You Reached The End</p>
        <h1 className="leading-[0.8]"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '15vw'
          }}
        >
          THANK<br />YOU.
        </h1>
        <button 
          onClick={scrollToTop}
          className="replay-btn mt-12 bg-black text-white border-none px-12 py-5 transition-transform duration-300 hover:scale-110"
          style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '1.5rem',
            clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) skewX(-5deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) skewX(0)';
          }}
        >
          Run It Back
        </button>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:ital@0;1&display=swap');
        
        @media (max-width: 768px) {
          .hero-title { font-size: 16vw !important; letter-spacing: -2px !important; }
          .hero-title span { -webkit-text-stroke: 1px white !important; }
          .status-bar { 
            padding: 0 20px !important; 
            font-size: 0.6rem !important; 
            flex-direction: column !important; 
            align-items: center !important; 
            gap: 5px !important; 
            bottom: 20px !important; 
          }
          .strip-item { width: 280px !important; height: 190px !important; }
          .film-strip { padding-left: 20px !important; gap: 15px !important; }
          .narrative-section { padding: 80px 20px !important; }
          .run-line { font-size: 2.2rem !important; margin-bottom: 40px !important; }
          .sub-text { font-size: 1rem !important; padding-right: 15px !important; margin-bottom: 60px !important; }
          .final-grid { grid-template-columns: 1fr !important; gap: 50px !important; margin-top: 100px !important; }
          .final-grid .run-line { font-size: 1.8rem !important; }
          .finish-line h1 { font-size: 20vw !important; }
          .replay-btn { padding: 15px 35px !important; font-size: 1.2rem !important; }
        }
      `}</style>
    </div>
  );
}
