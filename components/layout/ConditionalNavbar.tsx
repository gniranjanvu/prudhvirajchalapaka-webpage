"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
    const pathname = usePathname();
    
    // Hide navbar on admin pages and login page
    const shouldHideNavbar = pathname.startsWith('/admin');
    
    if (shouldHideNavbar) {
        return null;
    }
    
    return <Navbar />;
}
