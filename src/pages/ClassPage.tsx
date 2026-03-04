import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Person {
  file: string;
  name: string;
  role: string;
  extra: string[];
  message: string;
}

const people: Person[] = [
  { file: "/images/adviser.jpg", name: "Sr. Mc Ron Dacusin", role: "Adviser", extra: ["ICT Teacher"], message: "Proud of you all — keep learning and be kind." },
  { file: "/images/teodorico.png", name: "Teodorico, Joseph", role: "Class President", extra: ["Sportsfest Leader"], message: "Our performance at the Sportsfest — unforgettable!" },
  { file: "/images/viray.jpeg", name: "~ Viray, Sharol Marcuz A.", role: "Class Singer", extra: ["Cute"], message: "~Kung kupal ka, ganun talaga" },
  { file: "/images/kelvin.png", name: "Marmol, Mark Kelvin B.", role: "Student", extra: [], message: "Kunting bato, Kunting semento, Monumento." },
  { file: "/images/krysthal.png", name: "Fronda, Krysthal S.", role: "Student", extra: [], message: "Walang moto kasi kupal" },
  { file: "/images/lester.png", name: "De Leon, John Lester P.", role: "Student", extra: [], message: "Don't judge a bra by it's cover, Put your hands inside and discover" },
  { file: "/images/aj.png", name: "Esquillo, Juan Antonio B. ", role: "Student", extra: [], message: "Ang motto ko ay masubo nya to!" },
  { file: "/images/vistal.png", name: "Vistal, Justine", role: "Student", extra: [], message: "Kung ang kape ay matapang, Mas masarap ako!" },
  { file: "/images/justine.png", name: "Soguilon, Justin Rain ", role: "Student", extra: [], message: "Jabolll everyday!!" },
  { file: "/images/lyle.png", name: "Ababat, Lyle Quirzten ", role: "Student", extra: [], message: "Ang motto ko ay sana manalo sa lotto" },
  { file: "/images/gaco.png", name: "Gaco, John Mark ", role: "Student", extra: [], message: "mahal kita maging sino ka ba" },
  { file: "/images/jana.png", name: "Bunga, Princess Jana ", role: "Student", extra: [], message: "Let go, Let God!" },
  { file: "/images/semana.png", name: "Semana, Mark Joseph ", role: "Student", extra: [], message: "" },
  { file: "/images/yeo.png", name: "Yeo, Danielle ", role: "Student", extra: [], message: "" },
  { file: "/images/romano.png", name: "Romano, Princess ", role: "Student", extra: [], message: "Patience is a form of action" },
  { file: "/images/pacayra.png", name: "Pacayra, Princess ", role: "Student", extra: [], message: "" },
  { file: "/images/franco.png", name: "Franco, Frix B. ", role: "Student", extra: [], message: "" },
  { file: "/images/bunga.png", name: "Bunga, John Ronel ", role: "Student", extra: [], message: "wag kang titigil hanggat dika masarap" },
  { file: "/images/tolentino.png", name: "Tolentino, Rainell Christian ", role: "Student", extra: [], message: "Mataas tumalon, Malalim bumaon" },
  { file: "/images/amante.png", name: "Amante, Romemark ", role: "Student", extra: [], message: "" },
  { file: "/images/tikistikis.png", name: "Tikistikis, Jeffe ", role: "Student", extra: [], message: "" },
  { file: "/images/genavia.png", name: "Genavia, Keyzeal ", role: "Student", extra: [], message: "" },
  { file: "/images/secretario.png", name: "Secretario, Julius ", role: "Student", extra: [], message: "" },
  { file: "/images/lazam.png", name: "Lazam, Rhodney ", role: "Student", extra: [], message: "" },
  { file: "/images/valdemoro.png", name: "Valdemoro, Zaido ", role: "Student", extra: [], message: "Walang imposible, Basta hindi ako gagawa" },
  { file: "/images/fernandez.png", name: "Fernandez, Jheel ", role: "Student", extra: [], message: "Walang imposible, Basta hindi ako gagawa" },
  { file: "/images/timbal.png", name: "Timbal, Fernel Lexter F. ", role: "Student", extra: [], message: "Walang imposible, Basta hindi ako gagawa" },
  { file: "/images/terado.png", name: "Ace Dominic Saac Terrado", role: "Student", extra: [], message: "kunin mona ang lahat saakin wag lang ang aking pagkain" },
];

export default function ClassPage() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    // Update Firebase presence
    const username = localStorage.getItem('username');
    if (username && (window as any).firebase) {
      const db = (window as any).firebase.database();
      const userRef = db.ref('onlineUsers/' + username);
      userRef.set({
        name: username,
        page: 'class',
        time: Date.now()
      });
      userRef.onDisconnect().remove();
    }
  }, []);

  const openModal = (person: Person) => {
    setSelectedPerson(person);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8"
      style={{
        background: 'linear-gradient(to bottom, #ffecd2 0%, #fcb69f 100%)',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <h1 className="text-center text-4xl mb-10" style={{ color: '#e67e91', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        👨‍🏫 ICT 12-D Family
      </h1>

      <div 
        className="grid gap-6 w-full max-w-[1100px]"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
      >
        {people.map((person, index) => (
          <button
            key={index}
            onClick={() => openModal(person)}
            className="rounded-2xl p-3 text-center transition-all duration-300 outline-none"
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.4)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            <img
              src={person.file}
              alt={person.name}
              className="w-full h-40 object-cover rounded-xl mb-2.5 transition-all duration-500"
              style={{
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                filter: 'sepia(0.4) grayscale(0.2)',
                border: '3px solid white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.borderColor = '#fff0f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'sepia(0.4) grayscale(0.2)';
                e.currentTarget.style.borderColor = 'white';
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="%23ffecd2"><rect width="160" height="160"/><text x="50%" y="50%" text-anchor="middle" fill="%23e67e91" font-size="12">${person.name.charAt(0)}</text></svg>`;
              }}
            />
            <p className="font-bold text-gray-600 text-sm capitalize m-0 select-none">{person.name}</p>
          </button>
        ))}
      </div>

      <Link
        to="/login"
        className="mt-10 px-7 py-3 rounded-3xl text-white text-lg font-semibold transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #e67e91, #ffb6c1)',
          boxShadow: '0 5px 15px rgba(230, 126, 145, 0.4)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ⬅ Back to Home
      </Link>

      {/* Modal */}
      {selectedPerson && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[2000]"
          style={{ 
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            animation: 'fadeIn 0.4s ease'
          }}
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-[760px] rounded-[20px] p-6 flex gap-5 items-start relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(219, 6, 138, 0.95), rgba(83, 83, 83, 0.9))',
              color: '#f5f5f5',
              boxShadow: '0 0 25px rgba(7, 7, 7, 0.35)',
              border: '2px solid transparent',
              animation: 'popIn 0.6s ease forwards'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 w-[260px] h-[260px] rounded-[14px] overflow-hidden" style={{ boxShadow: '0 0 20px rgba(162, 103, 255, 0.5)' }}>
              <img 
                src={selectedPerson.file} 
                alt={selectedPerson.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" fill="%23444"><rect width="260" height="260"/><text x="50%" y="50%" text-anchor="middle" fill="%23fff" font-size="24">${selectedPerson.name.charAt(0)}</text></svg>`;
                }}
              />
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-[22px] m-0" style={{ color: 'rgb(226, 230, 0)' }}>{selectedPerson.name}</h2>
              <p className="text-gray-300">{selectedPerson.role}</p>
              {selectedPerson.extra.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedPerson.extra.map((ext, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs bg-white/20">{ext}</span>
                  ))}
                </div>
              )}
              <p className="mt-2 leading-relaxed text-gray-200 italic">{selectedPerson.message || 'No message yet...'}</p>
              
              <button
                onClick={closeModal}
                className="mt-auto px-5 py-2.5 rounded-[15px] border-none cursor-pointer font-bold transition-all duration-300 self-start"
                style={{
                  background: 'linear-gradient(90deg, #FFD700, #DAA520)',
                  color: 'rgb(219, 0, 121)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        @media (max-width: 720px) {
          h1 { font-size: 28px !important; margin-bottom: 25px !important; }
          .grid { grid-template-columns: repeat(3, 1fr) !important; gap: 12px !important; }
          button { padding: 8px !important; border-radius: 12px !important; }
          button img { height: 100px !important; border-radius: 8px !important; border-width: 2px !important; }
          button p { font-size: 11px !important; }
          .max-w-\[760px\] { flex-direction: column !important; align-items: center !important; padding: 20px !important; }
          .flex-shrink-0 { flex: none !important; width: 200px !important; height: 200px !important; }
          a { margin-top: 25px !important; padding: 10px 22px !important; font-size: 15px !important; }
        }
        @media (max-width: 400px) {
          .grid { grid-template-columns: repeat(2, 1fr) !important; }
          button img { height: 120px !important; }
        }
      `}</style>
    </div>
  );
}
