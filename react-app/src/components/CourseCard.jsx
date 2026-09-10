import { useNavigate } from 'react-router-dom';

function CourseCard({ title, badgeText, badgeType, description, meta, status, isHighlight, courseId }) {
    const navigate = useNavigate();
    const isLocked = status === 'locked';
    const cardClass = `course-card ${status} ${isHighlight ? 'highlight' : ''}`;

    function handleStart() {
        if (!isLocked && courseId) {
            navigate(`/lesson?course=${courseId}`);
        }
    }

    return (
        <article className={cardClass} style={{ position: 'relative' }}>
            {isLocked && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(10,15,22,0.72)',
                    borderRadius: 'inherit', zIndex: 2,
                    gap: '8px'
                }}>
                    <span style={{ fontSize: '2rem' }}>🔒</span>
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>
                        Premium only
                    </span>
                    <button
                        style={{
                            marginTop: '6px', padding: '7px 18px',
                            background: '#f59e0b', border: 'none', borderRadius: '8px',
                            color: '#0a0f16', fontWeight: 700, fontSize: '13px',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/premium')}
                    >
                        Unlock Premium
                    </button>
                </div>
            )}

            <div className="course-info">
                <h3>{title} <span className={`badge ${badgeType}`}>{badgeText}</span></h3>
                <p>{description}</p>
                <span className="lessons-count">{meta}</span>
                <div className="progress-bar-wrap">
                    <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
            </div>

            <button
                className="btn-start"
                onClick={handleStart}
                disabled={isLocked}
            >
                START COURSE
            </button>
            <button className="btn-locked" disabled={isLocked}>Locked</button>
        </article>
    );
}

export default CourseCard;