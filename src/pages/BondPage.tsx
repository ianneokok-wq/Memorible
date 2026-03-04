import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  { src: '/images/yow.jpg', className: 'img-1', style: { top: '10%', left: '10%', transform: 'rotate(-5deg)' } },
  { src: '/images/oo.jpg', className: 'img-2', style: { bottom: '10%', right: '10%', transform: 'rotate(5deg)' } },
  { src: '/images/op.jpg', className: 'img-3', style: { top: '20%', right: '20%', width: '15vw', height: '15vw', borderRadius: '50%' } },
];

const photoCards = [
  '/images/oi.jpg',
  '/images/ou.jpg',
  '/images/ooo.jpg',
];

export default function BondPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation timeline
      const tl = gsap.timeline();
      
      tl.to('.hero h1', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
      })
      .to('.hero-bg-img', {
        opacity: 0.6,
        duration: 2,
        stagger: 0.3
      }, '-=1');

      // Mouse parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-bg-img', { x, y, duration: 1 });
      };

      document.addEventListener('mousemove', handleMouseMove);

      // Photo stack animation
      const cards = gsap.utils.toArray('.photo-card');
      gsap.to(cards, {
        scrollTrigger: {
          trigger: '.gallery-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: true
        },
        rotate: (index: number) => (index - 1) * 15,
        x: (index: number) => (index - 1) * 100,
        scale: 0.9,
        ease: 'none'
      });

      // Bond text animations
      const texts = gsap.utils.toArray('.bond-text');
      texts.forEach((text: any) => {
        gsap.to(text, {
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1
        });
      });

      // Final signature animation
      gsap.from('.final-signature', {
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 70%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden"
      style={{ 
        backgroundColor: '#0e0e0e',
        color: '#e0e0e0',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="hero h-screen flex flex-col justify-center items-center relative z-[2]">
        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt="Memory"
            className={`hero-bg-img absolute object-cover rounded opacity-40 z-[1] ${img.className}`}
            style={{
              width: '25vw',
              height: '35vw',
              filter: 'grayscale(100%) sepia(20%)',
              ...img.style
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ))}

        <h1 
          className="text-center z-[2] opacity-0"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '5vw',
            lineHeight: 1,
            mixBlendMode: 'exclusion',
            transform: 'translateY(50px)'
          }}
        >
          <span 
            className="block mb-5 uppercase tracking-[10px]"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: '2vw',
              color: '#c5a059'
            }}
          >
            The Experience
          </span>
          The Last Bond
        </h1>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section py-[100px] relative">
        <div className="gallery-container flex justify-center items-center h-[150vh] relative">
          <div className="gallery-text absolute z-10 text-center w-full pointer-events-none">
            <h2 
              className="text-6xl"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 10px 30px black'
              }}
            >
              We grew up<br />side by side.
            </h2>
          </div>
          
          <div className="photo-stack relative w-[400px] h-[500px]">
            {photoCards.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Photo ${i + 1}`}
                className={`photo-card absolute top-0 left-0 w-full h-full object-cover card-${i + 1}`}
                style={{
                  border: '8px solid white',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  transformOrigin: 'center bottom'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" fill="%23222"><rect width="400" height="500"/><text x="50%" y="50%" text-anchor="middle" fill="%23c5a059" font-size="20">Photo ${i + 1}</text></svg>`;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="narrative-section max-w-[800px] mx-auto py-[150px] px-5">
        <span 
          className="chapter-marker text-center uppercase tracking-[4px] mb-20 text-sm relative left-1/2 -translate-x-1/2 inline-block pb-2.5"
          style={{ 
            color: '#c5a059',
            borderBottom: '1px solid #c5a059'
          }}
        >
          The Untold Story
        </span>

        <p className="bond-text text-2xl leading-relaxed text-gray-400 mb-[60px] font-light opacity-0 blur-[10px]"
          style={{ transform: 'translateY(20px)' }}
        >
          They say that proximity creates friends. We sit at the same tables, walk the same halls, and breathe the same air. But what we have is deeper than geography.
        </p>

        <p className="bond-text text-2xl leading-relaxed text-gray-400 mb-[60px] font-light opacity-0 blur-[10px]"
          style={{ transform: 'translateY(20px)' }}
        >
          <strong className="text-white font-normal text-[1.8rem]" style={{ fontFamily: "'Playfair Display', serif" }}>
            A bond is not a chain.
          </strong>{' '}
          Chains are heavy. Chains restrict you. What we built is a thread. Invisible. Weightless. But strong enough to stretch across cities, across universities, and across time.
        </p>

        <div className="quote-box bond-text my-[100px] p-10 opacity-0 blur-[10px]"
          style={{ 
            transform: 'translateY(20px)',
            borderLeft: '2px solid #c5a059',
            background: 'linear-gradient(90deg, rgba(197, 160, 89, 0.05), transparent)'
          }}
        >
          <p 
            className="text-white text-4xl italic leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Distance does not break a bond. It only proves its strength."
          </p>
        </div>

        <p className="bond-text text-2xl leading-relaxed text-gray-400 mb-[60px] font-light opacity-0 blur-[10px]"
          style={{ transform: 'translateY(20px)' }}
        >
          Think about the silence. The moments where we didn't need to speak to understand each other. The glances across the room when the teacher said something funny. The collective sigh before a difficult exam.
        </p>

        <p className="bond-text text-2xl leading-relaxed text-gray-400 mb-[60px] font-light opacity-0 blur-[10px]"
          style={{ transform: 'translateY(20px)' }}
        >
          We are leaving this place, but we are not leaving each other behind. We are simply expanding the map of where we exist.
        </p>

        <p className="bond-text text-2xl leading-relaxed text-gray-400 mb-[60px] font-light opacity-0 blur-[10px]"
          style={{ transform: 'translateY(20px)' }}
        >
          So, do not say goodbye as if it is an ending. Say it as a promise.
        </p>
      </section>

      {/* Footer Section */}
      <section className="footer-section h-[80vh] flex flex-col justify-center items-center text-center"
        style={{ background: '#050505' }}
      >
        <h2 
          className="bond-text text-2xl uppercase tracking-[3px] opacity-0 blur-[10px]"
          style={{ transform: 'translateY(20px)' }}
        >
          Forever Connected
        </h2>
        <h1 
          className="final-signature text-8xl mt-4"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#c5a059',
            opacity: 0.8
          }}
        >
          The Last Bond.
        </h1>
        <button
          onClick={scrollToTop}
          className="restart-btn mt-10 bg-transparent px-8 py-4 uppercase tracking-[2px] transition-all duration-400 cursor-pointer"
          style={{ 
            border: '1px solid #888',
            color: '#888'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c5a059';
            e.currentTarget.style.color = '#c5a059';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#888';
            e.currentTarget.style.color = '#888';
          }}
        >
          Replay
        </button>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 8vw !important; }
          .hero h1 span { font-size: 3vw !important; letter-spacing: 5px !important; }
          .hero-bg-img { width: 35vw !important; height: 45vw !important; opacity: 0.25 !important; }
          .img-1 { left: 5% !important; }
          .img-2 { right: 5% !important; }
          .img-3 { width: 25vw !important; height: 25vw !important; right: 10% !important; }
          .photo-stack { width: 280px !important; height: 350px !important; }
          .gallery-text h2 { font-size: 2.5rem !important; }
          .bond-text { font-size: 1.2rem !important; }
          .bond-text strong { font-size: 1.4rem !important; }
          .quote-box { padding: 25px !important; margin: 60px 0 !important; }
          .quote-box p { font-size: 1.8rem !important; }
          .final-signature { font-size: 3.5rem !important; }
          .narrative-section { padding: 80px 15px !important; }
        }
      `}</style>
    </div>
  );
}
