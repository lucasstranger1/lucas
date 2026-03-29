'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { milestones, patient } from '@/lib/mockData';

export default function JourneyPage() {
    return (
        <div className="page">
            <div className="page-header">
                <Link href="/" className="back-btn"><ArrowLeft size={20} /></Link>
                <div>
                    <h1>My Recovery Journey</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Week {patient.currentWeek} of {patient.totalWeeks}
                    </p>
                </div>
            </div>

            <div className="card" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Milestones Reached
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-teal)' }}>
                    {milestones.filter(m => m.achieved).length}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    of {milestones.length} milestones
                </p>
            </div>

            <div className="timeline">
                {milestones.map((m, i) => (
                    <div
                        key={i}
                        className={`timeline-item ${m.achieved ? 'achieved' : ''} ${m.current ? 'current' : ''}`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-week">Week {m.week}</div>
                        <div className="timeline-title" style={{ opacity: !m.achieved && !m.current ? 0.4 : 1 }}>
                            {m.achieved ? '✓ ' : m.current ? '→ ' : ''}{m.title}
                        </div>
                        <div className="timeline-desc">{m.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
