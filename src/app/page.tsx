'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  patient,
  todaySession,
  nutritionTip,
  medications,
  todayVitals,
  careSchedule,
} from '@/lib/mockData';

export default function HomePage() {
  const progressPct = Math.round((patient.sessionsCompleted / patient.totalSessions) * 100);
  const medsTaken = medications.reduce(
    (sum, m) => sum + m.takenToday.filter(Boolean).length,
    0
  );
  const medsTotal = medications.reduce((sum, m) => sum + m.takenToday.length, 0);

  const nextMed = medications.find((m) =>
    m.takenToday.some((t) => !t)
  );

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-lg)', animation: 'fadeInUp 0.4s ease forwards' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Good morning, {patient.firstName} ☀️
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4 }}>
              Week {patient.currentWeek} of {patient.totalWeeks} · {patient.sessionsCompleted}/{patient.totalSessions} sessions
            </p>
          </div>
          <div style={{ fontSize: '2.5rem' }}>{patient.avatar}</div>
        </div>
        <div className="progress-bar" style={{ marginTop: 'var(--space-md)' }}>
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Today's Exercise */}
      <Link href="/exercise" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card stagger-1" style={{ animationFillMode: 'forwards' }}>
          <div className="card-header">
            <span className="card-title">🏃 Today&apos;s Exercise</span>
            <span className="badge badge-teal">Day {todaySession.day}</span>
          </div>
          <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 4 }}>
            {todaySession.totalDuration}-min {todaySession.type.toLowerCase()}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>
            Target HR: {todaySession.targetHRMin}-{todaySession.targetHRMax} bpm
          </p>
          <button className="btn btn-primary btn-full">
            Start my session ▶
          </button>
        </div>
      </Link>

      {/* Nutrition Tip */}
      <div className="card stagger-2" style={{ animationFillMode: 'forwards' }}>
        <div className="card-header">
          <span className="card-title">{nutritionTip.icon} This Week&apos;s Tip</span>
        </div>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>{nutritionTip.title}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {nutritionTip.description}
        </p>
      </div>

      {/* Wellbeing Mood */}
      <div className="card stagger-3" style={{ animationFillMode: 'forwards' }}>
        <div className="card-header">
          <span className="card-title">💙 How are you feeling?</span>
        </div>
        <div className="mood-row">
          {['😟', '😐', '🙂', '😊', '😄'].map((emoji) => (
            <button key={emoji} className="mood-btn">
              {emoji}
            </button>
          ))}
        </div>
        <Link href="/chat" className="card-link" style={{ marginTop: 'var(--space-md)' }}>
          Weekly check-in due <ChevronRight size={14} />
        </Link>
      </div>

      {/* Medications */}
      <Link href="/medications" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card stagger-4" style={{ animationFillMode: 'forwards' }}>
          <div className="card-header">
            <span className="card-title">💊 Medications</span>
            <span className="card-link">View all <ChevronRight size={14} /></span>
          </div>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>
            {medsTaken} of {medsTotal} taken today
          </p>
          {nextMed && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Next: {nextMed.name} at {nextMed.times[nextMed.takenToday.indexOf(false)]}
            </p>
          )}
        </div>
      </Link>

      {/* Log My Numbers */}
      <div className="card stagger-5" style={{ animationFillMode: 'forwards' }}>
        <div className="card-header">
          <span className="card-title">📊 Log My Numbers</span>
        </div>
        <div className="vitals-grid">
          <Link href="/vitals?type=bp" className="vital-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="vital-icon">❤️</div>
            <div className="vital-name">Blood press.</div>
            {todayVitals.bloodPressure.logged && <div className="vital-check">✓</div>}
          </Link>
          <Link href="/vitals?type=sugar" className="vital-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="vital-icon">🩸</div>
            <div className="vital-name">Blood sugar</div>
            {todayVitals.bloodSugar.logged && <div className="vital-check">✓</div>}
          </Link>
          <Link href="/vitals?type=weight" className="vital-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="vital-icon">⚖️</div>
            <div className="vital-name">Weight</div>
            {todayVitals.weight.logged && <div className="vital-check">✓</div>}
          </Link>
          <Link href="/vitals?type=spo2" className="vital-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="vital-icon">💨</div>
            <div className="vital-name">Blood oxygen</div>
            {todayVitals.spo2.logged && <div className="vital-check">✓</div>}
          </Link>
        </div>
      </div>

      {/* Care Team */}
      <div className="card stagger-6" style={{ animationFillMode: 'forwards' }}>
        <div className="card-header">
          <span className="card-title">🩺 My Care Team</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '1.5rem' }}>{careSchedule.nurse.avatar}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{careSchedule.nurse.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Next: {new Date(careSchedule.nurse.nextCheckIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {careSchedule.nurse.time}
              </p>
            </div>
            <span className="badge badge-green">Tomorrow</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '1.5rem' }}>{careSchedule.doctor.avatar}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{careSchedule.doctor.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Next: {new Date(careSchedule.doctor.nextCheckUp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <span className="badge badge-teal">In 7 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
