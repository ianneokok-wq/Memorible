import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mosaicImages = [
  '/images/yow.jpg',
  '/images/oo.jpg',
  '/images/op.jpg',
  '/images/oi.jpg',
  '/images/ou.jpg',
  '/images/ooo.jpg',
];

export default function GoodbyePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline
      const tl = gsap.timeline();
      tl.to('.hero-subtitle', { opacity: 1, duration: 1.5, delay: 0.5 })
        .to('.hero-title', { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, '-=1');

      // Mosaic items animation
      const items = gsap.utils.toArray('.mosaic-item');
      items.forEach((item: any, i: number) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: i * 0.1
        });
      });

      // Speech lines animation
      const lines = gsap.utils.toArray('.speech-line');
      lines.forEach((line: any) => {
        gsap.to(line, {
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          },
          opacity: 1,
          y: 0,
          duration: 1
        });
      });

      // Final signature animation
      gsap.from('.final-signature', {
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 70%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)'
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden relative"
      style={{ 
        backgroundColor: '#fdfbf7',
        color: '#2c2c2c',
        fontFamily: "'Mulish', sans-serif"
      }}
    >
      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      {/* Hero Section */}
      <section className="hero h-screen flex flex-col justify-center items-center text-center px-5 relative">
        <div 
          className="hero-subtitle text-base uppercase tracking-[5px] mb-8 opacity-0"
          style={{ color: '#888' }}
        >
          Class of 2026 • Senior High School
        </div>
        
        <h1 
          className="hero-title text-8xl leading-none mb-5 opacity-0"
          style={{ 
            fontFamily: "'Italiana', serif",
            fontWeight: 400,
            transform: 'translateY(30px)'
          }}
        >
          We Made It.
          <span 
            className="block text-4xl mt-2"
            style={{ 
              fontFamily: "'Pinyon Script', cursive",
              color: '#d4af37',
              textTransform: 'none',
              letterSpacing: 0
            }}
          >
            The Moment Before Goodbye
          </span>
        </h1>
        
        <div 
          className="scroll-hint absolute bottom-10 text-xs uppercase tracking-[3px] opacity-50"
          style={{ animation: 'bounce 2s infinite' }}
        >
          Scroll to Remember
        </div>
      </section>

      {/* Mosaic Section */}
      <section className="mosaic-section py-[100px] px-[10%] relative">
        <div className="mosaic-grid grid grid-cols-3 gap-8 mb-[100px]">
          {mosaicImages.map((src, i) => (
            <div
              key={i}
              className={`mosaic-item relative overflow-hidden opacity-0`}
              style={{ 
                aspectRatio: '4/5',
                transform: 'translateY(50px)',
                marginTop: i === 1 ? '50px' : i === 2 ? '-30px' : 0
              }}
            >
              <img
                src={src}
                alt={`Memory ${i + 1}`}
                className="w-full h-full object-cover transition-all duration-1500"
                style={{ filter: 'sepia(0.2) contrast(0.9)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.filter = 'sepia(0) contrast(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'sepia(0.2) contrast(0.9)';
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="375" fill="%23f4f1ea"><rect width="300" height="375"/><text x="50%" y="50%" text-anchor="middle" fill="%23d4af37" font-size="16">Memory ${i + 1}</text></svg>`;
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Speech Section */}
      <section className="speech-section max-w-[700px] mx-auto pb-[150px] text-left px-5">
        <span 
          className="script-font block text-4xl mb-2"
          style={{ 
            fontFamily: "'Pinyon Script', cursive",
            color: '#d4af37'
          }}
        >
          To my batchmates,
        </span>
        
        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          We spent four years in Junior High dreaming about this moment. Then we spent two years in Senior High working for it. And now, suddenly, it is here.
        </p>

        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          Grade 12 was not easy. It was research papers that never ended. It was college applications that kept us up at night. It was the pressure of "what comes next" hanging over our heads every single day.
        </p>

        <div 
          className="speech-line highlight my-[40px] mx-0 opacity-0"
          style={{ 
            fontFamily: "'Italiana', serif",
            fontSize: '2rem',
            color: '#222',
            borderLeft: '2px solid #d4af37',
            paddingLeft: '30px',
            transform: 'translateY(20px)'
          }}
        >
          "But amidst the stress, we built a home."
        </div>

        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          We survived the defense. We survived the exams. We survived the uncertainty.
        </p>
        
        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          But looking around this room now, I don't see the struggle anymore. I see faces I have grown up with. I see the people who shared their lunch, who shared their answers, and who shared their dreams.
        </p>

        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          This is the moment before goodbye. The moment before we take off our uniforms for the last time. The moment before we go from "classmates" to "memories."
        </p>

        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          We are about to step into the real world. It will be big, and it will be scary. But we can face it with heads held high because we conquered this chapter together.
        </p>

        <p 
          className="speech-line text-[1.4rem] leading-relaxed mb-10 opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          So take a look around. Memorize these smiles. Because we will never be this young, and this together, ever again.
        </p>

        <p 
          className="speech-line text-[1.4rem] leading-relaxed mt-20 font-bold opacity-0"
          style={{ 
            color: '#555',
            transform: 'translateY(20px)'
          }}
        >
          Congratulations, Seniors. We did it.
        </p>
      </section>

      {/* Footer */}
      <section className="footer h-[60vh] flex flex-col justify-center items-center text-center"
        style={{ background: '#f4f1ea' }}
      >
        <p 
          className="text-sm uppercase tracking-[3px] mb-5"
        >
          End of Chapter
        </p>
        <h1 
          className="final-signature text-6xl"
          style={{ 
            fontFamily: "'Pinyon Script', cursive",
            color: '#d4af37'
          }}
        >
          Good luck on your journey.
        </h1>
        <button
          onClick={scrollToTop}
          className="replay-btn mt-10 bg-transparent border px-10 py-4 uppercase tracking-[2px] transition-all duration-300 cursor-pointer"
          style={{ borderColor: '#aaa', color: '#888' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#222';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = '#222';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#888';
            e.currentTarget.style.borderColor = '#aaa';
          }}
        >
          Replay
        </button>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Mulish:wght@300;400&family=Pinyon+Script&display=swap');
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 3rem !important; }
          .hero-title span { font-size: 1.5rem !important; }
          .mosaic-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; padding: 50px 5% !important; }
          .mosaic-item:nth-child(2), .mosaic-item:nth-child(3) { margin-top: 0 !important; }
          .speech-section { padding: 0 20px 80px !important; }
          .speech-line { font-size: 1.1rem !important; }
          .highlight { font-size: 1.4rem !important; padding-left: 15px !important; }
          .final-signature { font-size: 2.5rem !important; }
          .script-font { font-size: 1.8rem !important; }
        }
      `}</style>
    </div>
  );
}
