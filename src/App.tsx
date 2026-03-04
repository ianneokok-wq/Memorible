import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Volume2, VolumeX, Music } from 'lucide-react';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ClassPage from './pages/ClassPage';
import RunPage from './pages/RunPage';
import BondPage from './pages/BondPage';
import PrinciplePage from './pages/PrinciplePage';
import HopePage from './pages/HopePage';
import GoodbyePage from './pages/GoodbyePage';

// Global Audio Player Component
function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Auto-play when component mounts (browser may block this)
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      // Try to play (may be blocked by browser autoplay policy)
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked - user needs to interact first
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log('Playback failed');
        });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Hidden Audio Element - loops continuously */}
      <audio
        ref={audioRef}
        src="/audio/love.mp3"
        loop
        preload="auto"
      />

      {/* Floating Music Control Button */}
      <div 
        className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Expanded Controls */}
        {showControls && (
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 mb-2 animate-fade-in">
            <span className="text-white text-xs font-medium">Background Music</span>
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              {isMuted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
            </button>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={togglePlay}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
            isPlaying 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse' 
              : 'bg-gray-700'
          }`}
        >
          <Music size={22} className={`text-white ${isPlaying ? 'animate-bounce' : ''}`} />
        </button>

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
        )}
      </div>
    </>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isUnlocked = localStorage.getItem('unlocked') === 'true';
  return isUnlocked ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      {/* Global Audio Player - persists across all routes */}
      <GlobalAudioPlayer />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/class" 
          element={
            <ProtectedRoute>
              <ClassPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/run" 
          element={
            <ProtectedRoute>
              <RunPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bond" 
          element={
            <ProtectedRoute>
              <BondPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/principle" 
          element={
            <ProtectedRoute>
              <PrinciplePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hope" 
          element={
            <ProtectedRoute>
              <HopePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/goodbye" 
          element={
            <ProtectedRoute>
              <GoodbyePage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
