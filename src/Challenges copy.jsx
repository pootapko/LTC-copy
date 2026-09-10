import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const dragonImages = [
    'img/egg.png',
    'img/cracked.png',
    'img/hatched_egg.png',
    'img/hatched.png',
    'img/teenage.png',
    'img/grown dragon.png'
];

const COURSES_METADATA = {
    "python-beginner": { totalLessons: 12 },
    "backend-dev": { totalLessons: 24 },
    "cyber-security": { totalLessons: 18 },
    "cpp-advanced": { totalLessons: 20 }
};

function Courses() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        level: 1,
        xp: 0,
        maxXp: 10000,
        streak: 0,
        progress: "0/12",
        achievements: 0,
        stars: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    const [leaderboard, setLeaderboard] = useState([]);

    const currentLevel = Math.floor(user.xp / 500) + 1;
    const currentMaxXp = currentLevel * 500;

    let stageIndex = 0;
    let stageName = "Egg";

    if (user.xp < 500) {
        stageIndex = 0;
        stageName = "egg";
    } else if (user.xp < 2000) {
        stageIndex = 1;
        stageName = "cracked egg";
    } else if (user.xp < 4000) {
        stageIndex = 2;
        stageName = "hatched";
    } else if (user.xp < 7000) {
        stageIndex = 3;
        stageName = "baby";
    } else if (user.xp < 10000) {
        stageIndex = 4;
        stageName = "teen";
    } else {
        stageIndex = 5;
        stageName = "adult";
    }

    const currentDragonImage = dragonImages[stageIndex];

    const xpThresholds = [0, 500, 2000, 4000, 7000, 10000];
    let growthPercentage = 100;
    let xpRemaining = 0;

    if (stageIndex < 5) {
        const currentFloor = xpThresholds[stageIndex];
        const nextGoal = xpThresholds[stageIndex + 1];
        const xpInCurrentStage = user.xp - currentFloor;
        const xpNeededForNextStage = nextGoal - currentFloor;

        growthPercentage = Math.max(0, Math.min(100, Math.round((xpInCurrentStage / xpNeededForNextStage) * 100)));
        xpRemaining = nextGoal - user.xp;
    }

    const completedCount = (user.completedLessons || []).length;

    const totalLessonsInStarted = (user.startedCourses || []).reduce((sum, courseId) => {
        const courseInfo = COURSES_METADATA[courseId];
        return sum + (courseInfo ? courseInfo.totalLessons : 0);
    }, 0);

    const displayProgress = totalLessonsInStarted > 0
        ? `${completedCount}/${totalLessonsInStarted}`
        : "0/0";

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(6));
                const querySnapshot = await getDocs(q);

                const topUsers = [];
                querySnapshot.forEach((doc) => {
                    topUsers.push({ id: doc.id, ...doc.data() });
                });

                setLeaderboard(topUsers);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {

                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUser((prevUser) => ({
                            ...prevUser,
                            ...docSnap.data()
                        }));
                    }


                    await fetchLeaderboard();

                } catch (error) {
                    console.error("Помилка завантаження даних:", error);
                } finally {

                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);




    return (
        <div
            className="dashboard-page"
            style={{
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.4s ease-in-out'
            }}
        >
            <header className="header">
                <div className="logo" style={{ cursor: 'pointer' }}>
                    <img src="icons/icon.svg" alt="Icon" className="logo-icon" />
                    <span className="logo-text">learntocode</span>
                </div>

                <div className="user-profile" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                    <div className="user-info">
                        <span className="user-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {user.name}

                            {user?.isPremium && (
                                <img
                                    src="icons/crowngold.svg"
                                    alt="Premium"
                                    style={{ width: '18px', height: '18px' }}
                                    title="Premium Member"
                                />
                            )}
                        </span>
                        <span className="user-rank">Level {currentLevel} - {user.xp}/{currentMaxXp} XP</span>
                    </div>
                    <div className="user-avatar">
                        <img src="icons/profile icon.svg" alt="Avatar" />
                    </div>
                </div>
            </header>

            <main
                className="dashboard-container"
            >
                <section className="courses-content">
                    <nav className="content-tabs">
                        <button className="tab-btn">Courses</button>
                        <button className="tab-btn active" onClick={() => navigate('/challenges')}>Challenges</button>
                    </nav>



                    <header className="content-header">
                        <h2 className="main-title">Available Courses</h2>
                        <p className="main-subtitle">Choose your learning path and start your journey</p>
                    </header>

                    <div className="courses-list">
                        <CourseCard
                            title="Python Web Developer Beginner Course"
                            badgeText="Free" badgeType="free"
                            description="Learn Python fundamentals and build your first web applications."
                            meta="12 lessons • Beginner"
                            status="active"
                        />

                        <CourseCard
                            title="Full Backend Developer Course"
                            badgeText="Premium" badgeType="premium"
                            description="Master server-side development with Node.js, databases, and APIs."
                            meta="24 lessons • Intermediate"
                            status={user.isPremium ? "active" : "locked"}
                        />

                        <CourseCard
                            title="Cybersecurity Analyst Course"
                            badgeText="Premium" badgeType="premium"
                            description="Learn ethical hacking, network security, and threat detection."
                            meta="18 lessons • Advanced"
                            status={user.isPremium ? "active" : "locked"}
                            isHighlight={true}
                        />

                        <CourseCard
                            title="C++ Programming Course"
                            badgeText="Premium" badgeType="premium"
                            description="Deep dive into C++ for systems programming and performance."
                            meta="20 lessons • Advanced"
                            status={user.isPremium ? "active" : "locked"}
                        />
                    </div>
                </section>

                <aside className="dashboard-sidebar">


                    {!isLoading && !user?.isPremium && (
                        <section className="sidebar-box " style={{
                            border: '1px solid #ff4c4c',
                            background: 'linear-gradient(180deg, rgba(255, 76, 76, 0.1) 0%, rgba(255, 76, 76, 0.02) 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                            fontFamily: 'Outfit, sans-serif'
                        }}>

                            <h3 className="sidebar-title" style={{ color: '#ff4c4c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src="icons/crown-1-svgrepo-com.svg" alt="Crown" style={{ width: '24px', height: '24px' }} />
                                Go Premium
                            </h3>
                            <p style={{ color: '#a0a0a0', fontSize: '14px', marginBottom: '16px', lineHeight: '1.4' }}>
                                Unlock all courses, exclusive content, and more!
                            </p>
                            <button
                                onClick={() => navigate('/premium')}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#ff4c4c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 15px rgba(255, 76, 76, 0.7), 0 0 30px rgba(255, 76, 76, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 76, 76, 0.9), 0 0 40px rgba(255, 76, 76, 0.6)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 76, 76, 0.7), 0 0 30px rgba(255, 76, 76, 0.4)'}
                            >
                                Upgrade Now
                            </button>
                        </section>
                    )}

                    <section className="sidebar-box dragon-card">
                        <h3 className="sidebar-title">Your Dragon</h3>
                        <div className="dragon-container">
                            <img src={currentDragonImage} alt={stageName} className="dragon-main-img" id="dragon-img" />
                        </div>
                        <div className="dragon-info">
                            <div className="growth-row">
                                <span>Growth</span>
                                <span className="growth-val">{growthPercentage}%</span>
                            </div>
                            <div className="growth-track">
                                <div className="growth-fill" style={{ width: `${growthPercentage}%` }}></div>
                            </div>
                            <div className="stage-badge">
                                Stage: <span className="stage-type">{stageName}</span>
                            </div>

                            {stageIndex < 5 ? (
                                <div className="xp-hint" style={{ textAlign: 'center', fontSize: '12px', color: '#a0a0a0', marginTop: '8px' }}>
                                    {xpRemaining} XP to next stage
                                </div>
                            ) : (
                                <div className="xp-hint" style={{ textAlign: 'center', fontSize: '12px', color: '#00ff88', marginTop: '8px' }}>
                                    Maximum evolution!
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="sidebar-box stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon-wrap"><img src="img/strike.png" alt="Streak" className="stat-icon-img" /></div>
                            <div className="stat-details">
                                <span className="stat-label">Streak</span>
                                <span className="stat-value">{user.streak} days</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon-wrap"><img src="img/progress.png" alt="Progress" className="stat-icon-img" /></div>
                            <div className="stat-details">
                                <span className="stat-label">Progress</span>
                                <span className="stat-value">{displayProgress}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon-wrap"><img src="img/achievements.png" alt="Achievements" className="stat-icon-img" /></div>
                            <div className="stat-details">
                                <span className="stat-label">Achievements</span>
                                <span className="stat-value">{user.achievements}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon-wrap"><img src="img/star.png" alt="Stars" className="stat-icon-img" /></div>
                            <div className="stat-details">
                                <span className="stat-label">Stars</span>
                                <span className="stat-value">{user.stars || 0}</span>
                            </div>
                        </div>
                    </section>

                    <section className="sidebar-box leaderboard-card">
                        <div className="leaderboard-header">
                            <img src="img/leaderboard.png" alt="Leaderboard" className="title-icon" />
                            <h3 className="sidebar-title">Leaderboard</h3>
                            <span className="see-all-link">SEE ALL</span>
                        </div>

                        <div className="leaderboard-list">
                            {leaderboard.map((lbUser, index) => {
                                const lbLevel = Math.floor((lbUser.xp || 0) / 500) + 1;
                                let iconContent;
                                if (index === 0) {
                                    iconContent = <img src="img/gold medal.png" alt="Gold" className="medal-icon" />;
                                } else if (index === 1) {
                                    iconContent = <img src="img/silver medal.png" alt="Silver" className="medal-icon" />;
                                } else if (index === 2) {
                                    iconContent = <img src="img/bronze medal.png" alt="Bronze" className="medal-icon" />;
                                } else {
                                    iconContent = <span className="rank-number">#{index + 1}</span>;
                                }

                                return (
                                    <div className="leaderboard-row" key={lbUser.id}>
                                        <div className="icon-container">{iconContent}</div>
                                        <div className="user-meta">
                                            <span className="user-name">{lbUser.name}</span>
                                            <span className="user-level">Level {lbLevel}</span>
                                        </div>
                                        <span className="xp-value">{lbUser.xp || 0} XP</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="sidebar-box achievements-card">
                        <h3 className="sidebar-title">Your Achievements</h3>
                        <div className="achievements-grid">
                            <div className="achievement-item locked">
                                <img src="img/Consistent Coder.png" alt="Consistent Coder" className="achievement-icon" />
                                <div className="achievement-tooltip">Log in and code for 7 days in a row</div>
                            </div>
                            <div className="achievement-item locked">
                                <img src="img/Night Owl.png" alt="Night Owl" className="achievement-icon" />
                                <div className="achievement-tooltip">Complete a lesson between 12 AM and 4 AM</div>
                            </div>
                            <div className="achievement-item locked">
                                <img src="img/Pixel Perfect.png" alt="Pixel Perfect" className="achievement-icon" />
                                <div className="achievement-tooltip">Complete the CSS grid module without errors</div>
                            </div>
                            <div className="achievement-item locked">
                                <img src="img/Bug Hunter.png" alt="Bug Hunter" className="achievement-icon" />
                                <div className="achievement-tooltip">Find and fix 10 vulnerabilities in the practice lab</div>
                            </div>
                            <div className="achievement-item locked">
                                <img src="img/Dragon Whisperer.png" alt="Dragon Whisperer" className="achievement-icon" />
                                <div className="achievement-tooltip">Grow your dragon to the maximum stage</div>
                            </div>
                            <div className="achievement-item locked">
                                <img src="img/Deep Learner.png" alt="Deep Learner" className="achievement-icon" />
                                <div className="achievement-tooltip">Finish the Advanced C++ Programming Course</div>
                            </div>
                        </div>
                    </section>
                </aside>
            </main>
        </div>
    );
}

export default Courses;