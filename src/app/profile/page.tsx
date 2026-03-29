'use client';

import Link from 'next/link';
import { ArrowLeft, Hospital, Pill, Dumbbell, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { patient, careSchedule } from '@/lib/mockData';

export default function ProfilePage() {
    return (
        <div className="page">
            <div className="page-header">
                <h1>Profile</h1>
            </div>

            {/* Patient Card */}
            <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-sm)' }}>{patient.avatar}</div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                    {patient.firstName} {patient.lastName}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {patient.diagnosis}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 4 }}>
                    Week {patient.currentWeek} of {patient.totalWeeks} · {patient.sessionsCompleted}/{patient.totalSessions} sessions
                </p>
                <div className="progress-bar" style={{ marginTop: 'var(--space-md)' }}>
                    <div className="progress-bar-fill" style={{ width: `${(patient.sessionsCompleted / patient.totalSessions) * 100}%` }} />
                </div>
            </div>

            {/* Care Team */}
            <p className="card-title" style={{ marginBottom: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>My Care Team</p>
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: '1.5rem' }}>{careSchedule.nurse.avatar}</span>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600 }}>{careSchedule.nurse.name}</p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{careSchedule.nurse.role} · {careSchedule.nurse.day}s at {careSchedule.nurse.time}</p>
                    </div>
                    <a href={`tel:${careSchedule.nurse.phone}`} className="btn btn-outline btn-sm">Call</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: '1.5rem' }}>{careSchedule.doctor.avatar}</span>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600 }}>{careSchedule.doctor.name}</p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{careSchedule.doctor.role} · {careSchedule.doctor.frequency}</p>
                    </div>
                    <a href={`tel:${careSchedule.doctor.phone}`} className="btn btn-outline btn-sm">Call</a>
                </div>
            </div>

            {/* Quick Links */}
            <p className="card-title" style={{ marginBottom: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>Quick Access</p>
            {[
                { href: '/medications', icon: <Pill size={18} />, label: 'My Medications' },
                { href: '/exercise', icon: <Dumbbell size={18} />, label: 'My Exercises' },
                { href: '/vitals', icon: <Heart size={18} />, label: 'Log My Vitals' },
                { href: '/hospitals', icon: <Hospital size={18} />, label: 'Nearby Hospitals' },
                { href: '/emergency', icon: <Settings size={18} />, label: 'Emergency Info' },
                { href: '/clinician', icon: <LogOut size={18} />, label: 'Clinician View (Demo)' },
            ].map((item, i) => (
                <Link key={i} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        padding: '14px var(--space-md)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                    }}>
                        <span style={{ color: 'var(--accent-teal)' }}>{item.icon}</span>
                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{item.label}</span>
                        <ChevronRight size={16} color="var(--text-muted)" />
                    </div>
                </Link>
            ))}
        </div>
    );
}
