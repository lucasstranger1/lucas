'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Users, User } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/journey', label: 'Journey', icon: Map },
    { href: '/community', label: 'People', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    // Hide nav on certain pages
    const hiddenPaths = ['/exercise', '/emergency', '/clinician', '/onboard'];
    if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

    return (
        <nav className="bottom-nav">
            {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={`nav-item ${pathname === href ? 'active' : ''}`}
                >
                    <Icon />
                    {label}
                </Link>
            ))}
        </nav>
    );
}
