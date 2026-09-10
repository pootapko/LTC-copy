import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                await signOut(auth);
                setError("Please verify your email before logging in. Check your inbox and spam folder.");
                return;
            }

            navigate('/courses');
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setMessage('');

        if (!email) {
            setError("Please enter your email address first to reset your password.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Please check your inbox and spam folder.");
        } catch (error) {
            setError("Failed to send password reset email. Please check if the email is correct.");
        }
    };

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src="icons/icon.svg" alt="Icon" className="logo-icon" />
                    <span className="logo-text">learntocode</span>
                </div>
            </header>

            <main className="hero">
                <div className="auth-container">
                    <nav className="auth-nav">
                        <Link to="/login" className="auth-nav-link active">Log in</Link>
                        <span className="separator">/</span>
                        <Link to="/signup" className="auth-nav-link">Create an account</Link>
                    </nav>

                    <div className="auth-box">
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {error && <div style={{ color: '#ff4c4c', marginBottom: '15px', fontSize: '14px', lineHeight: '1.4' }}>{error}</div>}
                            {message && <div style={{ color: '#00e676', marginBottom: '15px', fontSize: '14px', lineHeight: '1.4' }}>{message}</div>}

                            <input
                                type="email"
                                className="auth-input"
                                placeholder="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                className="auth-input"
                                placeholder="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div style={{ textAlign: 'right', marginTop: '-10px', marginBottom: '15px' }}>
                                <span
                                    onClick={handleResetPassword}
                                    style={{ color: '#00e676', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
                                >
                                    Forgot password?
                                </span>
                            </div>

                            <div className="remember-me">
                                <input type="checkbox" id="remember" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>

                            <button type="submit" className="auth-button">Log in</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;