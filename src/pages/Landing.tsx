import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';

export default function Landing() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans relative">
            <BackgroundBeams />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
}

