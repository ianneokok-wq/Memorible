import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface PhotoItem {
  id: string;
  title: string;
  image: string;
  link: string;
  delay: number;
}

const photoItems: PhotoItem[] = [
  { id: '1', title: 'The Last Run', image: '/images/Run.png', link: '/run', delay: 0.1 },
  { id: '2', title: 'The Last Bond', image: '/images/The Last Bond.png', link: '/bond', delay: 0.3 },
  { id: '3', title: 'The Last Principle', image: '/images/The Last Principle.png', link: '/principle', delay: 0.5 },
  { id: '4', title: 'The Last Hope', image: '/images/The Last Hope.png', link: '/hope', delay: 0.7 },
  { id: '5', title: 'The Last Moment Before Goodbye', image: '/images/The Last Moment Before Goodbye.png', link: '/goodbye', delay: 0.9 },
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');
  const petalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already unlocked
    const unlocked = localStorage.getItem('unlocked');
    const savedName = localStorage.getItem('username');
    if (unlocked === 'true' && savedName) {
      setIsUnlocked(true);
      setWelcomeName(savedName);
    }

    // Create falling petals
    createPetals();
  }, []);

  const createPetals = () => {
    const container = petalsRef.current;
    if (!container) return;
    
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.width = Math.random() * 8 + 4 + 'px';
      petal.style.height = petal.style.width;
      petal.style.animationDuration = Math.random() * 4 + 5 + 's';
      petal.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(petal);
    }
  };

  const checkPassword = () => {
    const nameInput = username.trim();
    const passwordInput = password.trim().toLowerCase();
    
    if (!nameInput) {
      alert('Please tell us who you are first... 💗');
      return;
    }
    
    if (passwordInput === 'sir mc cute') {
      localStorage.setItem('unlocked', 'true');
      localStorage.setItem('username', nameInput);
      unlockPage(nameInput);
    } else {
      alert('That\'s not the secret key... 😢');
    }
  };

  const unlockPage = (name: string) => {
    setShowWelcome(true);
    setWelcomeName(name);
    
    setTimeout(() => {
      setShowWelcome(false);
      setIsUnlocked(true);
    }, 2200);
  };

  const logout = () => {
    localStorage.removeItem('unlocked');
    localStorage.removeItem('username');
    setIsUnlocked(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1b2028 0%, #0a0c10 100%)',
        fontFamily: "'Poppins', sans-serif",
        color: '#d1d5db'
      }}
    >
      {/* Falling Petals Container */}
      <div ref={petalsRef} id="petal-container" className="fixed inset-0 pointer-events-none z-[1]" />

      {/* Welcome Overlay */}
      {showWelcome && (
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'rgba(10, 12, 16, 0.98)', animation: 'fadeIn 1.5s forwards' }}
        >
          <div className="text-[40px] font-bold text-[#8ca8d8]">Welcome back, {welcomeName} 💖</div>
          <span className="text-lg text-gray-500 mt-2 font-normal">Loading memories...</span>
        </div>
      )}

      {/* Login Form */}
      {!isUnlocked && !showWelcome && (
        <div className="min-h-screen flex items-center justify-center p-5">
          <div 
            className="max-w-[900px] w-full rounded-[30px] p-10 text-center relative z-10"
            style={{
              background: 'rgba(30, 35, 45, 0.75)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <h2 className="text-[28px] font-semibold tracking-wide mb-2 text-[#8ca8d8]">🔐 The Archives</h2>
            <div className="text-sm text-gray-500 mb-6 italic">
              "Don't cry because it's over, smile because it happened."
            </div>
            
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-400 mb-3"
              style={{
                width: '240px',
                border: '2px solid #374151',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#f3f4f6'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8ca8d8';
                e.target.style.boxShadow = '0 0 15px rgba(140, 168, 216, 0.2)';
                e.target.style.background = 'rgba(0,0,0,0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#374151';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(0, 0, 0, 0.3)';
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-400"
              style={{
                width: '240px',
                border: '2px solid #374151',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#f3f4f6'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8ca8d8';
                e.target.style.boxShadow = '0 0 15px rgba(140, 168, 216, 0.2)';
                e.target.style.background = 'rgba(0,0,0,0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#374151';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(0, 0, 0, 0.3)';
              }}
            />
            <br />
            <button
              onClick={checkPassword}
              className="mt-4 px-8 py-2.5 rounded-full text-white text-base transition-all duration-400 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #4b5a75, #2a3441)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(140, 168, 216, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
              }}
            >
              Unlock Memories
            </button>
            
            <div className="mt-3 text-xs text-gray-500">
              Password hint: <strong>sir mc cute</strong>
            </div>
          </div>
        </div>
      )}

      {/* Gallery View */}
      {isUnlocked && !showWelcome && (
        <div className="min-h-screen flex flex-col items-center py-10 px-5">
          {/* Gallery */}
          <div 
            className="flex flex-nowrap overflow-x-auto gap-8 mt-5 max-w-[95vw] w-full p-5 z-10"
            style={{ scrollBehavior: 'smooth' }}
          >
            {photoItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="text-center flex-shrink-0 w-[300px] opacity-0 animate-pop-up transition-transform duration-400 hover:scale-105"
                style={{ 
                  animationDelay: `${item.delay}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[300px] h-[300px] object-cover rounded-xl cursor-pointer block transition-all duration-700"
                  style={{
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    border: '2px solid #374151',
                    filter: 'grayscale(0.9) brightness(0.6) contrast(1.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0) brightness(1) contrast(1)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(140, 168, 216, 0.2)';
                    e.currentTarget.style.borderColor = '#8ca8d8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0.9) brightness(0.6) contrast(1.2)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
                    e.currentTarget.style.borderColor = '#374151';
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="%23222"><rect width="300" height="300"/><text x="50%" y="50%" text-anchor="middle" fill="%238ca8d8" font-size="16">${item.title}</text></svg>`;
                  }}
                />
                <p className="mt-4 text-base text-gray-400 font-medium italic tracking-wide">{item.title}</p>
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center w-full mt-8 z-10">
            <Link
              to="/class"
              className="px-9 py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #4b5a75, #2a3441)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(140, 168, 216, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
              }}
            >
              👩‍🏫 Return to Class
            </Link>
            <button
              onClick={logout}
              className="px-9 py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#4b5a75',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
              }}
            >
              🚪 Log Out
            </button>
          </div>

          {/* Footer Quote */}
          <div className="mt-10 text-gray-500 text-sm opacity-80 text-center z-10">
            Endings are just new beginnings in disguise.
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes popUp {
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-up {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
          animation: popUp 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .petal {
          position: fixed;
          top: -10%;
          background: rgba(200, 200, 210, 0.3);
          border-radius: 100% 0 100% 0;
          z-index: 1;
          animation: fall linear infinite;
          filter: blur(1px);
        }
        @keyframes fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translate(100px, 100vh) rotate(360deg); opacity: 0; }
        }
        ::-webkit-scrollbar { height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #4b5a75; border-radius: 10px; }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      `}</style>
    </div>
  );
}
