'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, UserPlus, Shield, ShieldOff } from 'lucide-react';
import { familyCircle } from '@/lib/mockData';

export default function FamilyPage() {
    return (
        <div className="page">
            <div className="page-header">
                <Link href="/community" className="back-btn"><ArrowLeft size={20} /></Link>
                <h1>Family Circle</h1>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
                Share your progress with people who care about you.
            </p>

            {/* Members */}
            <p className="card-title" style={{ marginBottom: 'var(--space-md)' }}>Members</p>
            {familyCircle.members.map((m) => (
                <div key={m.id} className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                        <span style={{ fontSize: '2.5rem' }}>{m.avatar}</span>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>{m.name}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.relation}</p>
                        </div>
                    </div>
                    <button className="btn btn-outline btn-sm" style={{ color: 'var(--accent-coral)', borderColor: 'var(--accent-coral)' }}>
                        Remove
                    </button>
                </div>
            ))}

            <button className="btn btn-outline btn-full" style={{ marginBottom: 'var(--space-xl)' }}>
                <UserPlus size={18} /> Add a family member
            </button>

            {/* Privacy */}
            <p className="card-title" style={{ marginBottom: 'var(--space-md)' }}>What They Can See</p>
            <div className="card">
                {[
                    { label: 'Milestones I reach', allowed: true },
                    { label: 'Sessions completed/week', allowed: true },
                    { label: 'Encouragement messages', allowed: true },
                    { label: 'Heart rate or vitals', allowed: false },
                    { label: 'Anxiety or mood scores', allowed: false },
                    { label: 'Medical information', allowed: false },
                ].map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        padding: '10px 0',
                        borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                        {item.allowed ? (
                            <Shield size={16} color="var(--status-green)" />
                        ) : (
                            <ShieldOff size={16} color="var(--text-muted)" />
                        )}
                        <span style={{
                            fontSize: '0.9rem',
                            color: item.allowed ? 'var(--text-primary)' : 'var(--text-muted)',
                        }}>
                            {item.allowed ? '✓' : '✗'} {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Share Now */}
            <p className="card-title" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Share Now</p>
            <button className="btn btn-primary btn-full">
                <Share2 size={18} /> Share my weekly summary
            </button>

            {/* Recent Activity */}
            <p className="card-title" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Recent Activity</p>
            <div className="card">
                {familyCircle.members[0] && (
                    <p style={{ fontSize: '0.85rem', marginBottom: 'var(--space-sm)' }}>
                        <strong>{familyCircle.members[0].name}</strong> sent: &ldquo;{familyCircle.members[0].recentMessage}&rdquo; — {familyCircle.members[0].messageDate}
                    </p>
                )}
                {familyCircle.recentShares.map((share, i) => (
                    <p key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        You shared: {share.text} — {share.date}
                    </p>
                ))}
            </div>
        </div>
    );
}
