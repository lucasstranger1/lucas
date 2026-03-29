'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VitalsPage() {
    const [bp, setBp] = useState({ systolic: '', diastolic: '' });
    const [sugar, setSugar] = useState('');
    const [weight, setWeight] = useState('');
    const [spo2, setSpo2] = useState('');
    const [saved, setSaved] = useState<string | null>(null);

    const handleSave = (type: string) => {
        setSaved(type);
        setTimeout(() => setSaved(null), 2000);
    };

    const recentBP = [
        { date: 'Today', value: '128/82' },
        { date: 'Yesterday', value: '130/84' },
        { date: 'Mar 26', value: '129/83' },
    ];

    return (
        <div className="page">
            <div className="page-header">
                <Link href="/" className="back-btn"><ArrowLeft size={20} /></Link>
                <h1>Log My Numbers</h1>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 'var(--space-lg)' }}>
                Take your vitals daily, ideally each morning before breakfast
            </p>

            {/* Blood Pressure */}
            <div className="card">
                <p className="card-title" style={{ marginBottom: 'var(--space-md)' }}>❤️ Blood Pressure</p>
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                            Top number (systolic)
                        </label>
                        <input
                            type="number"
                            className="chat-input"
                            style={{ borderRadius: 'var(--radius-md)', fontSize: '1.5rem', textAlign: 'center', padding: '12px' }}
                            placeholder="128"
                            value={bp.systolic}
                            onChange={(e) => setBp({ ...bp, systolic: e.target.value })}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                            Bottom number (diastolic)
                        </label>
                        <input
                            type="number"
                            className="chat-input"
                            style={{ borderRadius: 'var(--radius-md)', fontSize: '1.5rem', textAlign: 'center', padding: '12px' }}
                            placeholder="82"
                            value={bp.diastolic}
                            onChange={(e) => setBp({ ...bp, diastolic: e.target.value })}
                        />
                    </div>
                </div>
                <button className="btn btn-primary btn-full" onClick={() => handleSave('bp')}>
                    {saved === 'bp' ? 'Saved ✓' : 'Save'}
                </button>
                <div style={{ marginTop: 'var(--space-md)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>Recent readings</p>
                    {recentBP.map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '4px 0' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{r.date}</span>
                            <span>{r.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blood Sugar */}
            <div className="card">
                <p className="card-title" style={{ marginBottom: 'var(--space-md)' }}>🩸 Blood Sugar</p>
                <input
                    type="number"
                    className="chat-input"
                    style={{ borderRadius: 'var(--radius-md)', fontSize: '1.5rem', textAlign: 'center', padding: '12px', width: '100%', marginBottom: 'var(--space-md)' }}
                    placeholder="mg/dL"
                    value={sugar}
                    onChange={(e) => setSugar(e.target.value)}
                />
                <button className="btn btn-primary btn-full" onClick={() => handleSave('sugar')}>
                    {saved === 'sugar' ? 'Saved ✓' : 'Save'}
                </button>
            </div>

            {/* Weight */}
            <div className="card">
                <p className="card-title" style={{ marginBottom: 'var(--space-md)' }}>⚖️ Weight</p>
                <input
                    type="number"
                    className="chat-input"
                    style={{ borderRadius: 'var(--radius-md)', fontSize: '1.5rem', textAlign: 'center', padding: '12px', width: '100%', marginBottom: 'var(--space-md)' }}
                    placeholder="lbs"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <button className="btn btn-primary btn-full" onClick={() => handleSave('weight')}>
                    {saved === 'weight' ? 'Saved ✓' : 'Save'}
                </button>
            </div>

            {/* SpO2 */}
            <div className="card">
                <p className="card-title" style={{ marginBottom: 'var(--space-md)' }}>💨 Blood Oxygen (SpO2)</p>
                <input
                    type="number"
                    className="chat-input"
                    style={{ borderRadius: 'var(--radius-md)', fontSize: '1.5rem', textAlign: 'center', padding: '12px', width: '100%', marginBottom: 'var(--space-md)' }}
                    placeholder="%"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                />
                <button className="btn btn-primary btn-full" onClick={() => handleSave('spo2')}>
                    {saved === 'spo2' ? 'Saved ✓' : 'Save'}
                </button>
                <p style={{ fontSize: '0.78rem', color: 'var(--accent-teal)', marginTop: 'var(--space-sm)', cursor: 'pointer' }}>
                    How to use a pulse oximeter →
                </p>
            </div>

            {/* Heart Rate */}
            <div className="card">
                <p className="card-title" style={{ marginBottom: 'var(--space-sm)' }}>💓 Heart Rate</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>74 bpm</span>
                    <span className="badge badge-teal">auto from watch</span>
                </div>
            </div>
        </div>
    );
}
