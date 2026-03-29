'use client';

import Link from 'next/link';
import { ArrowLeft, Phone, MapPin, Star, Navigation } from 'lucide-react';
import { hospitals } from '@/lib/mockData';

export default function HospitalsPage() {
    const preferred = hospitals.find((h) => h.preferred);
    const others = hospitals.filter((h) => !h.preferred);

    return (
        <div className="page">
            <div className="page-header">
                <Link href="/profile" className="back-btn"><ArrowLeft size={20} /></Link>
                <h1>Nearby Hospitals</h1>
            </div>

            {/* Preferred */}
            {preferred && (
                <>
                    <p className="card-title" style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Star size={14} color="var(--accent-teal)" /> My Preferred Hospital
                    </p>
                    <div className="hospital-card preferred">
                        <div className="hospital-name">{preferred.name}</div>
                        <div className="hospital-address">
                            <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
                            {preferred.address}
                        </div>
                        <div className="hospital-meta">
                            <span>🚗 {preferred.driveTime}</span>
                            <span>📞 ER: {preferred.erPhone}</span>
                        </div>
                        <div className="hospital-actions">
                            <a href={`tel:${preferred.erPhone}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                                <Phone size={14} /> Call
                            </a>
                            <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(preferred.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                                style={{ flex: 1 }}
                            >
                                <Navigation size={14} /> Directions
                            </a>
                        </div>
                    </div>
                </>
            )}

            {/* Others */}
            <p className="card-title" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>
                Other Hospitals Nearby
            </p>
            {others.map((h) => (
                <div key={h.id} className="hospital-card">
                    <div className="hospital-name">{h.name}</div>
                    <div className="hospital-address">
                        <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
                        {h.address}
                    </div>
                    <div className="hospital-meta">
                        <span>🚗 {h.driveTime}</span>
                        <span>📞 ER: {h.erPhone}</span>
                    </div>
                    <div className="hospital-actions">
                        <a href={`tel:${h.erPhone}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                            <Phone size={14} /> Call
                        </a>
                        <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(h.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                            style={{ flex: 1 }}
                        >
                            <Navigation size={14} /> Directions
                        </a>
                    </div>
                </div>
            ))}

            <button className="btn btn-outline btn-full" style={{ marginTop: 'var(--space-lg)' }}>
                Change my preferred hospital
            </button>
        </div>
    );
}
