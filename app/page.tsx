import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import WindowReloadHandler from './lib/WindowReloadHandler';

const App = () => {
    return (
        <div>
            <WindowReloadHandler />
            <Navbar />
            <Hero />
            <Section2 />
            <Section3 />
        </div>
    );
};
export default App;
