'use client';

import { useState } from 'react';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import WindowReloadHandler from './lib/WindowReloadHandler';

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div>
            <LoadingScreen isLoaded={isLoaded} />
            <WindowReloadHandler />
            <Navbar />
            <Hero onLoaded={() => setIsLoaded(true)} isLoaded={isLoaded} />
            <Section2 />
            <Section3 />
        </div>
    );
};
export default App;
