import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const memoryImages = [
  { src: '/images/yow.jpg', className: 'img-1', style: { top: '0', left: '10%', width: '250px' } },
  { src: '/images/oo.jpg', className: 'img-2', style: { top: '20%', right: '10%', width: '300px' } },
  { src: '/images/op.jpg', className: 'img-3', style: { top: '50%', left: '20%', width: '280px' } },
  { src: '/images/oi.jpg', className: 'img-4', style: { top: '60%', right: '15%', width: '220px' } },
];

export default function HopePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.to('.hero h1', { 
        opacity: 1, 
        scale: 1, 
        duration: 3, 
        ease: 'power2.out' 
      });
      gsap.to('.hero p', { 
        opacity: 0.7, 
        y: -10, 
        delay: 1.5, 
        duration: 2 
      });

      // Memory images animations
      const images = gsap.utils.toArray('.memory-img');
      images.forEach((img: any, i: number) => {
        gsap.to(img, {
          opacity: 0.8,
          duration: 2,
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        });

        gsap.to(img, {
          y: -100 * (i + 1),
          scrollTrigger: {
            trigger: '.memory-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        });
      });

      // Ghost text animations
      const texts = gsap.utils.toArray('.ghost-text');
      texts.forEach((text: any) => {
        gsap.to(text, {
          opacity: 1,
          y: 0,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Fading line animation
      gsap.from('.fading-line', {
        height: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '.final-hope',
          start: 'top 70%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden"
      style={{ 
        background: '#020203',
        color: '#a8a8a8',
        fontFamily: "'Cormorant Garamond', serif"
      }}
    >
      {/* Fog Container */}
      <div 
        className="fog-container fixed inset-0 pointer-events-none z-0"
        style={{ 
          opacity: 0.3,
          background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, transparent 60%)'
        }}
      />

      {/* Hero Section */}
      <section className="hero h-screen flex flex-col justify-center items-center relative z-[2]">
        <h1 
          className="text-6xl font-light uppercase tracking-[10px] text-[#f0f0f0] opacity-0"
          style={{ 
            transform: 'scale(0.95)',
            textShadow: '0 0 20px rgba(255,255,255,0.2)'
          }}
        >
          The Last Hope
        </h1>
        <p 
          className="text-xs uppercase tracking-[5px] mt-5 opacity-0"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Even the brightest stars eventually fade.
        </p>
      </section>

      {/* Memory Section */}
      <section className="memory-section min-h-[150vh] relative flex flex-col items-center pt-[100px]">
        <div className="memory-container relative w-full max-w-[900px] h-screen">
          {memoryImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={`Memory ${i + 1}`}
              className={`memory-img absolute opacity-0 transition-all duration-1000 ${img.className}`}
              style={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                filter: 'sepia(30%) desaturate(40%) contrast(0.9)',
                zIndex: i === 2 ? 3 : i === 1 ? 2 : 1,
                ...img.style
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'sepia(0%) desaturate(0%) contrast(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'sepia(30%) desaturate(40%) contrast(0.9)';
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="narrative-section py-[100px] px-5 min-h-screen flex flex-col items-center justify-center text-center z-[5]">
        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          The room is quiet now. <br />
          The noise has stopped. The deadlines are gone. The rush is over.
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          We spent so much time wishing for this to be over. We counted the days. We watched the clock.
          <strong 
            className="text-[#f0f0f0] font-normal block text-[2.2rem] mt-2"
          >
            But now that the clock has stopped, why does the silence feel so heavy?
          </strong>
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          We are packing away more than just books and papers. We are packing away a version of ourselves that will never exist again.
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          They say "all good things come to an end." <br />
          But they never told us how much the ending would hurt.
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          So here is <strong className="text-[#f0f0f0] font-normal block text-[2.2rem] mt-2">The Last Hope.</strong>
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          My hope is not that we stay the same. We cannot. <br />
          My hope is not that we never drift apart. We will. <br />
          That is the tragedy of growing up.
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          My hope is simply this:<br />
          That on a random Tuesday, years from now, something small—a song, a smell, a phrase—will remind you of this room.
        </p>

        <p 
          className="ghost-text text-3xl leading-[2] max-w-[600px] mb-20 text-gray-500 italic opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          And for one second, you will close your eyes and be back here with us. <br />
          Young. Full of dreams. And together.
        </p>
      </section>

      {/* Final Hope Section */}
      <section className="final-hope h-[80vh] flex flex-col justify-center items-center relative">
        <div 
          className="fading-line w-px h-[100px] mb-8"
          style={{ background: 'linear-gradient(to bottom, transparent, white, transparent)' }}
        />
        <h2 
          className="text-2xl uppercase tracking-[5px] font-light"
          style={{ color: '#f0f0f0' }}
        >
          DON'T FORGET US.
        </h2>
        <div
          onClick={scrollToTop}
          className="replay-link mt-12 text-[#444] no-underline text-xs uppercase tracking-[3px] transition-colors duration-500 cursor-pointer"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#444';
          }}
        >
          Return to the start
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200&display=swap');
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem !important; letter-spacing: 5px !important; }
          .hero p { font-size: 0.6rem !important; letter-spacing: 3px !important; }
          .img-1 { width: 150px !important; left: 5% !important; }
          .img-2 { width: 180px !important; right: 5% !important; }
          .img-3 { width: 170px !important; left: 10% !important; }
          .img-4 { width: 140px !important; right: 10% !important; }
          .ghost-text { font-size: 1.3rem !important; padding: 0 15px !important; }
          .ghost-text strong { font-size: 1.6rem !important; }
          .narrative-section { padding: 60px 15px !important; }
        }
      `}</style>
    </div>
  );
}
