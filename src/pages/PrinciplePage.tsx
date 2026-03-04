import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const carouselImages = [
  { src: '/images/yow.jpg', rotate: 0 },
  { src: '/images/oo.jpg', rotate: 60 },
  { src: '/images/op.jpg', rotate: 120 },
  { src: '/images/oi.jpg', rotate: 180 },
  { src: '/images/ou.jpg', rotate: 240 },
  { src: '/images/ooo.jpg', rotate: 300 },
];

export default function PrinciplePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.main-header h1', {
        y: -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      // Video scale animation
      gsap.to('.video-wrapper video', {
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scroll-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

      // Overlay text animation
      gsap.to('.overlay-text', {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.scroll-section',
          start: 'top top',
          end: 'center center',
          scrub: 1
        }
      });

      // Small pic animation
      gsap.to('.small-pic', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: {
          trigger: '.profile-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Reveal text animations
      const revealElements = gsap.utils.toArray('.reveal-text');
      revealElements.forEach((element: any) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Replay button animation
      gsap.to('.replay-btn', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.replay-btn',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Arial', sans-serif" }}>
      {/* Header */}
      <header className="main-header absolute top-10 w-full text-center z-[100] pointer-events-none">
        <span className="text-xl uppercase tracking-[8px] opacity-60 block mb-1">The Experience</span>
        <h1 
          className="text-6xl font-black uppercase tracking-[15px]"
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            background: 'linear-gradient(to bottom, #fff, #888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          The Last Principle
        </h1>
      </header>

      {/* Hero with 3D Carousel */}
      <section className="hero h-screen flex justify-center items-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <div className="scene relative w-[320px] h-[320px] mt-12" style={{ transformStyle: 'preserve-3d' }}>
          <div 
            className="carousel w-full h-full absolute"
            style={{ 
              transformStyle: 'preserve-3d',
              animation: 'spin 20s linear infinite'
            }}
          >
            {carouselImages.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={`Memory ${i + 1}`}
                className="absolute w-40 h-40 object-cover rounded-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-80px',
                  marginTop: '-80px',
                  boxShadow: '0 0 25px rgba(255,255,255,0.35)',
                  backfaceVisibility: 'hidden',
                  transform: `rotateY(${img.rotate}deg) translateZ(220px)`
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="%23333"><rect width="160" height="160"/><text x="50%" y="50%" text-anchor="middle" fill="%23fff" font-size="14">${i + 1}</text></svg>`;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Scroll Section */}
      <section className="scroll-section relative h-[200vh]">
        <div className="video-wrapper sticky top-0 h-screen overflow-hidden flex justify-center items-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/clasmates.mp4" type="video/mp4" />
          </video>
          
          <div 
            className="overlay-text absolute top-1/2 left-1/2 text-center z-[2] w-full opacity-0"
            style={{ transform: 'translate(-50%, -50%) translateY(150px)' }}
          >
            <h1 className="text-5xl uppercase tracking-[3px]">Scroll to Enter</h1>
            <p className="subtext mt-4 text-xl text-gray-300">The Last Stand.</p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="profile-section relative h-screen flex justify-center items-center text-center overflow-hidden">
        <div 
          className="profile-bg absolute inset-0 z-[1]"
          style={{
            background: 'url(/images/oo.jpg) no-repeat center center/cover',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="profile-content relative z-[2] flex flex-col items-center max-w-[600px] p-5">
          <img
            src="/images/yow.jpg"
            alt="Profile"
            className="small-pic w-[180px] h-[180px] object-cover rounded-full mb-6 opacity-0"
            style={{
              border: '4px solid white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              transform: 'scale(0.5)'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h2 className="text-3xl mb-2">Welcome to the Next Chapter</h2>
          <p className="text-lg text-gray-300">Through the journey of our shared experiences, we have grown together.</p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="narrative-section relative min-h-screen py-[100px] px-5 pb-[150px] flex justify-center overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #050505, #000)' }}
      >
        <div className="narrative-container max-w-[700px] w-full z-[2]">
          <div className="narrative-content">
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              Today feels different.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              We sit in the same room. We wear the same uniforms. We hear the same voices. But deep inside, we know something is changing. This may be one of the last times we are all together like this.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              We started as strangers. Some of us were shy. Some were loud. Some were unsure of themselves. Over time, we became classmates. Then friends. Then family in our own way.
            </p>
            
            <div className="narrative-list border-l-2 border-gray-700 pl-5 mb-10">
              <p className="reveal-text mb-4 italic text-lg text-gray-500 opacity-0" style={{ transform: 'translateY(30px)' }}>
                We shared answers during quizzes.
              </p>
              <p className="reveal-text mb-4 italic text-lg text-gray-500 opacity-0" style={{ transform: 'translateY(30px)' }}>
                We complained about deadlines.
              </p>
              <p className="reveal-text mb-4 italic text-lg text-gray-500 opacity-0" style={{ transform: 'translateY(30px)' }}>
                We laughed at small jokes.
              </p>
              <p className="reveal-text mb-4 italic text-lg text-gray-500 opacity-0" style={{ transform: 'translateY(30px)' }}>
                We survived stressful days together.
              </p>
            </div>

            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              And now, we are standing at the end.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              <strong>"The Last Principle"</strong> is not about rules anymore. It is about what we carry with us when we leave.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              Maybe after this year, we won't see each other every day. Maybe our paths will separate. Some will chase dreams far away. Some will face struggles we cannot see yet. Life will move fast.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              And that is what makes this moment painful.
            </p>
            
            <h2 
              className="highlight-principle reveal-text text-4xl text-white my-20 uppercase tracking-wide leading-tight font-black border-l-[5px] border-white pl-8 opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              The Last Principle is this: Value the people beside you before time takes them away.
            </h2>

            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              Not everyone here will stay in your life forever. But the memories will. The laughter will. Even the misunderstandings will become stories we smile about one day.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              We may forget lessons from textbooks. But we will not forget how it felt to belong here.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              As we move forward, let us leave with gratitude. Let us forgive small mistakes. Let us thank those who helped us. Let us appreciate this class—while we still can.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              Because one day, we will look back and realize—these ordinary days were the ones that mattered the most.
            </p>
            
            <p className="reveal-text text-xl leading-relaxed mb-10 text-gray-400 font-light opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              This is not just the end of a school year. It is the quiet goodbye to a chapter we can never return to.
            </p>

            <div className="final-callout mt-[100px] text-center">
              <p className="reveal-text text-2xl text-white mb-4 opacity-0" style={{ transform: 'translateY(30px)' }}>
                So let this be our last principle:
              </p>
              <h3 className="reveal-text text-3xl text-white uppercase tracking-[4px] my-4 opacity-0" style={{ transform: 'translateY(30px)' }}>
                Cherish every moment.
              </h3>
              <h3 className="reveal-text text-3xl text-white uppercase tracking-[4px] my-4 opacity-0" style={{ transform: 'translateY(30px)' }}>
                Protect every memory.
              </h3>
              <h3 className="reveal-text text-3xl text-white uppercase tracking-[4px] my-4 opacity-0" style={{ transform: 'translateY(30px)' }}>
                And never forget where we started—together.
              </h3>
              <p 
                className="reveal-text gratitude mt-20 text-5xl text-white text-center opacity-0"
                style={{ 
                  transform: 'translateY(30px)',
                  fontFamily: 'serif',
                  letterSpacing: '5px'
                }}
              >
                Thank you.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="replay-btn reveal-text block mx-auto mt-[100px] px-10 py-4 bg-white text-black rounded-full font-bold uppercase transition-all duration-300 opacity-0"
              style={{ transform: 'translateY(30px)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ddd';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Replay Experience
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        
        @media (max-width: 768px) {
          .main-header { top: 20px !important; }
          .main-header h0 { font-size: 0.8rem !important; letter-spacing: 4px !important; }
          .main-header h1 { font-size: 2rem !important; letter-spacing: 5px !important; }
          .scene { width: 220px !important; height: 220px !important; margin-top: 80px !important; }
          .carousel img { width: 100px !important; height: 100px !important; margin-left: -50px !important; margin-top: -50px !important; border-radius: 12px !important; }
          .overlay-text h1 { font-size: 1.8rem !important; }
          .small-pic { width: 120px !important; height: 120px !important; border-width: 3px !important; }
          .profile-content h2 { font-size: 1.5rem !important; }
          .profile-content p { font-size: 1rem !important; }
          .narrative-section { padding: 60px 15px 100px !important; }
          .narrative-content p { font-size: 1.1rem !important; line-height: 1.7 !important; margin-bottom: 30px !important; }
          .narrative-list p { font-size: 1rem !important; }
          .highlight-principle { font-size: 1.5rem !important; padding-left: 15px !important; border-left-width: 3px !important; margin: 50px 0 !important; }
          .final-callout h3 { font-size: 1.3rem !important; letter-spacing: 2px !important; }
          .gratitude { font-size: 2rem !important; }
          .replay-btn { padding: 12px 30px !important; margin-top: 60px !important; }
        }
      `}</style>
    </div>
  );
}
