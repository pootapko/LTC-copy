import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError("Passwords do not match! Please check your input.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: displayName,
                email: email,
                level: 1,
                xp: 0,
                maxXp: 500,
                streak: 0,
                progress: "0/12",
                achievements: 0,
                stars: 0,
                isPremium: false,
                createdAt: new Date()
            });

            await sendEmailVerification(user);
            await signOut(auth);

            setMessage("Registration successful! Please check your email (and spam folder) to verify your account before logging in.");
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setDisplayName('');

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("This email is already registered. Please log in or use a different email.");
            } else {
                setError("Registration failed. Please try again later.");
            }
        }
    };

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src="/icons/icon.svg" alt="Icon" className="logo-icon" />
                    <span className="logo-text">learntocode</span>
                </div>
            </header>

            <main className="hero">
                <div className="auth-container">
                    <nav className="auth-nav">
                        <Link to="/login" className="auth-nav-link">Log in</Link>
                        <span className="separator">/</span>
                        <Link to="/signup" className="auth-nav-link active">Create an account</Link>
                    </nav>

                    <div className="auth-box">
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {error && <div style={{ color: '#ff4c4c', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
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
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="confirm password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="display name"
                                required
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />

                            <button type="submit" className="auth-button" style={{ marginTop: '20px' }}>Sign up</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Signup;