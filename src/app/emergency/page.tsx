'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, AlertTriangle, MapPin, Heart, Pill, Hospital } from 'lucide-react';
import { emergencyProfile, ESCALATION } from '@/lib/mockData';

export default function EmergencyPage() {
    const [step, setStep] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                const next = prev + 1;
                if (next >= ESCALATION.GENTLE_PROMPT && step < 1) setStep(1);
                if (next >= ESCALATION.NURSE_CALL && step < 2) setStep(2);
                if (next >= ESCALATION.EMERGENCY_911 && step < 3) setStep(3);
                return next;
            });
        }, 1000);

        if (step >= 3 && timer > ESCALATION.EMERGENCY_911 + 5) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [step, timer]);

    const resetDemo = () => {
        setStep(0);
        setTimer(0);
    };

    return (
        <div className="emergency-screen">
            <div className="page-header">
                <Link href="/" className="back-btn"><ArrowLeft size={20} /></Link>
                <h1>Emergency Response Demo</h1>
            </div>

            <div className="page">
                {/* Timer */}
                <div className="card" style={{ textAlign: 'center', background: step >= 3 ? 'rgba(239, 68, 68, 0.10)' : undefined }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Time since inactivity detected
                    </p>
                    <p style={{ fontSize: '3rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: step >= 2 ? 'var(--status-red)' : 'var(--text-primary)' }}>
                        {timer}s
                    </p>
                </div>

                {/* Step 0: Active Session */}
                <div className={`emergency-step ${step >= 0 ? 'visible' : ''}`}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Heart size={18} color="var(--accent-teal)" />
                            <span className="card-title">Active Exercise Session</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Maria is on her 20-minute moderate walk. Heart rate: 108 bpm.
                            {step === 0 && <span className="alert-pulse"> Gyroscope monitoring movement...</span>}
                            {step >= 1 && <span style={{ color: 'var(--status-red)' }}> ⚠ No movement detected.</span>}
                        </p>
                    </div>
                </div>

                {/* Step 1: Gentle Prompt (30s) */}
                <div className={`emergency-step ${step >= 1 ? 'visible' : ''}`}>
                    <div className="card" style={{ borderColor: 'var(--status-yellow)', borderWidth: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <AlertTriangle size={18} color="var(--status-yellow)" />
                            <span style={{ fontWeight: 700, color: 'var(--status-yellow)' }}>LEVEL 1 — Screen Prompt ({ESCALATION.GENTLE_PROMPT}s)</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                            📳 Phone vibrates<br />
                            &ldquo;Maria, are you resting? Tap to confirm you&apos;re okay.&rdquo;
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            <button className="btn btn-outline btn-sm" onClick={resetDemo}>Tap — I&apos;m okay</button>
                        </div>
                    </div>
                </div>

                {/* Step 2: Nurse Call (45s) */}
                <div className={`emergency-step ${step >= 2 ? 'visible' : ''}`}>
                    <div className="card" style={{ borderColor: 'var(--accent-coral)', borderWidth: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Phone size={18} color="var(--accent-coral)" className="alert-pulse" />
                            <span style={{ fontWeight: 700, color: 'var(--accent-coral)' }}>LEVEL 2 — Nurse Auto-Call ({ESCALATION.NURSE_CALL}s)</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                            📞 Auto-dialing <strong>Nurse Sarah Nguyen</strong>...<br />
                            Screen shows: &ldquo;Calling your nurse...&rdquo;<br />
                            Nurse sees: <em>&ldquo;ALERT: Maria unresponsive during exercise&rdquo;</em>
                        </p>
                    </div>
                </div>

                {/* Step 3: 911 (75s) */}
                <div className={`emergency-step ${step >= 3 ? 'visible' : ''}`}>
                    <div className="card" style={{ borderColor: 'var(--status-red)', borderWidth: 2, background: 'rgba(239, 68, 68, 0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Hospital size={18} color="var(--status-red)" className="alert-pulse" />
                            <span style={{ fontWeight: 700, color: 'var(--status-red)' }}>LEVEL 3 — 911 Auto-Dispatch ({ESCALATION.EMERGENCY_911}s)</span>
                        </div>

                        <div className="data-packet">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 'var(--space-sm)' }}>
                                <MapPin size={14} /> <strong>Data sent to 911:</strong>
                            </div>
                            <p><strong>Patient:</strong> {emergencyProfile.name}, {emergencyProfile.age}</p>
                            <p><strong>Address:</strong> {emergencyProfile.address}</p>
                            <p><strong>History:</strong> {emergencyProfile.cardiacHistory}</p>
                            <p><Pill size={12} style={{ display: 'inline', marginRight: 4 }} /><strong>Meds:</strong> {emergencyProfile.medications}</p>
                            <p><strong>Current HR:</strong> 108 bpm → No signal</p>
                            <p><strong>Hospital:</strong> {emergencyProfile.preferredHospital}</p>
                        </div>

                        <div style={{ marginTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <div className="badge badge-red" style={{ alignSelf: 'flex-start' }}>
                                🚑 EMS Dispatched
                            </div>
                            <div className="badge badge-yellow" style={{ alignSelf: 'flex-start' }}>
                                📱 Daughter Sarah Garcia — auto-called
                            </div>
                            <div className="badge badge-yellow" style={{ alignSelf: 'flex-start' }}>
                                👨‍⚕️ Dr. Patel — notified
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reset */}
                <button className="btn btn-outline btn-full" onClick={resetDemo} style={{ marginTop: 'var(--space-lg)' }}>
                    Reset Demo
                </button>

                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 'var(--space-md)', lineHeight: 1.6 }}>
                    Total time from collapse to 911: under 90 seconds.<br />
                    Prompt → Nurse call → 911 with full medical profile.
                </p>
            </div>
        </div>
    );
}
