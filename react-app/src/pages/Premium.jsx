import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';


const Premium = () => {
    const [selectedPlan, setSelectedPlan] = useState('monthly');

    const navigate = useNavigate();
    const handleUpgrade = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    isPremium: true
                });

                alert("Congratulations! You have successfully upgraded to Premium!");
                navigate('/courses');
            } catch (error) {
                console.error("Error updating status:", error);
            }
        }
    };


    return (
        <div className="premium-layout">

            <Link to="/courses" className="premium-back-link">
                <img src="/icons/arrow-left-from-line-svgrepo-com.svg" alt="Back" className="feature-icon" onError={(e) => e.target.style.display = 'none'} />
                Back to Dashboard
            </Link>

            <div className="premium-header-section">
                <div className="premium-header-icon">
                    <img src="/icons/crownblack.svg" alt="Crown" className="premium-icon-img" />
                </div>

                <h1 className="premium-title">Upgrade to Premium <span style={{ color: '#ff4c4c' }}></span></h1>
                <p className="premium-subtitle">Unlock your full potential and master programming</p>
            </div>

            <div className="premium-cards-container">

                <div
                    className={`premium-card ${selectedPlan === 'monthly' ? 'active' : ''}`}
                    onClick={() => setSelectedPlan('monthly')}
                >
                    <div className="premium-plan-name">Monthly</div>
                    <div className="premium-price-block">
                        <span className="premium-price">$9.99</span><span className="premium-period">/month</span>
                    </div>
                    <div className="premium-billed-info">Billed monthly</div>
                    <div className="premium-save-info"></div>

                    <ul className="premium-features">
                        <li><img src="/icons/check-svgrepo-com.svg" alt="Check" className="feature-icon" /> All premium courses</li>
                        <li><img src="/icons/check-svgrepo-com.svg" alt="Check" className="feature-icon" /> Unlimited access</li>
                        <li><img src="/icons/check-svgrepo-com.svg" alt="Check" className="feature-icon" /> Cancel anytime</li>
                    </ul>

                    {selectedPlan === 'monthly' && <div className="premium-selected-btn">✓ Selected</div>}
                </div>

                <div
                    className={`premium-card ${selectedPlan === 'yearly' ? 'active' : ''}`}
                    onClick={() => setSelectedPlan('yearly')}
                >
                    <div className="premium-badge">Save 40%</div>
                    <div className="premium-plan-name">Yearly</div>
                    <div className="premium-price-block">
                        <span className="premium-price">$59.99</span><span className="premium-period">/year</span>
                    </div>
                    <div className="premium-billed-info">$5/month billed annually</div>
                    <div className="premium-save-info">Save $60 per year!</div>

                    <ul className="premium-features">
                        <li><img src="/icons/check-svgrepo-com.svg" alt="Check" className="feature-icon" /> All premium courses</li>
                        <li><img src="/icons/check-svgrepo-com.svg" alt="Check" className="feature-icon" /> Unlimited access</li>
                        <li><img src="/icons/check-svgrepo-com.svg" alt="Check" className="feature-icon" /> Priority support</li>
                        <li style={{ color: '#ff4c4c' }}>
                            <img src="/icons/star-alt-4-svgrepo-com.svg" alt="Star" className="feature-icon" />
                            Exclusive yearly badge
                        </li>
                    </ul>

                    {selectedPlan === 'yearly' && <div className="premium-selected-btn">✓ Selected</div>}
                </div>

            </div>

            <button className="premium-main-btn" onClick={handleUpgrade}>
                <img src="/icons/crownblack.svg" alt="Crown" className="btn-icon" />
                Upgrade to Premium
            </button>
            <p className="premium-guarantee-text">30-day money return guarantee</p>
        </div>
    );
};

export default Premium;