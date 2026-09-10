import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

const dragonImages = [
    'img/egg.png',
    'img/cracked.png',
    'img/hatched_egg.png',
    'img/hatched.png',
    'img/teenage.png',
    'img/grown dragon.png'
];

const COURSES_METADATA = {
    "python-programming": { totalLessons: 20 },
    // "backend-dev": { totalLessons: 24 },
    "cybersecurity": { totalLessons: 20 },
    "cpp-advanced": { totalLessons: 42 }
};

const CHALLENGE_MAPPING = {
    hello_world: "hello_world",
    perfectionist: "quiz_master",
    double_scholar: "polyglot",
    streak_survivor: "streak_warrior",
    cpp_architect: "architect",
    cyber_guardian: "cyber_sentinel"
};

function Dashboard() {
    const navigate = useNavigate();

    const location = useLocation();
    const isChallenges = location.pathname === '/challenges';

    const [user, setUser] = useState({
        name: "",
        level: 1,
        xp: 0,
        maxXp: 10000,
        streak: 0,
        progress: "0/12",
        achievements: 0,
        stars: 0,
        isPremium: false
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
                        const data = docSnap.data();
                        setUser((prevUser) => ({
                            ...prevUser,
                            ...data,
                            isPremium: data.isPremium ?? false,
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
                    <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={user.photoURL || "icons/profile icon.svg"}
                            alt="Avatar"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </header>

            <main
                className="dashboard-container"
            >

                <section className="courses-content">
                    <nav className="content-tabs">
                        <button
                            className={`tab-btn ${!isChallenges ? 'active' : ''}`}
                            onClick={() => navigate('/courses')}
                        >Courses</button>

                        <button
                            className={`tab-btn ${isChallenges ? 'active' : ''}`}
                            onClick={() => navigate('/challenges')}
                        >Challenges</button>
                    </nav>

                    <header className="content-header">
                        <h2 className="main-title">
                            {isChallenges ? "Learning Path" : "Available Courses"}
                        </h2>
                        <p className="main-subtitle">
                            {isChallenges
                                ? "Complete challenges to earn XP and unlock new content"
                                : "Choose your learning path and start your journey"}
                        </p>
                    </header>

                    {!isChallenges ? (
                        <div className="courses-list">
                            <CourseCard
                                title="Python: Data, Automation & AI"
                                badgeText="Free" badgeType="free"
                                description="Learn Python fundamentals and build your first web applications."
                                meta="20 lessons • Beginner"
                                status="active"
                                courseId="python-programming"
                            />


                            <CourseCard
                                title="Cybersecurity: Offense, Defense & Cryptography"
                                badgeText="Premium" badgeType="premium"
                                description="Learn ethical hacking, network security, and threat detection."
                                meta="20 lessons • Advanced"
                                status={user.isPremium ? "active" : "locked"}
                                isHighlight={true}
                                courseId="cybersecurity"
                            />

                            <CourseCard
                                title="C++ Programming: Core & Security"
                                badgeText="Premium" badgeType="premium"
                                description="Deep dive into C++ for systems programming and performance."
                                meta="42 lessons • Advanced"
                                status={user.isPremium ? "active" : "locked"}
                                courseId="cpp-advanced"
                            />

                            {/* <CourseCard
                                title="Full Backend Developer Course"
                                badgeText="Premium" badgeType="premium"
                                description="Master server-side development with Node.js, databases, and APIs."
                                meta="24 lessons • Intermediate"
                                status={user.isPremium ? "active" : "locked"}
                                courseId="backend-dev"
                            /> */}

                        </div>
                    ) : (
                        <div className="challenges-grid">
                            {/* 1. Hello World! */}
                            <article className={`challenge-card ${user.achievements && user.achievements.includes(CHALLENGE_MAPPING.hello_world) ? 'unlocked' : 'locked'}`}>
                                <div className="challenge-header">
                                    <div className="challenge-icon-wrapper">
                                        <img src="img/locked.png" alt="Locked" className="icon-locked" />
                                        <img src="img/unlocked.png" alt="Hello World" className="icon-unlocked" />
                                    </div>
                                    <div className="challenge-title-group">
                                        <h3>Hello World!</h3>
                                        <span className="difficulty beginner">Beginner</span>
                                    </div>
                                </div>
                                <p className="challenge-desc">
                                    <span className="desc-label">How to pass:</span> Successfully finish all lessons and the final assignment of any course.
                                </p>
                                <div className="challenge-reward">
                                    <span className="reward-label">Reward:</span> 250 XP.
                                </div>
                            </article>

                            {/* 2. The Perfectionist */}
                            <article className={`challenge-card ${user.achievements && user.achievements.includes(CHALLENGE_MAPPING.perfectionist) ? 'unlocked' : 'locked'}`}>
                                <div className="challenge-header">
                                    <div className="challenge-icon-wrapper">
                                        <img src="img/locked.png" alt="Locked" className="icon-locked" />
                                        <img src="img/unlocked.png" alt="The Perfectionist" className="icon-unlocked" />
                                    </div>
                                    <div className="challenge-title-group">
                                        <h3>The Perfectionist</h3>
                                        <span className="difficulty beginner">Beginner</span>
                                    </div>
                                </div>
                                <p className="challenge-desc">
                                    <span className="desc-label">How to pass:</span> Answer every question correctly in a quiz or final module test without using any hints.
                                </p>
                                <div className="challenge-reward">
                                    <span className="reward-label">Reward:</span> 100 XP + 1 Star.
                                </div>
                            </article>

                            {/* 3. Double Scholar */}
                            <article className={`challenge-card ${user.achievements && user.achievements.includes(CHALLENGE_MAPPING.double_scholar) ? 'unlocked' : 'locked'}`}>
                                <div className="challenge-header">
                                    <div className="challenge-icon-wrapper">
                                        <img src="img/locked.png" alt="Locked" className="icon-locked" />
                                        <img src="img/unlocked.png" alt="Double Scholar" className="icon-unlocked" />
                                    </div>
                                    <div className="challenge-title-group">
                                        <h3>Double Scholar</h3>
                                        <span className="difficulty advanced">Advanced</span>
                                    </div>
                                </div>
                                <p className="challenge-desc">
                                    <span className="desc-label">How to pass:</span> Complete 100% of the curriculum for any two different courses in the "Available Courses" section.
                                </p>
                                <div className="challenge-reward">
                                    <span className="reward-label">Reward:</span> 500 XP + Achievement.
                                </div>
                            </article>

                            {/* 4. Streak Survivor */}
                            <article className={`challenge-card ${user.achievements && user.achievements.includes(CHALLENGE_MAPPING.streak_survivor) ? 'unlocked' : 'locked'}`}>
                                <div className="challenge-header">
                                    <div className="challenge-icon-wrapper">
                                        <img src="img/locked.png" alt="Locked" className="icon-locked" />
                                        <img src="img/unlocked.png" alt="Streak Survivor" className="icon-unlocked" />
                                    </div>
                                    <div className="challenge-title-group">
                                        <h3>Streak Survivor</h3>
                                        <span className="difficulty intermediate">Intermediate</span>
                                    </div>
                                </div>
                                <p className="challenge-desc">
                                    <span className="desc-label">How to pass:</span> Maintain a 14-day learning streak. Log in and complete at least one lesson or challenge for 14 consecutive days.
                                </p>
                                <div className="challenge-reward">
                                    <span className="reward-label">Reward:</span> 200 XP + Streak multiplier.
                                </div>
                            </article>

                            {/* 5. C++ Architect */}
                            <article className={`challenge-card ${user.achievements && user.achievements.includes(CHALLENGE_MAPPING.cpp_architect) ? 'unlocked' : 'locked'}`}>
                                <div className="challenge-header">
                                    <div className="challenge-icon-wrapper">
                                        <img src="img/locked.png" alt="Locked" className="icon-locked" />
                                        <img src="img/unlocked.png" alt="C++ Architect" className="icon-unlocked" />
                                    </div>
                                    <div className="challenge-title-group">
                                        <h3>C++ Architect</h3>
                                        <span className="difficulty beginner">Beginner</span>
                                    </div>
                                </div>
                                <p className="challenge-desc">
                                    <span className="desc-label">How to pass:</span> Solve a practical task in the C++ Course that requires building a system with multiple classes and operator overloading.
                                </p>
                                <div className="challenge-reward">
                                    <span className="reward-label">Reward:</span> 400 XP + "Code Architect" Badge.
                                </div>
                            </article>

                            {/* 6. Cyber Guardian */}
                            <article className={`challenge-card ${user.achievements && user.achievements.includes(CHALLENGE_MAPPING.cyber_guardian) ? 'unlocked' : 'locked'}`}>
                                <div className="challenge-header">
                                    <div className="challenge-icon-wrapper">
                                        <img src="img/locked.png" alt="Locked" className="icon-locked" />
                                        <img src="img/unlocked.png" alt="Cyber Guardian" className="icon-unlocked" />
                                    </div>
                                    <div className="challenge-title-group">
                                        <h3>Cyber Guardian</h3>
                                        <span className="difficulty beginner">Beginner</span>
                                    </div>
                                </div>
                                <p className="challenge-desc">
                                    <span className="desc-label">How to pass:</span> Complete a "Bug Hunt" challenge by finding security flaws like SQL injection or weak encryption.
                                </p>
                                <div className="challenge-reward">
                                    <span className="reward-label">Reward:</span> 450 XP + "Security Specialist".
                                </div>
                            </article>
                        </div>
                    )}
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
                                <span className="stat-value">{Array.isArray(user.achievements) ? user.achievements.length : (user.achievements ?? 0)}</span>
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

export default Dashboard;