import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function CyberDuels() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        level: 1,
        xp: 0,
        isPremium: false,
        duelRating: 1000,
        duelWins: 0,
        duelLosses: 0
    });

    const [activeQueue, setActiveQueue] = useState(false);
    const [queueTime, setQueueTime] = useState(0);

    useEffect(() => {
        let timer;
        if (activeQueue) {
            timer = setInterval(() => {
                setQueueTime(prev => prev + 1);
            }, 1000);
        } else {
            setQueueTime(0);
        }
        return () => clearInterval(timer);
    }, [activeQueue]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUser(prev => ({
                            ...prev,
                            ...data,
                            duelRating: data.duelRating ?? 1000,
                            duelWins: data.duelWins ?? 0,
                            duelLosses: data.duelLosses ?? 0,
                        }));
                    }
                } catch (error) {
                    console.error("Error loading profile:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleStartMatchmaking = () => {
        setActiveQueue(!activeQueue);
    };

    const handlePlayWithAI = () => {
        alert("Initializing training sequence against AI...");
    };

    const currentLevel = Math.floor(user.xp / 500) + 1;
    const currentMaxXp = currentLevel * 500;

    return (
        <div className="dashboard-page" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.4s' }}>
            <header className="header">
                <div className="logo" onClick={() => navigate('/courses')} style={{ cursor: 'pointer' }}>
                    <img src="icons/icon.svg" alt="Icon" className="logo-icon" />
                    <span className="logo-text">learntocode</span>
                </div>

                <div className="user-profile" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                    <div className="user-info">
                        <span className="user-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {user.name}
                            {user?.isPremium && (
                                <img src="icons/crowngold.svg" alt="Premium" style={{ width: '18px', height: '18px' }} title="Premium Member" />
                            )}
                        </span>
                        <span className="user-rank">Level {currentLevel} - {user.xp}/{currentMaxXp} XP</span>
                    </div>
                    <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={user.photoURL || "icons/profile icon.svg"}
                            alt="Avatar"
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </header>

            <main className="dashboard-container">
                <section className="courses-content">
                    <nav className="content-tabs">
                        <button className="tab-btn" onClick={() => navigate('/courses')}>Courses</button>
                        <button className="tab-btn active">Cyber Duels</button>
                        <button className="tab-btn" onClick={() => navigate('/challenges')}>Challenges</button>
                    </nav>

                    <header className="content-header">
                        <h2 className="main-title">Cyber Battle Arena</h2>
                        <p className="main-subtitle">Compete with other hackers in real-time or train against AI</p>
                    </header>

                    <div className="challenges-grid" style={{ marginTop: '20px' }}>
                        <article className="challenge-card" onClick={handleStartMatchmaking}>
                            <div className="challenge-header">
                                <div className="challenge-icon-wrapper" style={{ border: activeQueue ? '1px solid #22c55e' : 'none' }}>
                                    <span style={{ fontSize: '24px' }}>{activeQueue ? '📡' : '⚔️'}</span>
                                </div>
                                <div className="challenge-title-group">
                                    <h3>{activeQueue ? 'Searching for Opponent...' : 'Find Random Duel'}</h3>
                                    <span className="difficulty beginner" style={{ color: activeQueue ? '#ffca2c' : '#22c55e' }}>
                                        {activeQueue ? `In queue: ${queueTime}s` : 'Online Ranked'}
                                    </span>
                                </div>
                            </div>
                            <p className="challenge-desc">
                                <span className="desc-label">Description:</span> Match with a random opponent of your skill level. Architect and Attacker roles are assigned randomly.
                            </p>
                            <button className="btn-start" style={{ background: activeQueue ? '#ff4b4b' : '#22c55e', color: '#040a10' }}>
                                {activeQueue ? 'Cancel Search' : 'Enter Arena'}
                            </button>
                        </article>

                        <article className="challenge-card" onClick={handlePlayWithAI}>
                            <div className="challenge-header">
                                <div className="challenge-icon-wrapper">
                                    <span style={{ fontSize: '24px' }}>🤖</span>
                                </div>
                                <div className="challenge-title-group">
                                    <h3>Practice vs AI</h3>
                                    <span className="difficulty intermediate">Training Mode</span>
                                </div>
                            </div>
                            <p className="challenge-desc">
                                <span className="desc-label">Description:</span> Hone your security or hacking skills without risking your rating. Perfect for testing new defensive validations.
                            </p>
                            <button className="btn-start">Start Training</button>
                        </article>
                    </div>
                </section>

                <aside className="dashboard-sidebar">
                    <section className="sidebar-box dragon-card">
                        <h3 className="sidebar-title">Your Combat Stats</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                                <span style={{ color: '#94a3b8' }}>ELO Rating:</span>
                                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>⚡ {user.duelRating}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                                <span style={{ color: '#94a3b8' }}>Wins:</span>
                                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{user.duelWins}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                                <span style={{ color: '#94a3b8' }}>Losses:</span>
                                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{user.duelLosses}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                                <span style={{ color: '#94a3b8' }}>Win Rate:</span>
                                <span style={{ color: '#ffca2c', fontWeight: 'bold' }}>
                                    {user.duelWins + user.duelLosses > 0
                                        ? `${Math.round((user.duelWins / (user.duelWins + user.duelLosses)) * 100)}%`
                                        : '0%'}
                                </span>
                            </div>
                        </div>
                    </section>
                </aside>
            </main>
        </div>
    );
}

export default CyberDuels;