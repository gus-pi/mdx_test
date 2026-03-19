'use client';

import { useEffect } from 'react';

export default function WindowReloadHandler() {
    useEffect(() => {
        const initialWidth = window.innerWidth;

        const handleResize = () => {
            if (window.innerWidth !== initialWidth) {
                window.location.reload();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return null;
}
