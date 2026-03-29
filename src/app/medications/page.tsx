'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { medications } from '@/lib/mockData';

export default function MedicationsPage() {
    const totalTaken = medications.reduce((sum, m) => sum + m.takenToday.filter(Boolean).length, 0);
    const totalDoses = medications.reduce((sum, m) => sum + m.takenToday.length, 0);
    const overallAdherence = Math.round(
        medications.reduce((sum, m) => sum + m.adherenceRate, 0) / medications.length
    );

    return (
        <div className="page">
            <div className="page-header">
                <Link href="/" className="back-btn"><ArrowLeft size={20} /></Link>
                <h1>My Medications</h1>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 'var(--space-lg)', padding: '0 var(--space-md)' }}>
                Set by your care team. Do not change doses without asking Dr. Patel.
            </p>

            {medications.map((med) => (
                <div key={med.id} className="med-card">
                    <span className="med-icon">{med.icon}</span>
                    <div className="med-info">
                        <div className="med-name">{med.name} {med.dose}</div>
                        <div className="med-detail">{med.frequency} — {med.times.join(' / ')}</div>
                        <div className="med-detail">Reminder: {med.times.join(' & ')}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {med.takenToday.map((taken, i) => (
                            <button key={i} className={`med-action ${taken ? 'med-taken' : 'med-due'}`}>
                                {taken ? 'Taken ✓' : med.times.length > 1 ? (i === 0 ? 'AM due' : 'PM due') : 'Mark taken'}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <div className="card" style={{ marginTop: 'var(--space-md)' }}>
                <p style={{ fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Today&apos;s Summary</p>
                <p style={{ fontSize: '0.9rem' }}>
                    <strong>{totalTaken} of {totalDoses}</strong> doses taken
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {totalDoses - totalTaken} remaining (evening doses)
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--status-green)', marginTop: 'var(--space-sm)' }}>
                    This week: {overallAdherence}% adherence
                </p>
            </div>
        </div>
    );
}
