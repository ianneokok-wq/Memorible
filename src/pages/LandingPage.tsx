import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  useEffect(() => {
    // Update Firebase presence if logged in
    const username = localStorage.getItem('username');
    if (username && (window as any).firebase) {
      const db = (window as any).firebase.database();
      const userRef = db.ref('onlineUsers/' + username);
      userRef.set({
        name: username,
        page: 'landing',
        time: Date.now()
      });
      userRef.onDisconnect().remove();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-5"
      style={{
        background: 'linear-gradient(135deg, #000000, #2e004f, #6b00b3)',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <div 
        className="max-w-[850px] w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(212, 169, 10, 0.3)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 1.8s ease'
        }}
      >
        <img 
          src="/images/cheerdance.jpeg" 
          alt="Memories of ICT 12-D"
          className="w-full h-auto object-cover border-b-[3px] border-[#d4a90a] brightness-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" fill="%23333"><rect width="800" height="400"/><text x="50%" y="50%" text-anchor="middle" fill="%23d4a90a" font-size="24">ICT 12-D Memories</text></svg>';
          }}
        />
        
        <div 
          className="p-6 text-center"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(50,0,90,0.6))'
          }}
        >
          <h2 
            className="text-[34px] mb-3 tracking-wide"
            style={{
              color: '#d4a90a',
              fontFamily: "'Great Vibes', cursive",
              textShadow: '0 0 10px rgba(212,169,10,0.7)'
            }}
          >
            Memories of ICT 12-D
          </h2>
          
          <p className="text-lg leading-relaxed font-medium" style={{ color: '#e5dbff' }}>
            Hi guys!! I made this website for our memories, I'll make it memorable and enjoyable. 
            The time is so fast — we are going to be in college now and we will be separated. 
            I LOVE YOU GUYSS!! I made this for all of you guys!!
          </p>
          
          <div 
            className="h-1 w-[90px] rounded-md mx-auto mt-4"
            style={{
              background: 'linear-gradient(90deg, #d4a90a, #ffecb3)',
              boxShadow: '0 0 8px rgba(212,169,10,0.7)'
            }}
          />
          
          <Link 
            to="/login"
            className="inline-block mt-5 px-7 py-3.5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #d4a90a, #c79c15)',
              color: '#1f0033',
              boxShadow: '0 0 15px rgba(212,169,10,0.6)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(212,169,10,0.9)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffdc73, #d4a90a)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(212,169,10,0.6)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #d4a90a, #c79c15)';
            }}
          >
            View Our Memory
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Great+Vibes&display=swap');
      `}</style>
    </div>
  );
}
