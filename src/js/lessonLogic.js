/**
 * CORE GAME LOGIC - learntocode
 * Реалізація: Прогрес, Зірки, Страйки, Челенджі
 * Version 2.0 — Multi-course, full achievement system, quiz engine, UI sync
 */

// ═══════════════════════════════════════════════════════════════════
// 1. КОНФІГУРАЦІЯ СИСТЕМИ
// ═══════════════════════════════════════════════════════════════════

const CONFIG = {
    xpPerLesson:         50,
    xpPerPerfectQuiz:    100,
    xpPerAchievement:    {
        hello_world:     250,
        architect:       500,
        deep_learner:    1000,
        speed_runner:    300,
        streak_warrior:  400,
        quiz_master:     600,
        cyber_sentinel:  750,
        polyglot:        800,
        night_owl:       200,
        completionist:   1500,
    },
    xpPerLevel:          500,     // XP на один рівень (лінійно)
    streakResetHours:    48,
    streakIncrementHours: 24,
    starsPerAchievement: 1,
    starsPerPerfectQuiz: 1,
};

// Метадані курсів — довідник для динамічної генерації ачівок
const COURSE_META = {
    "cpp-advanced": {
        label:       "C++",
        totalLessons: 15,
        color:        "#4fc3f7",
        icon:         "⚙️",
        achievements: ["hello_world", "architect", "deep_learner"],
    },
    "cybersecurity": {
        label:       "Cybersecurity",
        totalLessons: 20,
        color:        "#e84040",
        icon:         "🔐",
        achievements: ["cyber_sentinel", "completionist"],
    },
    // Легко розширюється на нові курси
};

// ═══════════════════════════════════════════════════════════════════
// 2. ІНІЦІАЛІЗАЦІЯ ДАНИХ (LocalStorage)
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_STATS = {
    xp:               0,
    level:            1,
    stars:            0,
    streak:           1,
    lastActivity:     new Date().toISOString(),
    completedLessons: {},  // { "cpp-advanced": [1,2,3], "cybersecurity": [1] }
    perfectQuizzes:   {},  // { "cpp-advanced": [true, false], "cybersecurity": [] }
    achievements:     [],
    totalTimeSpent:   0,   // хвилини — для night_owl ачівки
    sessionStart:     null,
    quizAttempts:     {},  // { "courseId_moduleIdx": attempts }
};

let userStats = (() => {
    try {
        const saved = JSON.parse(localStorage.getItem('userStats'));
        if (!saved) return { ...DEFAULT_STATS };

        // Міграція зі старого формату масиву до об'єкту per-course
        if (Array.isArray(saved.completedLessons)) {
            saved.completedLessons = { "cpp-advanced": saved.completedLessons };
        }
        if (!saved.perfectQuizzes)  saved.perfectQuizzes  = {};
        if (!saved.quizAttempts)    saved.quizAttempts    = {};
        if (!saved.totalTimeSpent)  saved.totalTimeSpent  = 0;

        return saved;
    } catch {
        return { ...DEFAULT_STATS };
    }
})();

// ═══════════════════════════════════════════════════════════════════
// 3. СТАН НАВІГАЦІЇ
// ═══════════════════════════════════════════════════════════════════

let currentCourseId   = localStorage.getItem('lastCourseId') || "cpp-advanced";
let currentModuleIdx  = parseInt(localStorage.getItem('lastModuleIdx'))  || 0;
let currentLessonIdx  = parseInt(localStorage.getItem('lastLessonIdx'))  || 0;
let quizState         = { active: false, answers: [], startTime: null };

// Гарантуємо наявність масиву для поточного курсу
function ensureCourseData(courseId) {
    if (!userStats.completedLessons[courseId]) {
        userStats.completedLessons[courseId] = [];
    }
    if (!userStats.perfectQuizzes[courseId]) {
        userStats.perfectQuizzes[courseId] = [];
    }
}

// ═══════════════════════════════════════════════════════════════════
// 4. СИСТЕМА СТРАЙКІВ
// ═══════════════════════════════════════════════════════════════════

function updateStreak() {
    const now      = new Date();
    const lastDate = new Date(userStats.lastActivity);
    const diffH    = (now - lastDate) / (1000 * 60 * 60);

    if (diffH > CONFIG.streakResetHours) {
        userStats.streak = 1;
        showToast("💔 Streak reset — let's build it back!", "warning");
    } else if (diffH >= CONFIG.streakIncrementHours) {
        userStats.streak += 1;
        if (userStats.streak % 7 === 0) {
            showToast(`🔥 ${userStats.streak}-day streak! Incredible dedication!`, "success");
        }
    }
    userStats.lastActivity = now.toISOString();
}

// Зворотна сумісність зі старою назвою
function updateStrike() { updateStreak(); }

// ═══════════════════════════════════════════════════════════════════
// 5. ПІДРАХУНОК XP ТА РІВНІВ
// ═══════════════════════════════════════════════════════════════════

/**
 * XP потрібний для досягнення конкретного рівня.
 * Формула: лінійна з невеликим зростанням, щоб рівні не були нудними.
 * Рівень 1→2: 500, 2→3: 600, 3→4: 700...
 */
function xpForLevel(level) {
    return level * CONFIG.xpPerLevel + (level - 1) * 100;
}

function addXP(amount, reason = "") {
    const prevLevel = userStats.level;
    userStats.xp += amount;

    // Перевірка підвищення рівня (може підвищитись кілька разів)
    while (userStats.xp >= xpForLevel(userStats.level)) {
        userStats.xp -= xpForLevel(userStats.level);
        userStats.level += 1;
    }

    if (userStats.level > prevLevel) {
        const levelsGained = userStats.level - prevLevel;
        showToast(
            `🚀 Level Up! ${prevLevel} → ${userStats.level}` +
            (levelsGained > 1 ? ` (+${levelsGained} levels!)` : ""),
            "level-up"
        );
        triggerLevelUpAnimation();
    }

    if (reason) {
        showToast(`+${amount} XP — ${reason}`, "xp");
    }
}

// ═══════════════════════════════════════════════════════════════════
// 6. ЗАВЕРШЕННЯ УРОКУ
// ═══════════════════════════════════════════════════════════════════

function completeLesson() {
    ensureCourseData(currentCourseId);

    const course  = coursesDB[currentCourseId];
    if (!course) return;

    const module  = course.modules[currentModuleIdx];
    if (!module)  return;

    const lesson  = module.lessons[currentLessonIdx];
    if (!lesson)  return;

    const lessonKey = lesson.id;
    const completed = userStats.completedLessons[currentCourseId];

    if (!completed.includes(lessonKey)) {
        completed.push(lessonKey);

        // XP + часовий бонус
        const timeBonus = calculateTimeBonus(lesson.estimatedTime);
        addXP(CONFIG.xpPerLesson + timeBonus, `Lesson "${lesson.title}" completed`);

        updateStreak();
        checkAchievements();
        saveData();
        renderSidebar();
        renderProgressPanel();
    }
}

/**
 * Бонус XP за уроки, що оцінюються понад 60 хвилин (важкі).
 */
function calculateTimeBonus(estimatedTime) {
    if (!estimatedTime) return 0;
    const minutes = parseInt(estimatedTime) || 0;
    if (minutes >= 70) return 25;
    if (minutes >= 60) return 15;
    if (minutes >= 50) return 10;
    return 0;
}

// ═══════════════════════════════════════════════════════════════════
// 7. КВІЗ ENGINE — повна реалізація
// ═══════════════════════════════════════════════════════════════════

/**
 * Ініціалізує квіз для поточного модуля.
 * Викликається при переході до quiz-секції.
 */
function initQuiz() {
    const course  = coursesDB[currentCourseId];
    const module  = course?.modules[currentModuleIdx];
    if (!module?.quiz) return;

    quizState = {
        active:    true,
        answers:   new Array(module.quiz.length).fill(null),
        startTime: Date.now(),
        submitted: false,
    };

    renderQuiz();
}

/**
 * Рендеринг квізу в DOM.
 */
function renderQuiz() {
    const course  = coursesDB[currentCourseId];
    const module  = course?.modules[currentModuleIdx];
    const quiz    = module?.quiz;
    if (!quiz || !quizState.active) return;

    const container = document.getElementById('quiz-container') ||
                      document.querySelector('.quiz-section');
    if (!container) return;

    const questionsHTML = quiz.map((q, qi) => `
        <div class="quiz-question" id="qq-${qi}" style="
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            transition: border-color 0.3s;
        ">
            <p style="color: #f1f5f9; font-weight: 600; margin-bottom: 14px; font-size: 15px;">
                <span style="color: ${COURSE_META[currentCourseId]?.color || '#4fc3f7'}; margin-right: 8px;">${qi + 1}.</span>
                ${q.question}
            </p>
            <div class="quiz-options" style="display: flex; flex-direction: column; gap: 8px;">
                ${q.options.map((opt, oi) => `
                    <button
                        class="quiz-option"
                        data-qi="${qi}"
                        data-oi="${oi}"
                        onclick="selectQuizAnswer(${qi}, ${oi})"
                        style="
                            text-align: left;
                            background: rgba(255,255,255,0.03);
                            border: 1px solid rgba(255,255,255,0.1);
                            border-radius: 8px;
                            color: #d1d5db;
                            padding: 12px 16px;
                            cursor: pointer;
                            font-size: 14px;
                            transition: all 0.2s;
                        "
                        onmouseover="this.style.borderColor='${COURSE_META[currentCourseId]?.color || '#4fc3f7'}44'; this.style.background='rgba(255,255,255,0.06)'"
                        onmouseout="resetOptionStyle(this, ${qi}, ${oi})"
                    >
                        <span style="
                            display: inline-block;
                            width: 22px; height: 22px;
                            border-radius: 50%;
                            border: 2px solid rgba(255,255,255,0.2);
                            text-align: center;
                            line-height: 18px;
                            font-size: 12px;
                            margin-right: 10px;
                            color: #9ca3af;
                            font-weight: 700;
                        ">${String.fromCharCode(65 + oi)}</span>
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div style="margin-bottom: 24px;">
            <h3 style="color: #f1f5f9; font-size: 18px; font-weight: 700; margin-bottom: 6px;">
                📝 Module Quiz — ${module.moduleName || 'Knowledge Check'}
            </h3>
            <p style="color: #9ca3af; font-size: 13px;">
                ${quiz.length} questions • Perfect score earns +${CONFIG.xpPerPerfectQuiz} XP and ⭐ 1 Star
            </p>
        </div>
        <div id="quiz-questions">${questionsHTML}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
            <span id="quiz-answered" style="color: #9ca3af; font-size: 13px;">
                0 / ${quiz.length} answered
            </span>
            <button
                id="submit-quiz-btn"
                onclick="submitQuiz()"
                disabled
                style="
                    background: linear-gradient(135deg, #4fc3f7, #0ea5e9);
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 12px 28px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: not-allowed;
                    opacity: 0.5;
                    transition: all 0.3s;
                "
            >
                Submit Quiz →
            </button>
        </div>
        <div id="quiz-result" style="display:none; margin-top: 24px;"></div>
    `;
}

/**
 * Обробка вибору відповіді.
 */
function selectQuizAnswer(questionIdx, optionIdx) {
    if (quizState.submitted) return;

    quizState.answers[questionIdx] = optionIdx;

    // Оновлення UI опцій
    const question = document.getElementById(`qq-${questionIdx}`);
    if (!question) return;

    question.querySelectorAll('.quiz-option').forEach((btn, i) => {
        const isSelected = i === optionIdx;
        const color      = COURSE_META[currentCourseId]?.color || '#4fc3f7';
        btn.style.border     = isSelected ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.1)';
        btn.style.background = isSelected ? `${color}22` : 'rgba(255,255,255,0.03)';
        btn.style.color      = isSelected ? '#f1f5f9' : '#d1d5db';
    });

    // Лічильник відповіданих питань
    const answered = quizState.answers.filter(a => a !== null).length;
    const counter  = document.getElementById('quiz-answered');
    const quiz     = coursesDB[currentCourseId]?.modules[currentModuleIdx]?.quiz;
    if (counter && quiz) {
        counter.textContent = `${answered} / ${quiz.length} answered`;
    }

    // Розблокування кнопки Submit
    const submitBtn = document.getElementById('submit-quiz-btn');
    if (submitBtn && answered === quiz?.length) {
        submitBtn.disabled           = false;
        submitBtn.style.opacity      = '1';
        submitBtn.style.cursor       = 'pointer';
        submitBtn.style.background   = `linear-gradient(135deg, ${COURSE_META[currentCourseId]?.color || '#4fc3f7'}, #0ea5e9)`;
        submitBtn.onmouseover = () => { submitBtn.style.transform = 'scale(1.03)'; };
        submitBtn.onmouseout  = () => { submitBtn.style.transform = 'scale(1)'; };
    }
}

/**
 * Скидання стилю опції (для onmouseout).
 */
function resetOptionStyle(btn, qi, oi) {
    const isSelected = quizState.answers[qi] === oi;
    const color      = COURSE_META[currentCourseId]?.color || '#4fc3f7';
    btn.style.border     = isSelected ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.1)';
    btn.style.background = isSelected ? `${color}22` : 'rgba(255,255,255,0.03)';
    btn.style.color      = isSelected ? '#f1f5f9' : '#d1d5db';
}

/**
 * Підрахунок і відображення результатів квізу.
 */
function submitQuiz() {
    if (quizState.submitted) return;
    quizState.submitted = true;

    ensureCourseData(currentCourseId);

    const course   = coursesDB[currentCourseId];
    const module   = course?.modules[currentModuleIdx];
    const quiz     = module?.quiz;
    if (!quiz) return;

    const timeTaken = Math.round((Date.now() - quizState.startTime) / 1000);
    let   score     = 0;

    // Підсвічування правильних/неправильних відповідей
    quiz.forEach((q, qi) => {
        const chosen  = quizState.answers[qi];
        const correct = q.correctAnswer;
        const isRight = chosen === correct;
        if (isRight) score++;

        const questionEl = document.getElementById(`qq-${qi}`);
        if (!questionEl) return;

        questionEl.querySelectorAll('.quiz-option').forEach((btn, oi) => {
            btn.onclick = null; // Блокуємо кліки
            if (oi === correct) {
                btn.style.background   = 'rgba(0, 213, 39, 0.2)';
                btn.style.border       = '2px solid #00d527';
                btn.style.color        = '#00d527';
            } else if (oi === chosen && !isRight) {
                btn.style.background   = 'rgba(232, 64, 64, 0.2)';
                btn.style.border       = '2px solid #e84040';
                btn.style.color        = '#e84040';
            }
        });

        // Маленький значок на питанні
        const label = questionEl.querySelector('p');
        if (label) {
            label.innerHTML += isRight
                ? ' <span style="color:#00d527; font-size:16px;">✓</span>'
                : ` <span style="color:#e84040; font-size:16px;">✗</span>`;
        }
    });

    // Логіка результату
    const isPerfect = score === quiz.length;
    const moduleKey = `${currentCourseId}_${currentModuleIdx}`;

    // Запис спроби
    if (!userStats.quizAttempts[moduleKey]) {
        userStats.quizAttempts[moduleKey] = 0;
    }
    userStats.quizAttempts[moduleKey]++;

    if (isPerfect && !userStats.perfectQuizzes[currentCourseId].includes(currentModuleIdx)) {
        userStats.perfectQuizzes[currentCourseId].push(currentModuleIdx);
        userStats.stars += CONFIG.starsPerPerfectQuiz;
        addXP(CONFIG.xpPerPerfectQuiz, "Perfect quiz score!");
    }

    handleQuizSubmit(score, quiz.length); // Зворотна сумісність

    // Рендер результату
    const resultEl = document.getElementById('quiz-result');
    if (resultEl) {
        const pct          = Math.round((score / quiz.length) * 100);
        const grade        = pct === 100 ? "⭐ Perfect!" : pct >= 80 ? "🎯 Great!" : pct >= 60 ? "📚 Good" : "💪 Keep Practicing";
        const speedBonus   = timeTaken < 120 && isPerfect ? '<span style="color:#f5a623;"> ⚡ Speed Bonus!</span>' : '';

        resultEl.style.display = 'block';
        resultEl.innerHTML = `
            <div style="
                background: ${isPerfect ? 'rgba(0,213,39,0.12)' : 'rgba(255,255,255,0.05)'};
                border: 1px solid ${isPerfect ? '#00d527' : 'rgba(255,255,255,0.12)'};
                border-radius: 14px;
                padding: 24px;
                text-align: center;
            ">
                <div style="font-size: 40px; margin-bottom: 8px;">${grade}</div>
                <div style="color: #f1f5f9; font-size: 26px; font-weight: 800; margin-bottom: 4px;">
                    ${score} / ${quiz.length} ${speedBonus}
                </div>
                <div style="color: #9ca3af; font-size: 14px; margin-bottom: 16px;">
                    ${pct}% correct • Completed in ${timeTaken}s
                </div>
                ${isPerfect ? `
                    <div style="color:#00d527; font-size:14px; margin-bottom:16px;">
                        +${CONFIG.xpPerPerfectQuiz} XP &nbsp;•&nbsp; +1 ⭐ Star earned!
                    </div>` : `
                    <div style="color:#9ca3af; font-size:13px; margin-bottom:16px;">
                        Answer all questions correctly for +${CONFIG.xpPerPerfectQuiz} XP and a Star.
                    </div>`
                }
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    ${!isPerfect ? `
                        <button onclick="retryQuiz()" style="
                            background: rgba(255,255,255,0.08);
                            border: 1px solid rgba(255,255,255,0.15);
                            color: #d1d5db;
                            border-radius: 8px;
                            padding: 10px 22px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 600;
                            transition: all 0.2s;
                        " onmouseover="this.style.background='rgba(255,255,255,0.14)'"
                           onmouseout="this.style.background='rgba(255,255,255,0.08)'">
                            🔄 Retry Quiz
                        </button>` : ''
                    }
                    <button onclick="goToNextModule()" style="
                        background: linear-gradient(135deg, ${COURSE_META[currentCourseId]?.color || '#4fc3f7'}, #0ea5e9);
                        border: none;
                        color: #fff;
                        border-radius: 8px;
                        padding: 10px 22px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 700;
                        transition: all 0.2s;
                    " onmouseover="this.style.transform='scale(1.04)'"
                       onmouseout="this.style.transform='scale(1)'">
                        Next Module →
                    </button>
                </div>
            </div>
        `;
    }

    checkAchievements();
    saveData();
}

/**
 * Retry: скидаємо стан і рендеримо квіз знову.
 */
function retryQuiz() {
    quizState = {
        active:    true,
        answers:   new Array(coursesDB[currentCourseId]?.modules[currentModuleIdx]?.quiz?.length || 0).fill(null),
        startTime: Date.now(),
        submitted: false,
    };
    renderQuiz();
}

/**
 * Зворотна сумісність зі старою функцією.
 */
function handleQuizSubmit(score, total) {
    if (score === total) {
        showToast(`Perfect Score! +1 Star ⭐ and +${CONFIG.xpPerPerfectQuiz} XP`, "success");
    } else {
        showToast(`${score}/${total} correct. Try again for a perfect score!`, "info");
    }
}

// ═══════════════════════════════════════════════════════════════════
// 8. СИСТЕМА АЧІВОК
// ═══════════════════════════════════════════════════════════════════

const ACHIEVEMENTS_DEF = {
    // ── Загальні ──────────────────────────────────────────────────
    hello_world: {
        icon:  "👋",
        title: "Hello World!",
        desc:  "Complete your very first lesson",
        check: () => totalCompleted() >= 1,
    },
    speed_runner: {
        icon:  "⚡",
        title: "Speed Runner",
        desc:  "Complete a perfect quiz in under 2 minutes",
        check: () => false, // Тригер з submitQuiz при timeTaken < 120
    },
    streak_warrior: {
        icon:  "🔥",
        title: "Streak Warrior",
        desc:  "Maintain a 7-day learning streak",
        check: () => userStats.streak >= 7,
    },
    quiz_master: {
        icon:  "🎯",
        title: "Quiz Master",
        desc:  "Ace every quiz in any single module",
        check: () => {
            for (const courseId in userStats.perfectQuizzes) {
                const course = coursesDB[courseId];
                if (!course) continue;
                if (userStats.perfectQuizzes[courseId].length === course.modules.length) {
                    return true;
                }
            }
            return false;
        },
    },
    night_owl: {
        icon:  "🦉",
        title: "Night Owl",
        desc:  "Study between midnight and 4 AM",
        check: () => {
            const h = new Date().getHours();
            return h >= 0 && h < 4;
        },
    },
    polyglot: {
        icon:  "🌐",
        title: "Polyglot",
        desc:  "Complete at least one lesson in two different courses",
        check: () => {
            const coursesWithProgress = Object.keys(userStats.completedLessons)
                .filter(id => userStats.completedLessons[id].length > 0);
            return coursesWithProgress.length >= 2;
        },
    },

    // ── C++ ───────────────────────────────────────────────────────
    architect: {
        icon:  "🏗️",
        title: "C++ Architect",
        desc:  "Complete all OOP lessons in the C++ course",
        check: () => {
            const completed = userStats.completedLessons["cpp-advanced"] || [];
            return [10, 11, 12].every(id => completed.includes(id));
        },
    },
    deep_learner: {
        icon:  "🧠",
        title: "Deep Learner",
        desc:  "Complete all 15 C++ lessons",
        check: () => (userStats.completedLessons["cpp-advanced"] || []).length >= 15,
    },

    // ── Cybersecurity ──────────────────────────────────────────────
    cyber_sentinel: {
        icon:  "🛡️",
        title: "Cyber Sentinel",
        desc:  "Complete 10 cybersecurity lessons",
        check: () => (userStats.completedLessons["cybersecurity"] || []).length >= 10,
    },
    completionist: {
        icon:  "🏆",
        title: "Completionist",
        desc:  "Complete all 20 cybersecurity lessons",
        check: () => (userStats.completedLessons["cybersecurity"] || []).length >= 20,
    },
};

function totalCompleted() {
    return Object.values(userStats.completedLessons)
        .reduce((sum, arr) => sum + arr.length, 0);
}

function checkAchievements() {
    Object.entries(ACHIEVEMENTS_DEF).forEach(([id, def]) => {
        if (!userStats.achievements.includes(id) && def.check()) {
            unlockAchievement(id);
        }
    });
}

function unlockAchievement(id) {
    if (userStats.achievements.includes(id)) return;

    const def    = ACHIEVEMENTS_DEF[id];
    const bonusXP = CONFIG.xpPerAchievement[id] || 250;

    userStats.achievements.push(id);
    userStats.stars += CONFIG.starsPerAchievement;
    addXP(bonusXP, `Achievement: ${def?.title || id}`);

    // Красиве сповіщення
    showAchievementModal(def, bonusXP);
    saveData();
}

function showAchievementModal(def, bonusXP) {
    // Видаляємо попередній модал, якщо є
    document.getElementById('achievement-modal')?.remove();

    const modal = document.createElement('div');
    modal.id    = 'achievement-modal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.7);
        z-index: 10000;
        background: linear-gradient(135deg, #1a1f2e, #0f1117);
        border: 2px solid #f5a623;
        border-radius: 20px;
        padding: 36px 40px;
        text-align: center;
        min-width: 320px;
        box-shadow: 0 0 60px rgba(245,166,35,0.4);
        animation: achievementPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `;

    modal.innerHTML = `
        <style>
            @keyframes achievementPop {
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            @keyframes shimmer {
                0%, 100% { box-shadow: 0 0 60px rgba(245,166,35,0.4); }
                50%       { box-shadow: 0 0 100px rgba(245,166,35,0.7); }
            }
            #achievement-modal { animation: achievementPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards, shimmer 2s ease-in-out 0.5s infinite; }
        </style>
        <div style="font-size: 52px; margin-bottom: 10px;">${def?.icon || '🏆'}</div>
        <div style="color: #f5a623; font-size: 11px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;">Achievement Unlocked</div>
        <div style="color: #f1f5f9; font-size: 22px; font-weight: 800; margin-bottom: 6px;">${def?.title || id}</div>
        <div style="color: #9ca3af; font-size: 14px; margin-bottom: 20px;">${def?.desc || ''}</div>
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
            <div style="background: rgba(245,166,35,0.15); border: 1px solid rgba(245,166,35,0.3); border-radius: 10px; padding: 10px 18px;">
                <div style="color: #f5a623; font-size: 18px; font-weight: 800;">+${bonusXP}</div>
                <div style="color: #9ca3af; font-size: 11px;">XP</div>
            </div>
            <div style="background: rgba(245,166,35,0.15); border: 1px solid rgba(245,166,35,0.3); border-radius: 10px; padding: 10px 18px;">
                <div style="color: #f5a623; font-size: 18px; font-weight: 800;">+1 ⭐</div>
                <div style="color: #9ca3af; font-size: 11px;">Star</div>
            </div>
        </div>
        <button onclick="document.getElementById('achievement-modal').remove()" style="
            background: linear-gradient(135deg, #f5a623, #e07b10);
            border: none;
            color: #000;
            font-weight: 800;
            padding: 11px 28px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 15px;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Awesome! 🎉
        </button>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal?.remove(), 6000);
}

// ═══════════════════════════════════════════════════════════════════
// 9. ЗБЕРЕЖЕННЯ ТА СИНХРОНІЗАЦІЯ
// ═══════════════════════════════════════════════════════════════════

function saveData() {
    try {
        localStorage.setItem('userStats', JSON.stringify(userStats));
        localStorage.setItem('lastCourseId',   currentCourseId);
        localStorage.setItem('lastModuleIdx',  String(currentModuleIdx));
        localStorage.setItem('lastLessonIdx',  String(currentLessonIdx));
    } catch (e) {
        console.warn('[LearnToCode] Could not save to localStorage:', e);
    }
    updateUI();
}

// ═══════════════════════════════════════════════════════════════════
// 10. ОНОВЛЕННЯ ІНТЕРФЕЙСУ
// ═══════════════════════════════════════════════════════════════════

function updateUI() {
    const course    = coursesDB[currentCourseId];
    const meta      = COURSE_META[currentCourseId] || {};
    const completed = (userStats.completedLessons[currentCourseId] || []).length;
    const total     = course?.totalLessons || 0;
    const xpNow     = userStats.xp;
    const xpNeeded  = xpForLevel(userStats.level);
    const pct       = Math.min(Math.round((xpNow / xpNeeded) * 100), 100);

    // ── Textual stats ──────────────────────────────────────────────
    const map = {
        'user-rank':    `Level ${userStats.level}`,
        'user-xp':      `${xpNow} / ${xpNeeded} XP`,
        'streak-val':   `${userStats.streak} day${userStats.streak !== 1 ? 's' : ''}`,
        'progress-val': `${completed}/${total}`,
        'stars-val':    `${userStats.stars} ⭐`,
        'xp-val':       `${userStats.xp} XP`,
        'level-val':    `Lvl ${userStats.level}`,
        'achievements-count': `${userStats.achievements.length}`,
    };

    Object.entries(map).forEach(([selector, value]) => {
        const el = document.querySelector(`.${selector}`) || document.getElementById(selector);
        if (el) el.textContent = value;
    });

    // ── XP Progress bar ────────────────────────────────────────────
    ['growth-fill', 'xp-fill', 'level-fill'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.width = `${pct}%`;
    });

    ['growth-val', 'xp-pct'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `${pct}%`;
    });

    // ── Course progress bar ────────────────────────────────────────
    const coursePct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const cpFill    = document.getElementById('course-progress-fill');
    const cpLabel   = document.getElementById('course-progress-label');
    if (cpFill)  cpFill.style.width    = `${coursePct}%`;
    if (cpLabel) cpLabel.textContent   = `${completed}/${total} lessons`;

    // ── Sidebar lesson checkmarks ──────────────────────────────────
    updateSidebarCheckmarks();
}

function updateSidebarCheckmarks() {
    const completed = userStats.completedLessons[currentCourseId] || [];
    document.querySelectorAll('[data-lesson-id]').forEach(el => {
        const id = parseInt(el.dataset.lessonId);
        const isDone = completed.includes(id);
        el.classList.toggle('lesson-done', isDone);

        const check = el.querySelector('.lesson-check');
        if (check) {
            check.style.opacity  = isDone ? '1' : '0';
            check.style.color    = '#00d527';
        }
    });
}

// ═══════════════════════════════════════════════════════════════════
// 11. НАВІГАЦІЯ
// ═══════════════════════════════════════════════════════════════════

function selectLesson(mIdx, lIdx) {
    currentModuleIdx = mIdx;
    currentLessonIdx = lIdx;

    // Закриваємо квіз при переході на урок
    quizState.active    = false;
    quizState.submitted = false;

    const lessonContent = document.querySelector('.lesson-content');
    if (lessonContent) lessonContent.classList.remove('show-quiz');

    if (typeof renderLesson   === "function") renderLesson();
    if (typeof renderSidebar  === "function") renderSidebar();

    saveData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectCourse(courseId) {
    if (!coursesDB[courseId]) {
        console.warn(`[LearnToCode] Course "${courseId}" not found in coursesDB.`);
        return;
    }
    currentCourseId  = courseId;
    currentModuleIdx = 0;
    currentLessonIdx = 0;
    quizState.active = false;

    ensureCourseData(courseId);
    saveData();

    if (typeof renderLesson   === "function") renderLesson();
    if (typeof renderSidebar  === "function") renderSidebar();
    if (typeof renderCourseHeader === "function") renderCourseHeader();
}

function goToNextLesson() {
    completeLesson();

    const course  = coursesDB[currentCourseId];
    const module  = course?.modules[currentModuleIdx];
    if (!module) return;

    if (currentLessonIdx < module.lessons.length - 1) {
        currentLessonIdx++;
        selectLesson(currentModuleIdx, currentLessonIdx);
    } else {
        // Останній урок модуля — показуємо квіз
        const lessonContent = document.querySelector('.lesson-content');
        if (lessonContent) lessonContent.classList.add('show-quiz');
        initQuiz();
    }
}

function goToNextModule() {
    const course = coursesDB[currentCourseId];
    if (!course) return;

    if (currentModuleIdx < course.modules.length - 1) {
        currentModuleIdx++;
        currentLessonIdx = 0;
        quizState.active = false;

        const lessonContent = document.querySelector('.lesson-content');
        if (lessonContent) lessonContent.classList.remove('show-quiz');

        selectLesson(currentModuleIdx, 0);
    } else {
        showCourseCompletionScreen();
    }
}

function showCourseCompletionScreen() {
    const meta    = COURSE_META[currentCourseId] || {};
    const course  = coursesDB[currentCourseId];
    const total   = course?.totalLessons || 0;
    const stars   = userStats.perfectQuizzes[currentCourseId]?.length || 0;

    const container = document.querySelector('.main-content') ||
                      document.getElementById('main-content');
    if (!container) return;

    container.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            padding: 40px 20px;
        ">
            <div style="font-size: 72px; margin-bottom: 16px; animation: pulse 2s infinite;">${meta.icon || '🎓'}</div>
            <h1 style="color: ${meta.color || '#4fc3f7'}; font-size: 32px; font-weight: 900; margin-bottom: 8px;">
                Course Complete!
            </h1>
            <h2 style="color: #f1f5f9; font-size: 20px; font-weight: 600; margin-bottom: 24px;">
                ${course?.title || currentCourseId}
            </h2>
            <div style="display: flex; gap: 20px; margin-bottom: 32px; flex-wrap: wrap; justify-content: center;">
                <div style="background: rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 24px; min-width: 110px;">
                    <div style="font-size: 28px; font-weight: 800; color: #f1f5f9;">${total}</div>
                    <div style="font-size: 12px; color: #9ca3af; margin-top: 4px;">Lessons</div>
                </div>
                <div style="background: rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 24px; min-width: 110px;">
                    <div style="font-size: 28px; font-weight: 800; color: #f5a623;">${stars} ⭐</div>
                    <div style="font-size: 12px; color: #9ca3af; margin-top: 4px;">Perfect Quizzes</div>
                </div>
                <div style="background: rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 24px; min-width: 110px;">
                    <div style="font-size: 28px; font-weight: 800; color: ${meta.color || '#4fc3f7'};">${userStats.level}</div>
                    <div style="font-size: 12px; color: #9ca3af; margin-top: 4px;">Level</div>
                </div>
            </div>
            <p style="color: #9ca3af; font-size: 15px; max-width: 460px; line-height: 1.7; margin-bottom: 32px;">
                You've mastered every lesson and conquered every challenge. The knowledge is yours — now build something extraordinary.
            </p>
            <button onclick="selectCourse('${currentCourseId === 'cpp-advanced' ? 'cybersecurity' : 'cpp-advanced'}')" style="
                background: linear-gradient(135deg, ${meta.color || '#4fc3f7'}, #0ea5e9);
                border: none;
                color: #fff;
                font-size: 16px;
                font-weight: 800;
                padding: 14px 32px;
                border-radius: 12px;
                cursor: pointer;
                transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Start Next Course →
            </button>
        </div>
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50%       { transform: scale(1.08); }
            }
        </style>
    `;
}

// ═══════════════════════════════════════════════════════════════════
// 12. ПРОГРЕС ПАНЕЛЬ (опціонально, якщо є в DOM)
// ═══════════════════════════════════════════════════════════════════

function renderProgressPanel() {
    const panel = document.getElementById('progress-panel');
    if (!panel) return;

    const completed = (userStats.completedLessons[currentCourseId] || []).length;
    const total     = coursesDB[currentCourseId]?.totalLessons || 0;
    const xpNow     = userStats.xp;
    const xpNeeded  = xpForLevel(userStats.level);

    panel.innerHTML = `
        <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">

            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="
                    width: 46px; height: 46px;
                    background: linear-gradient(135deg, #f5a623, #e07b10);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 20px; font-weight: 900; color: #fff;
                ">${userStats.level}</div>
                <div>
                    <div style="color: #f1f5f9; font-weight: 700; font-size: 14px;">Level ${userStats.level}</div>
                    <div style="color: #9ca3af; font-size: 12px;">${xpNow} / ${xpNeeded} XP to next</div>
                </div>
            </div>

            <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="color: #9ca3af; font-size: 12px;">XP Progress</span>
                    <span style="color: #f5a623; font-size: 12px; font-weight: 600;">${Math.round((xpNow/xpNeeded)*100)}%</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); border-radius: 999px; height: 8px; overflow: hidden;">
                    <div id="growth-fill" style="
                        height: 100%;
                        width: ${Math.round((xpNow/xpNeeded)*100)}%;
                        background: linear-gradient(90deg, #f5a623, #ffca2c);
                        border-radius: 999px;
                        transition: width 0.6s ease;
                    "></div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${[
                    ['🔥', 'Streak',    `${userStats.streak}d`],
                    ['⭐', 'Stars',     userStats.stars],
                    ['✅', 'Lessons',   `${completed}/${total}`],
                    ['🏆', 'Badges',    userStats.achievements.length],
                ].map(([icon, label, val]) => `
                    <div style="
                        background: rgba(255,255,255,0.04);
                        border: 1px solid rgba(255,255,255,0.08);
                        border-radius: 10px;
                        padding: 12px;
                        text-align: center;
                    ">
                        <div style="font-size: 20px; margin-bottom: 4px;">${icon}</div>
                        <div style="color: #f1f5f9; font-weight: 700; font-size: 15px;">${val}</div>
                        <div style="color: #9ca3af; font-size: 11px;">${label}</div>
                    </div>
                `).join('')}
            </div>

            ${userStats.achievements.length > 0 ? `
                <div>
                    <div style="color: #9ca3af; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Recent Badges</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${userStats.achievements.slice(-6).map(id => {
                            const def = ACHIEVEMENTS_DEF[id];
                            return `<span title="${def?.title || id}: ${def?.desc || ''}" style="
                                font-size: 22px;
                                cursor: help;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'">${def?.icon || '🏅'}</span>`;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// ═══════════════════════════════════════════════════════════════════
// 13. TOAST-СПОВІЩЕННЯ (замість alert())
// ═══════════════════════════════════════════════════════════════════

const TOAST_COLORS = {
    success:  { bg: 'rgba(0,213,39,0.15)',   border: '#00d527', text: '#00d527' },
    warning:  { bg: 'rgba(255,202,44,0.15)', border: '#ffca2c', text: '#ffca2c' },
    error:    { bg: 'rgba(232,64,64,0.15)',  border: '#e84040', text: '#e84040' },
    info:     { bg: 'rgba(79,195,247,0.15)', border: '#4fc3f7', text: '#4fc3f7' },
    xp:       { bg: 'rgba(245,166,35,0.15)', border: '#f5a623', text: '#f5a623' },
    "level-up": { bg: 'rgba(167,139,250,0.2)', border: '#a78bfa', text: '#a78bfa' },
};

let toastQueue = [];
let toastVisible = false;

function showToast(message, type = "info") {
    toastQueue.push({ message, type });
    if (!toastVisible) processToastQueue();
}

function processToastQueue() {
    if (toastQueue.length === 0) { toastVisible = false; return; }
    toastVisible = true;

    const { message, type } = toastQueue.shift();
    const colors = TOAST_COLORS[type] || TOAST_COLORS.info;

    const existing = document.getElementById('ltc-toast');
    if (existing) existing.remove();

    const toast       = document.createElement('div');
    toast.id          = 'ltc-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 28px;
        background: ${colors.bg};
        border: 1px solid ${colors.border};
        border-radius: 12px;
        padding: 14px 20px;
        color: ${colors.text};
        font-size: 14px;
        font-weight: 600;
        max-width: 340px;
        z-index: 9999;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => { toast.remove(); processToastQueue(); }, 400);
    }, 2800);
}

// ═══════════════════════════════════════════════════════════════════
// 14. АНІМАЦІЇ
// ═══════════════════════════════════════════════════════════════════

function triggerLevelUpAnimation() {
    const overlay       = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    document.body.appendChild(overlay);

    // Конфеті
    const colors = ['#f5a623', '#4fc3f7', '#00d527', '#a78bfa', '#ff4b4b', '#ffca2c'];
    for (let i = 0; i < 60; i++) {
        const piece       = document.createElement('div');
        const color       = colors[Math.floor(Math.random() * colors.length)];
        const size        = Math.random() * 8 + 6;
        const startX      = Math.random() * 100;
        const duration    = Math.random() * 2000 + 1500;
        const delay       = Math.random() * 800;

        piece.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startX}vw;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation: confettiFall ${duration}ms ${delay}ms linear forwards;
            opacity: 0;
        `;
        overlay.appendChild(piece);
    }

    const style       = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0%   { transform: translateY(0) rotate(0deg);    opacity: 1; }
            100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => { overlay.remove(); style.remove(); }, 4000);
}

// ═══════════════════════════════════════════════════════════════════
// 15. КНОПКИ ТА ПОДІЇ
// ═══════════════════════════════════════════════════════════════════

/**
 * Безпечне підключення події до елементу (не падає якщо елемент відсутній).
 */
function bindButton(selector, event, handler) {
    const el = typeof selector === 'string'
        ? (document.querySelector(selector) || document.getElementById(selector.replace(/^[.#]/, '')))
        : selector;
    if (el) el.addEventListener(event, handler);
    return el;
}

// Кнопка IDE
bindButton('.btn-try', 'click', () => {
    const courseIDE = { "cpp-advanced": "cpp_ide.html", "cybersecurity": "sandbox.html" };
    window.open(courseIDE[currentCourseId] || 'ide.html', '_blank');
});

// Кнопка "Next Lesson"
bindButton('.btn-nav.next', 'click', goToNextLesson);

// Кнопка "Prev Lesson"
bindButton('.btn-nav.prev', 'click', () => {
    if (currentLessonIdx > 0) {
        currentLessonIdx--;
        selectLesson(currentModuleIdx, currentLessonIdx);
    } else if (currentModuleIdx > 0) {
        currentModuleIdx--;
        const prevModule = coursesDB[currentCourseId]?.modules[currentModuleIdx];
        currentLessonIdx = (prevModule?.lessons?.length || 1) - 1;
        selectLesson(currentModuleIdx, currentLessonIdx);
    }
});

// Клавіатурна навігація (Ctrl+→ / Ctrl+←)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'ArrowRight') { e.preventDefault(); goToNextLesson(); }
    if (e.ctrlKey && e.key === 'ArrowLeft')  {
        e.preventDefault();
        bindButton('.btn-nav.prev', 'click', null); // тригер через логіку вище
        if (currentLessonIdx > 0) {
            currentLessonIdx--;
            selectLesson(currentModuleIdx, currentLessonIdx);
        }
    }
});

// ═══════════════════════════════════════════════════════════════════
// 16. ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ
// ═══════════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
    ensureCourseData(currentCourseId);

    // Трек часу сесії
    userStats.sessionStart = Date.now();

    // Night owl ачівка
    checkAchievements();

    updateUI();
    renderProgressPanel();

    if (typeof renderSidebar  === "function") renderSidebar();
    if (typeof renderLesson   === "function") renderLesson();

    // Зберігаємо час, проведений за навчанням, при закритті
    window.addEventListener('beforeunload', () => {
        if (userStats.sessionStart) {
            const minutes = Math.round((Date.now() - userStats.sessionStart) / 60000);
            userStats.totalTimeSpent = (userStats.totalTimeSpent || 0) + minutes;
            saveData();
        }
    });

    // Backward compat: window.onload flow (якщо хтось ще використовує)
    if (typeof window.onload === "function") {
        const old = window.onload;
        window.onload = () => { old(); };
    }
});

// ═══════════════════════════════════════════════════════════════════
// 17. ПУБЛІЧНЕ API (для зовнішніх модулів та рендерерів)
// ═══════════════════════════════════════════════════════════════════

window.LTC = {
    // Стан
    get courseId()    { return currentCourseId;  },
    get moduleIdx()   { return currentModuleIdx; },
    get lessonIdx()   { return currentLessonIdx; },
    get stats()       { return userStats;        },
    get quizState()   { return quizState;        },

    // Методи навігації
    selectLesson,
    selectCourse,
    goToNextLesson,
    goToNextModule,

    // Методи прогресу
    completeLesson,
    addXP,
    unlockAchievement,
    checkAchievements,

    // Квіз
    initQuiz,
    submitQuiz,
    retryQuiz,
    selectQuizAnswer,

    // UI
    updateUI,
    showToast,
    renderProgressPanel,
    showAchievementModal,

    // Утиліти
    totalCompleted,
    xpForLevel,
    ensureCourseData,
    saveData,

    // Конфігурація
    CONFIG,
    COURSE_META,
    ACHIEVEMENTS_DEF,
};
