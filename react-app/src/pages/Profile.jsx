import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Profile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);


    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [userData, setUserData] = useState({
        uid: '', name: '', email: '', bio: '', photoURL: 'icons/profile picture.svg',
        level: 1, xp: 0, stars: 0, streak: 1,
        achievements: [], completedLessons: {}, joinedDate: '', nextLevelXp: 500,
        isPremium: false,
    });


    const [editName, setEditName] = useState('');
    const [editBio, setEditBio] = useState('');
    const [editError, setEditError] = useState('');
    const [editOk, setEditOk] = useState(false);

    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwOk, setPwOk] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) { navigate('/login'); return; }
            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                const d = snap.exists() ? snap.data() : {};
                const joinDate = user.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    : 'Recently';
                const lvl = d.level ?? 1;

                setUserData({
                    uid: user.uid,
                    name: d.name || 'Learner',
                    email: user.email || '',
                    bio: d.bio || 'Passionate about learning to code!',
                    photoURL: d.photoURL || 'icons/profile picture.svg',
                    level: lvl,
                    xp: d.xp ?? 0,
                    stars: d.stars ?? 0,
                    streak: d.streak ?? 1,
                    achievements: d.achievements ?? [],
                    completedLessons: d.completedLessons ?? {},
                    joinedDate: joinDate,
                    nextLevelXp: lvl * 500,
                    isPremium: d.isPremium ?? false,
                });
                setEditName(d.name || '');
                setEditBio(d.bio || '');
            } catch (e) { console.warn('Profile load error:', e); }
        });
        return () => unsub();
    }, [navigate]);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !auth.currentUser) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        const imgbbApiKey = "8ed6fad837e3e0204cd8d088eb99c123";

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                const photoURL = data.data.url;

                const userDocRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userDocRef, { photoURL: photoURL });

                setUserData(prev => ({ ...prev, photoURL: photoURL }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    async function handleSaveEdit() {
        setEditError('');
        if (!editName.trim()) { setEditError('Name cannot be empty'); return; }
        try {
            await updateDoc(doc(db, 'users', userData.uid), {
                name: editName.trim(),
                bio: editBio.trim(),
            });
            setUserData(u => ({ ...u, name: editName.trim(), bio: editBio.trim() }));
            setEditOk(true);
            setTimeout(() => { setEditOk(false); setShowEditModal(false); }, 1500);
        } catch (e) { setEditError('Failed to save. Try again.'); }
    }

    async function handleChangePassword() {
        setPwError('');
        if (!currentPw || !newPw || !confirmPw) { setPwError('Fill in all fields'); return; }
        if (newPw !== confirmPw) { setPwError('New passwords do not match'); return; }
        if (newPw.length < 6) { setPwError('Minimum 6 characters'); return; }
        setPwLoading(true);
        try {
            const user = auth.currentUser;
            await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPw));
            await updatePassword(user, newPw);
            setPwOk(true);
            setCurrentPw(''); setNewPw(''); setConfirmPw('');
            setTimeout(() => { setPwOk(false); setShowPasswordModal(false); }, 2000);
        } catch (e) {
            setPwError(e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential'
                ? 'Current password is incorrect'
                : 'Failed to change password. Try again.');
        } finally { setPwLoading(false); }
    }

    const totalLessons = Object.values(userData.completedLessons).flat().length;
    const xpPct = Math.min(Math.round((userData.xp / (userData.nextLevelXp || 500)) * 100), 100);

    return (
        <div className="profile-page-wrapper">
            <header className="header">
                <div className="logo" onClick={() => navigate('/courses')} style={{ cursor: 'pointer' }}>
                    <img src="icons/icon.svg" alt="Icon" className="logo-icon" />
                    <span className="logo-text">learntocode</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {!userData.isPremium && (
                        <button
                            className="btn-dashboard"
                            style={{ background: '#f59e0b', color: '#0a0f16', fontWeight: 700 }}
                            onClick={() => navigate('/premium')}
                        >
                            Get Premium
                        </button>
                    )}
                    {userData.isPremium && (
                        <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '14px' }}>
                            Premium Active
                        </span>
                    )}
                    <button className="btn-dashboard" onClick={() => navigate('/courses')}>Dashboard</button>
                </div>
            </header>

            <main className="profile-container">
                <section className="profile-card user-card">
                    <div className="profile-main-info">

                        <div onClick={handleAvatarClick} style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}>
                            <div style={{ padding: '6px', backgroundColor: '#1a1d24', borderRadius: '50%', display: 'inline-block' }}>
                                <img
                                    src={userData.photoURL}
                                    alt="Avatar"
                                    className="avatar-img"
                                    style={{ opacity: uploading ? 0.5 : 1, objectFit: 'cover', display: 'block', width: '120px', height: '120px', borderRadius: '50%' }}
                                />
                            </div>
                            <div style={{ position: 'absolute', bottom: '5px', right: '5px', backgroundColor: '#1a1d24', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ backgroundColor: '#00d527', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </div>
                            </div>
                            {uploading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '14px', zIndex: 3, fontWeight: 'bold' }}>...</div>}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>

                        <div className="profile-text-content">
                            <div className="profile-header-top">
                                <div className="profile-titles">
                                    <h2 className="profile-name">{userData.name}</h2>
                                    <span className="profile-level">Level {userData.level}</span>
                                </div>
                                <button className="btn-outline" onClick={() => setShowEditModal(true)}>Edit profile</button>
                            </div>
                            <div className="profile-details">
                                <div className="detail-item"><img src="img/letter.svg" alt="Mail" /> {userData.email}</div>
                                <div className="detail-item"><img src="img/calendar.svg" alt="Calendar" /> Joined {userData.joinedDate}</div>
                            </div>
                        </div>
                    </div>
                    <p className="profile-bio">{userData.bio}</p>
                </section>

                <section className="profile-card">
                    <div className="card-header-flex">
                        <h3 className="security-title"><img src="img/lock green.svg" alt="Lock" /> Security</h3>
                        <button className="btn-outline" onClick={() => setShowPasswordModal(true)}>Change password</button>
                    </div>
                </section>

                <section className="profile-card">
                    <h3 className="journey-title">Learning journey</h3>
                    <div className="progress-block">
                        <div className="progress-labels">
                            <span>XP progress</span>
                            <span className="progress-percent">{userData.xp}/{userData.nextLevelXp} XP</span>
                        </div>
                        <div className="progress-bar-wrap">
                            <div className="progress-fill" style={{ width: `${xpPct}%` }} />
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-box"><span className="stat-label">Lessons done</span><span className="stat-value">{totalLessons}</span></div>
                        <div className="stat-box"><span className="stat-label">Streak</span><span className="stat-value">🔥 {userData.streak}d</span></div>
                        <div className="stat-box"><span className="stat-label">Stars</span><span className="stat-value">⭐ {userData.stars}</span></div>
                        <div className="stat-box"><span className="stat-label">Achievements</span><span className="stat-value">🏆 {userData.achievements.length}</span></div>
                    </div>
                </section>
            </main>


            {showEditModal && (
                <div className="pmodal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="pmodal-box" onClick={e => e.stopPropagation()}>
                        <h2 className="pmodal-title">Edit Profile</h2>
                        <label className="pmodal-label">Display name</label>
                        <input className="pmodal-input" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Your name" maxLength={40} />
                        <label className="pmodal-label">Bio</label>
                        <textarea className="pmodal-input pmodal-textarea" value={editBio} onChange={e => setEditBio(e.target.value)} placeholder="A short bio..." maxLength={200} rows={3} />
                        {editError && <p className="pmodal-error">{editError}</p>}
                        {editOk && <p className="pmodal-ok">✅ Saved!</p>}
                        <div className="pmodal-actions">
                            <button className="pmodal-btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="pmodal-btn-save" onClick={handleSaveEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="pmodal-overlay" onClick={() => setShowPasswordModal(false)}>
                    <div className="pmodal-box" onClick={e => e.stopPropagation()}>
                        <h2 className="pmodal-title">Change Password</h2>
                        <label className="pmodal-label">Current password</label>
                        <input className="pmodal-input" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" />
                        <label className="pmodal-label">New password</label>
                        <input className="pmodal-input" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="••••••••" />
                        <label className="pmodal-label">Confirm new password</label>
                        <input className="pmodal-input" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="••••••••" />
                        {pwError && <p className="pmodal-error">{pwError}</p>}
                        {pwOk && <p className="pmodal-ok">✅ Password changed!</p>}
                        <div className="pmodal-actions">
                            <button className="pmodal-btn-cancel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                            <button className="pmodal-btn-save" onClick={handleChangePassword} disabled={pwLoading}>
                                {pwLoading ? 'Saving...' : 'Update password'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .pmodal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:9999;animation:pmFI .2s ease}
                @keyframes pmFI{from{opacity:0}to{opacity:1}}
                .pmodal-box{background:#111827;border:1px solid rgba(255,255,255,.05);border-radius:16px;padding:32px;width:100%;max-width:440px;display:flex;flex-direction:column;gap:12px;box-shadow:0 0 40px rgba(0,0,0,0.3);animation:pmPI .25s cubic-bezier(.175,.885,.32,1.275)}
                @keyframes pmPI{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
                .pmodal-title{font-size:20px;font-weight:700;color:#f8fafc;margin:0 0 8px}
                .pmodal-label{font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:-4px}
                .pmodal-input{background:#0f172a;border:1px solid #334155;border-radius:8px;color:#f8fafc;padding:12px 14px;font-size:14px;outline:none;width:100%;box-sizing:border-box;transition:border-color .2s, box-shadow .2s;font-family:inherit;resize:none}
                .pmodal-input:focus{border-color:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.2)}
                .pmodal-textarea{min-height:80px}
                .pmodal-error{color:#e84040;font-size:13px;margin:0}
                .pmodal-ok{color:#22c55e;font-size:13px;margin:0}
                .pmodal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px}
                .pmodal-btn-cancel{background:transparent;border:1px solid rgba(255,255,255,.1);color:#94a3b8;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;transition:all .2s}
                .pmodal-btn-cancel:hover{color:#f8fafc;border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.05)}
                .pmodal-btn-save{background:#22c55e;border:none;color:#0b1120;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:700;transition:all .2s}
                .pmodal-btn-save:hover:not(:disabled){background:#4ade80;box-shadow:0 4px 15px rgba(34,197,94,.3)}
                .pmodal-btn-save:disabled{opacity:.5;cursor:not-allowed}
            `}</style>
        </div>
    );
}

export default Profile;