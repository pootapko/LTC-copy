import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="landing-page">
            <header className="header transparent-header">
                <div className="logo">
                    <img src="icons/icon.svg" alt="Icon" className="logo-icon" />
                    <span className="logo-text">learntocode</span>
                </div>
                <div className="header-actions">
                    <Link to="/login" className="login-link-header">Log in</Link>
                </div>
            </header>

            <main className="hero">
                <div className="hero-content">
                    <div className="badge">
                        <img src="/img/landing_rocket.png" alt="Rocket" className="badge-icon" />
                        V 1.0 is Live
                    </div>

                    <h1 className="title">
                        Code. <span className="accent" style={{ color: '#00D527', textShadow: '0 0 15px rgba(0, 213, 39, 0.4)' }}>Evolve.</span> Dominate.
                    </h1>
                    <p className="subtitle">
                        Level up your programming skills in C++, Python, and Web Dev. <br />
                        Complete challenges, earn XP, and hatch your own cyber-dragon.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/signup" className="auth-button primary-glow">Start Your Journey</Link>
                    </div>

                    <div className="features-row">
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <img src="/img/landing_dragon.png" alt="Cyber Dragon" className="feature-icon-img" />
                            </div>
                            <span>Grow your Dragon</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <img src="/img/landing_trophy.png" alt="Global Trophy" className="feature-icon-img" />
                            </div>
                            <span>Global Leaderboard</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <img src="/img/landing_lock.png" alt="Security Lock" className="feature-icon-img" />
                            </div>
                            <span>Real-world Challenges</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="glow-orb"></div>
                </div>
            </main>
        </div>
    );
}

export default Landing;