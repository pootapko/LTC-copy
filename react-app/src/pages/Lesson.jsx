import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import coursesDB from '../data/courseData';
import './Lesson.css';

// ─────────────────────────────────────────────
// КОНФІГУРАЦІЯ
// ─────────────────────────────────────────────
const CONFIG = {
    xpPerLesson: 50,
    xpPerPerfectQuiz: 100,
    xpPerAchievement: {
        hello_world: 250,
        architect: 500,
        deep_learner: 1000,
        speed_runner: 300,
        streak_warrior: 400,
        quiz_master: 600,
        cyber_sentinel: 750,
        polyglot: 800,
        night_owl: 200,
        completionist: 1500,
    },
    xpPerLevel: 500,
    streakResetHours: 48,
    streakIncrementHours: 24,
    starsPerAchievement: 1,
    starsPerPerfectQuiz: 1,
};

const COURSE_META = {
    'cpp-advanced': { label: 'C++', color: '#4fc3f7', icon: '⚙️' },
    'cybersecurity': { label: 'Cybersecurity', color: '#e84040', icon: '🔐' },
    'python-programming': { label: 'Python', color: '#f5a623', icon: '🐍' },
};



const ACHIEVEMENTS_DEF = {
    hello_world: { icon: '👋', title: 'Hello World!', desc: 'Complete your very first lesson' },
    speed_runner: { icon: '⚡', title: 'Speed Runner', desc: 'Ace a quiz in under 2 minutes' },
    streak_warrior: { icon: '🔥', title: 'Streak Warrior', desc: 'Maintain a 7-day learning streak' },
    quiz_master: { icon: '🎯', title: 'Quiz Master', desc: 'Ace every quiz in any course' },
    night_owl: { icon: '🦉', title: 'Night Owl', desc: 'Study between midnight and 4 AM' },
    polyglot: { icon: '🌐', title: 'Polyglot', desc: 'Complete lessons in 2 different courses' },
    architect: { icon: '🏗️', title: 'C++ Architect', desc: 'Complete all OOP lessons in C++' },
    deep_learner: { icon: '🧠', title: 'Deep Learner', desc: 'Complete all 15 C++ lessons' },
    cyber_sentinel: { icon: '🛡️', title: 'Cyber Sentinel', desc: 'Complete 10 cybersecurity lessons' },
    completionist: { icon: '🏆', title: 'Completionist', desc: 'Complete all 20 cybersecurity lessons' },
};

const DEFAULT_STATS = {
    xp: 0, level: 1, stars: 0, streak: 1,
    lastActivity: new Date().toISOString(),
    completedLessons: {},
    perfectQuizzes: {},
    achievements: [],
    totalTimeSpent: 0,
    quizAttempts: {},
};

// ─────────────────────────────────────────────
// ЧИСТІ УТИЛІТИ (без стану)
// ─────────────────────────────────────────────
function xpForLevel(level) {
    return level * CONFIG.xpPerLevel;
}

function calculateTimeBonus(estimatedTime) {
    const m = parseInt(estimatedTime) || 0;
    if (m >= 70) return 25;
    if (m >= 60) return 15;
    if (m >= 50) return 10;
    return 0;
}

/** Чистий розрахунок нового xp/level — без side-effects */
function computeXP(currentXP, currentLevel, amount) {
    let xp = currentXP + amount;
    let level = Math.floor(xp / CONFIG.xpPerLevel) + 1;
    return { xp, level };
}

/** Чистий розрахунок streak — без side-effects */
function computeStreak(lastActivity, currentStreak) {
    const now = new Date();
    const last = new Date(lastActivity || now);
    const diffH = (now - last) / (1000 * 60 * 60);
    let streak = currentStreak;
    let reset = false;
    let weekHit = false;

    if (diffH > CONFIG.streakResetHours) {
        streak = 1;
        reset = true;
    } else if (diffH >= CONFIG.streakIncrementHours) {
        streak += 1;
        if (streak % 7 === 0) weekHit = true;
    }
    return { streak, lastActivity: now.toISOString(), reset, weekHit };
}


function findNewAchievements(s, cId) {
    const unlocked = Array.isArray(s.achievements) ? s.achievements : [];
    const candidates = [];

    const checks = {
        hello_world: () => Object.values(s.completedLessons).flat().length >= 1,
        streak_warrior: () => s.streak >= 7,
        quiz_master: () => {
            for (const id in s.perfectQuizzes) {
                const course = coursesDB[id];
                if (course && (s.perfectQuizzes[id] || []).length >= course.modules.length) return true;
            }
            return false;
        },
        night_owl: () => { const h = new Date().getHours(); return h >= 0 && h < 4; },
        polyglot: () => Object.keys(s.completedLessons).filter(id => (s.completedLessons[id] || []).length > 0).length >= 2,
        architect: () => [10, 11, 12].every(id => (s.completedLessons['cpp-advanced'] || []).includes(id)),
        deep_learner: () => (s.completedLessons['cpp-advanced'] || []).length >= 15,
        cyber_sentinel: () => (s.completedLessons['cybersecurity'] || []).length >= 10,
        completionist: () => (s.completedLessons['cybersecurity'] || []).length >= 20,
    };

    for (const [id, check] of Object.entries(checks)) {
        if (!unlocked.includes(id) && check()) candidates.push(id);
    }
    return candidates;
}

// ─────────────────────────────────────────────
// КОМПОНЕНТ
// ─────────────────────────────────────────────
function Lesson() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [uid, setUid] = useState(null);
    const [stats, setStats] = useState(DEFAULT_STATS);
    const statsRef = useRef(DEFAULT_STATS);

    // Bug 2 fix: courseId comes from URL ?course=cpp-advanced
    const urlCourseId = searchParams.get('course');

    const [courseId, setCourseId] = useState(
        urlCourseId && coursesDB[urlCourseId] ? urlCourseId : 'cpp-advanced'
    );
    const [moduleIdx, setModuleIdx] = useState(0);
    const [lessonIdx, setLessonIdx] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizStartTime, setQuizStartTime] = useState(null);
    const [quizTimeTaken, setQuizTimeTaken] = useState(0);   // ← фіксований час після сабміту

    const [toasts, setToasts] = useState([]);
    const [achievementModal, setAchievementModal] = useState(null);
    const [confetti, setConfetti] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Тримаємо ref актуальним
    useEffect(() => { statsRef.current = stats; }, [stats]);

    // ─────────────────────────────────────────────
    // AUTH + FIRESTORE LOAD
    // ─────────────────────────────────────────────
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) { navigate('/login'); return; }
            setUid(user.uid);

            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists()) {
                    const d = snap.data();
                    if (Array.isArray(d.completedLessons)) {
                        d.completedLessons = { 'cpp-advanced': d.completedLessons };
                    }

                    let rawXP = d.xp ?? 0;
                    let rawLevel = Math.floor(rawXP / CONFIG.xpPerLevel) + 1;
                    let rawXPLeft = rawXP % CONFIG.xpPerLevel;

                    const loaded = {
                        ...DEFAULT_STATS,
                        xp: rawXPLeft,
                        level: rawLevel,
                        stars: d.stars ?? 0,
                        streak: d.streak ?? 1,
                        lastActivity: d.lastActivity ?? new Date().toISOString(),
                        completedLessons: d.completedLessons ?? {},
                        perfectQuizzes: d.perfectQuizzes ?? {},
                        achievements: d.achievements ?? [],
                        totalTimeSpent: d.totalTimeSpent ?? 0,
                        quizAttempts: d.quizAttempts ?? {},
                    };


                    const userIsPremium = d.isPremium ?? false;


                    const currentUrlCourse = searchParams.get('course');


                    if ((currentUrlCourse === 'cpp-advanced' || currentUrlCourse === 'cybersecurity') && !userIsPremium) {
                        alert("This course requires a Premium subscription!");
                        navigate('/courses');
                        return;
                    }

                    setStats(loaded);
                    statsRef.current = loaded;

                    const urlParam = searchParams.get('course');
                    if (!urlParam) {

                        if (d.lastCourseId === 'cpp-advanced' || d.lastCourseId === 'cybersecurity') {
                            if (!userIsPremium) {
                                setCourseId('python-programming');
                                return;
                            }
                        }
                        if (d.lastCourseId) setCourseId(d.lastCourseId);
                        if (d.lastModuleIdx != null) setModuleIdx(d.lastModuleIdx);
                        if (d.lastLessonIdx != null) setLessonIdx(d.lastLessonIdx);
                    }
                }
            } catch (e) {
                console.warn('[Lesson] Could not load user stats:', e);
            }
            setIsLoading(false);
        });
        return () => unsub();
    }, [navigate, searchParams]);

    // ─────────────────────────────────────────────
    // FIRESTORE SAVE — завжди поза setStats
    // ─────────────────────────────────────────────
    const saveToFirestore = useCallback(async (newStats, cId, mIdx, lIdx) => {
        if (!uid) return;
        try {
            await setDoc(doc(db, 'users', uid), {
                ...newStats,
                lastCourseId: cId,
                lastModuleIdx: mIdx,
                lastLessonIdx: lIdx,
                updatedAt: new Date().toISOString(),
            }, { merge: true });
        } catch (e) {
            console.warn('[Lesson] Firestore save error:', e);
        }
    }, [uid]);

    // ─────────────────────────────────────────────
    // TOAST
    // ─────────────────────────────────────────────
    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        setToasts(t => [...t, { id, message, type }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
    }, []);

    // ─────────────────────────────────────────────
    // ПОКАЗ АЧІВКИ
    // ─────────────────────────────────────────────
    const showAchievement = useCallback((id, delay = 0) => {
        const def = ACHIEVEMENTS_DEF[id];
        const bonusXP = CONFIG.xpPerAchievement[id] || 250;
        setTimeout(() => {
            setAchievementModal({ def, bonusXP });
            setTimeout(() => setAchievementModal(null), 6000);
        }, delay);
    }, []);

    // ─────────────────────────────────────────────
    // ЗАСТОСУВАННЯ СТАТИСТИКИ — чисто, поза setStats
    // Повертає новий об'єкт stats та список side-effects для виклику після
    // ─────────────────────────────────────────────
    const buildUpdatedStats = useCallback((prev, lessonOrNull, quizResult = null) => {
        let s = { ...prev };
        const sideEffects = []; // { type, payload }

        // ── Урок завершено ──
        if (lessonOrNull) {
            const { lesson, cId, timeBonus } = lessonOrNull;
            const alreadyDone = (s.completedLessons[cId] || []).includes(lesson.id);
            if (!alreadyDone) {
                s = {
                    ...s,
                    completedLessons: {
                        ...s.completedLessons,
                        [cId]: [...(s.completedLessons[cId] || []), lesson.id],
                    },
                };
                // Streak
                const sk = computeStreak(s.lastActivity, s.streak);
                s = { ...s, streak: sk.streak, lastActivity: sk.lastActivity };
                if (sk.reset) sideEffects.push({ type: 'toast', msg: '💔 Streak reset — let\'s build it back!', style: 'warning' });
                if (sk.weekHit) sideEffects.push({ type: 'toast', msg: `🔥 ${s.streak}-day streak!`, style: 'success' });

                // XP
                const xpGain = CONFIG.xpPerLesson + (timeBonus || 0);
                const prevLvl = s.level;
                const xp = computeXP(s.xp, s.level, xpGain);
                s = { ...s, ...xp };
                sideEffects.push({ type: 'toast', msg: `+${xpGain} XP — Lesson done!`, style: 'xp' });
                if (s.level > prevLvl) {
                    sideEffects.push({ type: 'toast', msg: `🚀 Level Up! ${prevLvl} → ${s.level}`, style: 'level-up' });
                    sideEffects.push({ type: 'confetti' });
                }
            }
        }

        // ── Квіз завершено ──
        if (quizResult) {
            const { cId, mIdx, moduleKey, isPerfect, isSpeedRun } = quizResult;
            const prevPerfect = s.perfectQuizzes[cId] || [];

            s = {
                ...s,
                quizAttempts: { ...s.quizAttempts, [moduleKey]: (s.quizAttempts[moduleKey] || 0) + 1 },
                perfectQuizzes: { ...s.perfectQuizzes, [cId]: (s.perfectQuizzes[cId] || []) },
            };

            if (isPerfect && !prevPerfect.includes(mIdx)) {
                const prevLvl = s.level;
                const xp = computeXP(s.xp, s.level, CONFIG.xpPerPerfectQuiz);
                s = {
                    ...s,
                    ...xp,
                    stars: s.stars + CONFIG.starsPerPerfectQuiz,
                    perfectQuizzes: { ...s.perfectQuizzes, [cId]: [...prevPerfect, mIdx] },
                };
                sideEffects.push({ type: 'toast', msg: `⭐ Perfect! +${CONFIG.xpPerPerfectQuiz} XP`, style: 'success' });
                if (s.level > prevLvl) {
                    sideEffects.push({ type: 'toast', msg: `🚀 Level Up! ${prevLvl} → ${s.level}`, style: 'level-up' });
                    sideEffects.push({ type: 'confetti' });
                }

                if (isSpeedRun && !s.achievements.includes('speed_runner')) {
                    s = {
                        ...s,
                        achievements: [...s.achievements, 'speed_runner'],
                        stars: s.stars + CONFIG.starsPerAchievement,
                        ...computeXP(s.xp, s.level, CONFIG.xpPerAchievement['speed_runner'] || 300),
                    };
                    sideEffects.push({ type: 'achievement', id: 'speed_runner', delay: 600 });
                }
            }
        }

        // ── Ачівки ──
        // ── Ачівки (З ВИПРАВЛЕННЯМ ТИПУ ДАНИХ) ──
        if (!Array.isArray(s.achievements)) {
            s.achievements = []; // Якщо там число 0 або undefined, примусово робимо масивом
        }

        const newAch = findNewAchievements(s, null);
        if (Array.isArray(newAch)) {
            newAch.forEach((id, i) => {
                const bonusXP = CONFIG.xpPerAchievement[id] || 250;
                const prevLvl = s.level;
                s = {
                    ...s,
                    achievements: [...s.achievements, id],
                    stars: s.stars + CONFIG.starsPerAchievement,
                    ...computeXP(s.xp, s.level, bonusXP),
                };
                sideEffects.push({ type: 'achievement', id, delay: i * 600 });
                if (s.level > prevLvl) sideEffects.push({ type: 'confetti' });
            });
        }

        return { newStats: s, sideEffects };
    }, []);

    /** Застосовує side-effects ПІСЛЯ setStats — без ant-pattern */
    const applyEffects = useCallback((effects) => {
        effects.forEach(e => {
            if (e.type === 'toast') showToast(e.msg, e.style);
            if (e.type === 'confetti') { setConfetti(true); setTimeout(() => setConfetti(false), 4000); }
            if (e.type === 'achievement') showAchievement(e.id, e.delay);
        });
    }, [showToast, showAchievement]);

    // ─────────────────────────────────────────────
    // ЗАВЕРШЕННЯ УРОКУ
    // ─────────────────────────────────────────────
    const handleCompleteLesson = useCallback((cId, mIdx, lIdx) => {
        const lesson = coursesDB[cId]?.modules[mIdx]?.lessons[lIdx];
        if (!lesson) return;

        const prev = statsRef.current;
        if ((prev.completedLessons[cId] || []).includes(lesson.id)) return; // вже виконано

        const { newStats, sideEffects } = buildUpdatedStats(prev, {
            lesson, cId,
            timeBonus: calculateTimeBonus(lesson.estimatedTime),
        });

        setStats(newStats);
        statsRef.current = newStats;
        applyEffects(sideEffects);
        saveToFirestore(newStats, cId, mIdx, lIdx);
    }, [buildUpdatedStats, applyEffects, saveToFirestore]);

    // ─────────────────────────────────────────────
    // НАВІГАЦІЯ
    // ─────────────────────────────────────────────
    function selectLesson(mIdx, lIdx, cId = null) {
        const activeCourse = cId || courseId;
        setModuleIdx(mIdx);
        setLessonIdx(lIdx);
        if (cId) setCourseId(cId);
        setShowQuiz(false);
        setQuizAnswers([]);
        setQuizSubmitted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        saveToFirestore(statsRef.current, activeCourse, mIdx, lIdx);
    }

    function handleNextModule() {
        const course = coursesDB[courseId];
        if (!course) return;

        // FIX: Перевірити чи можемо перейти до наступного модуля
        if (moduleIdx < course.modules.length - 1) {
            if (isModuleLocked(moduleIdx + 1)) {
                showToast('🔒 Complete this module first!', 'warning');
                return;
            }
            selectLesson(moduleIdx + 1, 0);
        } else {
            navigate('/courses');
        }
    }

    function handleNextLesson() {

        console.log("Клікнули Next! Поточний курс:", courseId);
        console.log("Що знайшли в базі даних для цього курсу:", coursesDB[courseId]);

        handleCompleteLesson(courseId, moduleIdx, lessonIdx);
        const module = coursesDB[courseId]?.modules[moduleIdx];

        if (!module) {
            console.error("🚨 Помилка: Модуль не знайдено в базі даних! Перехід зупинено.");
            return;
        }

        if (lessonIdx < module.lessons.length - 1) {
            // Є ще уроки в цьому модулі
            selectLesson(moduleIdx, lessonIdx + 1);
        } else if (module.quiz && module.quiz.length > 0) {
            // Останній урок — показати квіз модуля
            setShowQuiz(true);
            setQuizAnswers(new Array(module.quiz.length).fill(null));
            setQuizSubmitted(false);
            setQuizTimeTaken(0);
            setQuizStartTime(Date.now());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Немає квізу — переходимо до наступного модуля
            handleNextModule();
        }
    }

    function handlePrevLesson() {
        if (showQuiz) { setShowQuiz(false); return; }
        if (lessonIdx > 0) {
            selectLesson(moduleIdx, lessonIdx - 1);
        } else if (moduleIdx > 0) {
            const prevModule = coursesDB[courseId]?.modules[moduleIdx - 1];
            selectLesson(moduleIdx - 1, (prevModule?.lessons?.length || 1) - 1);
        }
    }

    // ─────────────────────────────────────────────
    // КВІЗ
    // ─────────────────────────────────────────────
    function handleSelectAnswer(qi, oi) {
        if (quizSubmitted) return;
        setQuizAnswers(prev => { const c = [...prev]; c[qi] = oi; return c; });
    }

    function handleSubmitQuiz() {
        if (quizSubmitted) return;

        const quiz = coursesDB[courseId]?.modules[moduleIdx]?.quiz;
        if (!quiz) return;

        const elapsed = Math.round((Date.now() - quizStartTime) / 1000);
        setQuizTimeTaken(elapsed);      // ← зберігаємо один раз
        setQuizSubmitted(true);

        const score = quizAnswers.filter((a, i) => a === quiz[i].correctAnswer).length;
        const isPerfect = score === quiz.length;
        const moduleKey = `${courseId}_${moduleIdx}`;

        const prev = statsRef.current;
        const { newStats, sideEffects } = buildUpdatedStats(prev, null, {
            cId: courseId, mIdx: moduleIdx, moduleKey,
            isPerfect, isSpeedRun: isPerfect && elapsed < 120,
        });

        setStats(newStats);
        statsRef.current = newStats;

        if (!isPerfect) {
            showToast(`${score}/${quiz.length} correct — try again for a star!`, 'info');
        }
        applyEffects(sideEffects);
        saveToFirestore(newStats, courseId, moduleIdx, lessonIdx);
    }

    function handleRetryQuiz() {
        const quiz = coursesDB[courseId]?.modules[moduleIdx]?.quiz;
        setQuizAnswers(new Array(quiz?.length || 0).fill(null));
        setQuizSubmitted(false);
        setQuizTimeTaken(0);
        setQuizStartTime(Date.now());
    }

    // ─────────────────────────────────────────────
    // Bug 4: MODULE LOCKING
    // Модуль заблокований якщо попередній квіз не пройдений
    // ─────────────────────────────────────────────
    function isModuleLocked(mi) {
        if (mi === 0) return false; // перший модуль завжди відкритий
        const prevModule = coursesDB[courseId]?.modules[mi - 1];
        if (!prevModule) return false;
        // Потрібно щоб всі уроки попереднього модуля були завершені
        const prevLessonsCompleted = prevModule.lessons.every(
            les => (stats.completedLessons[courseId] || []).includes(les.id)
        );
        return !prevLessonsCompleted;
    }

    // ─────────────────────────────────────────────
    // RENDER DATA
    // ─────────────────────────────────────────────
    const course = coursesDB[courseId];
    const module = course?.modules[moduleIdx];
    const lesson = module?.lessons[lessonIdx];
    const quiz = module?.quiz || [];
    const meta = COURSE_META[courseId] || COURSE_META['cpp-advanced'];
    const xpNow = stats.xp;
    const xpNeeded = xpForLevel(stats.level);
    const xpPct = Math.min(Math.round((xpNow / xpNeeded) * 100), 100);
    const completedForCourse = stats.completedLessons[courseId] || [];
    const totalLessons = course?.modules.reduce((s, m) => s + m.lessons.length, 0) || 0;
    const answered = quizAnswers.filter(a => a !== null).length;

    if (isLoading) {
        return (
            <div className="lesson-loading">
                <span className="lesson-loading-text">LOADING LESSON...</span>
            </div>
        );
    }

    // ─────────────────────────────────────────────
    // JSX
    // ─────────────────────────────────────────────
    return (
        <div className="lesson-page">
            {confetti && <ConfettiOverlay />}
            {achievementModal && (
                <AchievementModal
                    def={achievementModal.def}
                    bonusXP={achievementModal.bonusXP}
                    onClose={() => setAchievementModal(null)}
                />
            )}
            <ToastStack toasts={toasts} />

            <div className={`lesson-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>

                {/* ═══ SIDEBAR ═══ */}
                <aside className="lesson-sidebar" style={{ '--course-color': meta.color }}>
                    <div className="sidebar-header">
                        <Link to="/courses" className="back-link">
                            <span>❮</span> <span>Courses</span>
                        </Link>
                        <span className="sidebar-brand">learntocode</span>
                        <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
                            {sidebarOpen ? '◀' : '▶'}
                        </button>
                    </div>

                    <div className="sidebar-course-info">
                        <div className="course-icon">{meta.icon}</div>
                        <div>
                            <h2 className="course-title">{course?.title || courseId}</h2>
                            <p className="course-sub">{completedForCourse.length}/{totalLessons} lessons completed</p>
                        </div>
                    </div>

                    <div className="sidebar-xp">
                        <div className="sidebar-xp-labels">
                            <span>Lvl {stats.level}</span>
                            <span style={{ color: meta.color }}>{xpNow}/{xpNeeded} XP</span>
                        </div>
                        <div className="xp-bar-track">
                            <div
                                className="xp-bar-fill"
                                style={{ width: `${xpPct}%`, background: `linear-gradient(90deg, ${meta.color}, #0ea5e9)` }}
                            />
                        </div>
                    </div>

                    <div className="sidebar-stats-grid">
                        <div className="sidebar-stat-box">
                            <span className="sidebar-stat-label">Streak</span>
                            <span className="sidebar-stat-value">🔥 {stats.streak}d</span>
                        </div>
                        <div className="sidebar-stat-box">
                            <span className="sidebar-stat-label">Stars</span>
                            <span className="sidebar-stat-value">⭐ {stats.stars}</span>
                        </div>
                        <div className="sidebar-stat-box">
                            <span className="sidebar-stat-label">Achievements</span>
                            <span className="sidebar-stat-value">🏆 {stats.achievements.length}</span>
                        </div>
                        <div className="sidebar-stat-box">
                            <span className="sidebar-stat-label">Level</span>
                            <span className="sidebar-stat-value" style={{ color: meta.color }}>Lvl {stats.level}</span>
                        </div>
                    </div>

                    <nav className="lesson-modules">
                        {course?.modules.map((mod, mi) => (
                            <div key={mi} className="module-group">
                                <div className="module-header">
                                    <span className="module-number">Module {mi + 1}</span>
                                    <span className="module-name">
                                        {mod.moduleName?.replace(/^Module \d+:\s*/, '') || mod.moduleName}
                                    </span>
                                </div>
                                <ul className="lesson-list">
                                    {mod.lessons.map((les, li) => {
                                        const active = !showQuiz && mi === moduleIdx && li === lessonIdx;
                                        const done = completedForCourse.includes(les.id);
                                        return (
                                            <li
                                                key={li}
                                                className={`lesson-item ${active ? 'active' : ''} ${done ? 'done' : ''} ${isModuleLocked(mi) ? 'locked' : ''}`}
                                                onClick={() => {
                                                    if (isModuleLocked(mi)) {
                                                        showToast('🔒 Complete the previous module first!', 'warning');
                                                        return;
                                                    }
                                                    selectLesson(mi, li);
                                                }}
                                            >
                                                <span className="lesson-dot">{done ? '✓' : active ? '●' : '○'}</span>
                                                <span className="lesson-item-title">{les.title}</span>
                                            </li>
                                        );
                                    })}
                                    {mod.quiz && (
                                        <li
                                            className={`lesson-item quiz-item ${showQuiz && mi === moduleIdx && !lesson ? 'active' : ''}`}
                                            onClick={() => {
                                                if (isModuleLocked(mi)) {
                                                    showToast('🔒 Complete the previous module first!', 'warning');
                                                    return;
                                                }
                                                if (mi !== moduleIdx) return;
                                                setShowQuiz(true);
                                                setQuizAnswers(new Array(mod.quiz.length).fill(null));
                                                setQuizSubmitted(false);
                                                setQuizTimeTaken(0);
                                                setQuizStartTime(Date.now());
                                            }}
                                        >
                                            <span className="lesson-dot">
                                                {(stats.perfectQuizzes[courseId] || []).includes(mi) ? '⭐' : '📝'}
                                            </span>
                                            <span className="lesson-item-title">Module Quiz</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* ═══ MAIN CONTENT ═══ */}
                <main className="lesson-content">
                    {showQuiz ? (
                        <div className="quiz-view" style={{ '--course-color': meta.color }}>
                            <div className="quiz-header">
                                <h1 className="quiz-title">
                                    📝 Module Quiz — {module?.moduleName?.replace(/^Module \d+:\s*/, '') || 'Knowledge Check'}
                                </h1>
                                <p className="quiz-subtitle">
                                    {quiz.length} questions &nbsp;•&nbsp;
                                    Perfect score earns +{CONFIG.xpPerPerfectQuiz} XP and ⭐ 1 Star
                                </p>
                            </div>

                            <div className="quiz-questions">
                                {quiz.map((q, qi) => {
                                    const chosen = quizAnswers[qi];
                                    const correct = q.correctAnswer;
                                    return (
                                        <div key={qi} className="quiz-question-box">
                                            <p className="quiz-q-text">
                                                <span className="quiz-q-num" style={{ color: meta.color }}>{qi + 1}.</span>
                                                {q.question}
                                                {quizSubmitted && (
                                                    <span style={{ marginLeft: 8 }}>
                                                        {chosen === correct ? '✅' : '❌'}
                                                    </span>
                                                )}
                                            </p>
                                            <div className="quiz-options">
                                                {q.options.map((opt, oi) => {
                                                    let cls = 'quiz-option';
                                                    if (quizSubmitted) {
                                                        if (oi === correct) cls += ' opt-correct';
                                                        else if (oi === chosen) cls += ' opt-wrong';
                                                    } else if (oi === chosen) {
                                                        cls += ' opt-selected';
                                                    }
                                                    return (
                                                        <button
                                                            key={oi}
                                                            className={cls}
                                                            onClick={() => handleSelectAnswer(qi, oi)}
                                                            disabled={quizSubmitted}
                                                            style={{ '--course-color': meta.color }}
                                                        >
                                                            <span className="opt-letter">{String.fromCharCode(65 + oi)}</span>
                                                            {opt}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {!quizSubmitted ? (
                                <div className="quiz-footer">
                                    <span className="quiz-counter">{answered} / {quiz.length} answered</span>
                                    <button
                                        className="btn-submit-quiz"
                                        onClick={handleSubmitQuiz}
                                        disabled={answered < quiz.length}
                                        style={{ '--course-color': meta.color }}
                                    >
                                        Submit Quiz →
                                    </button>
                                </div>
                            ) : (
                                <QuizResult
                                    quiz={quiz}
                                    answers={quizAnswers}
                                    timeTaken={quizTimeTaken}
                                    meta={meta}
                                    onRetry={handleRetryQuiz}
                                    onNext={handleNextModule}
                                />
                            )}
                        </div>
                    ) : (
                        lesson && (
                            <div className="lesson-view" style={{ '--course-color': meta.color }}>
                                <div className="lesson-header">
                                    <div className="lesson-meta-row">
                                        <span className="lesson-badge" style={{ background: `${meta.color}22`, color: meta.color, borderColor: `${meta.color}44` }}>
                                            {meta.icon} {meta.label}
                                        </span>
                                        <span className="lesson-badge diff">{lesson.difficulty}</span>
                                        <span className="lesson-badge time">⏱ {lesson.estimatedTime}</span>
                                    </div>
                                    <h1 className="lesson-title">{lesson.title}</h1>
                                    {lesson.keyTerms?.length > 0 && (
                                        <div className="key-terms">
                                            {lesson.keyTerms.map(term => (
                                                <span key={term} className="key-term">{term}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <section className="theory-section">
                                    <div className="theory-body" dangerouslySetInnerHTML={{ __html: lesson.theory }} />
                                </section>

                                {lesson.codeExample && (
                                    <section className="code-section">
                                        <div className="code-box-header">
                                            <span className="code-lang">{meta.icon} Example</span>
                                        </div>
                                        <pre className="code-block"><code>{lesson.codeExample}</code></pre>
                                        {lesson.codeExplanation && (
                                            <div className="code-explanation" dangerouslySetInnerHTML={{ __html: lesson.codeExplanation }} />
                                        )}
                                    </section>
                                )}

                                {lesson.startingCode && (
                                    <section className="try-it-section">
                                        <div className="try-it-header">
                                            <h3>Try It Yourself</h3>
                                            <button
                                                className="btn-try"
                                                style={{ '--course-color': meta.color }}
                                                onClick={() => {
                                                    const isCpp = courseId === 'cpp-advanced';
                                                    const ideUrl = isCpp ? '/cpp-ide.html' : '/python-ide.html';
                                                    window.location.href = ideUrl;
                                                }}
                                            >
                                                ▷ Open Editor
                                            </button>
                                        </div>
                                        <pre className="code-block tryit"><code>{lesson.startingCode}</code></pre>
                                    </section>
                                )}

                                {lesson.bestPractices?.length > 0 && (
                                    <section className="best-practices">
                                        <h3 className="bp-title">💡 Best Practices</h3>
                                        <ul className="bp-list">
                                            {lesson.bestPractices.map((bp, i) => (
                                                <li key={i} className="bp-item">
                                                    <span className="bp-dot" style={{ color: meta.color }}>▸</span>
                                                    {bp}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                <div className="lesson-nav">
                                    <button
                                        className="btn-nav prev"
                                        onClick={handlePrevLesson}
                                        disabled={moduleIdx === 0 && lessonIdx === 0}
                                    >
                                        ❮ Previous
                                    </button>
                                    <button
                                        className="btn-nav next"
                                        onClick={handleNextLesson}
                                        style={{ '--course-color': meta.color }}
                                    >
                                        {lessonIdx < (module?.lessons.length || 1) - 1 ? 'Next Lesson ❯' : 'Take Quiz ❯'}
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </main>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function QuizResult({ quiz, answers, timeTaken, meta, onRetry, onNext }) {
    const score = answers.filter((a, i) => a === quiz[i]?.correctAnswer).length;
    const isPerfect = score === quiz.length;
    const pct = Math.round((score / quiz.length) * 100);
    const grade = pct === 100 ? '⭐ Perfect!' : pct >= 80 ? '🎯 Great!' : pct >= 60 ? '📚 Good' : '💪 Keep Practicing';

    return (
        <div className={`quiz-result ${isPerfect ? 'perfect' : ''}`} style={{ '--course-color': meta.color }}>
            <div className="result-grade">{grade}</div>
            <div className="result-score">{score} / {quiz.length}</div>
            <div className="result-sub">{pct}% correct &nbsp;•&nbsp; {timeTaken}s</div>
            {isPerfect
                ? <div className="result-reward">+{CONFIG.xpPerPerfectQuiz} XP &nbsp;•&nbsp; +1 ⭐ Star earned!</div>
                : <div className="result-hint">Answer all correctly for +{CONFIG.xpPerPerfectQuiz} XP and a Star.</div>
            }
            <div className="result-actions">
                {!isPerfect && <button className="btn-retry" onClick={onRetry}>🔄 Retry Quiz</button>}
                <button className="btn-next-module" onClick={onNext} style={{ '--course-color': meta.color }}>
                    Next Module →
                </button>
            </div>
        </div>
    );
}

function AchievementModal({ def, bonusXP, onClose }) {
    return (
        <div className="achievement-overlay" onClick={onClose}>
            <div className="achievement-modal" onClick={e => e.stopPropagation()}>
                <div className="ach-icon">{def?.icon || '🏆'}</div>
                <div className="ach-label">Achievement Unlocked</div>
                <div className="ach-title">{def?.title}</div>
                <div className="ach-desc">{def?.desc}</div>
                <div className="ach-rewards">
                    <div className="ach-reward-box">
                        <div className="ach-reward-val">+{bonusXP}</div>
                        <div className="ach-reward-sub">XP</div>
                    </div>
                    <div className="ach-reward-box">
                        <div className="ach-reward-val">+1 ⭐</div>
                        <div className="ach-reward-sub">Star</div>
                    </div>
                </div>
                <button className="ach-close" onClick={onClose}>Awesome! 🎉</button>
            </div>
        </div>
    );
}

function ToastStack({ toasts }) {
    const COLORS = {
        success: { bg: 'rgba(0,213,39,0.15)', border: '#00d527', text: '#00d527' },
        warning: { bg: 'rgba(255,202,44,0.15)', border: '#ffca2c', text: '#ffca2c' },
        error: { bg: 'rgba(232,64,64,0.15)', border: '#e84040', text: '#e84040' },
        info: { bg: 'rgba(79,195,247,0.15)', border: '#4fc3f7', text: '#4fc3f7' },
        xp: { bg: 'rgba(245,166,35,0.15)', border: '#f5a623', text: '#f5a623' },
        'level-up': { bg: 'rgba(167,139,250,0.2)', border: '#a78bfa', text: '#a78bfa' },
    };
    return (
        <div className="toast-stack">
            {toasts.map(t => {
                const c = COLORS[t.type] || COLORS.info;
                return (
                    <div key={t.id} className="toast" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                        {t.message}
                    </div>
                );
            })}
        </div>
    );
}

function ConfettiOverlay() {
    const colors = ['#f5a623', '#4fc3f7', '#00d527', '#a78bfa', '#ff4b4b', '#ffca2c'];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        left: (i * 7.3 + Math.sin(i) * 20 + 50) % 100,
        size: 6 + (i % 8),
        duration: 1500 + (i % 5) * 400,
        delay: (i % 8) * 100,
        round: i % 2 === 0,
    }));
    return (
        <div className="confetti-overlay" aria-hidden="true">
            {pieces.map(p => (
                <div key={p.id} className="confetti-piece" style={{
                    left: `${p.left}vw`, width: p.size, height: p.size,
                    background: p.color, borderRadius: p.round ? '50%' : '2px',
                    animationDuration: `${p.duration}ms`, animationDelay: `${p.delay}ms`,
                }} />
            ))}
        </div>
    );
}

export default Lesson;