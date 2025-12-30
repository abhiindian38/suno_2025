import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import PageWrapper from './components/layout/PageWrapper/index';
import { AmbientBackground } from './components/layout/AmbientBackground';
import Footer from './components/layout/Footer';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useSound } from './hooks/useSound';

// Lazy Loaded Pages
const IndustrySelection = React.lazy(() => import('./pages/IndustrySelection'));
const Movies = React.lazy(() => import('./pages/Movies'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const Search = React.lazy(() => import('./pages/Search'));
const MovieDetail = React.lazy(() => import('./pages/MovieDetail'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const FeedbackDashboard = React.lazy(() => import('./pages/FeedbackDashboard'));

// AnimatePresence requires a unique key for each route to trigger exit animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><IndustrySelection /></PageWrapper>} />
        <Route path="/movies" element={<PageWrapper><Movies /></PageWrapper>} />
        <Route path="/movies/:industry" element={<PageWrapper><Movies /></PageWrapper>} />
        <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} />
        <Route path="/movie/:id" element={<PageWrapper noPadding><MovieDetail /></PageWrapper>} />
        <Route path="/feedback" element={<PageWrapper><Feedback /></PageWrapper>} />
        <Route path="/feedback/dashboard" element={<PageWrapper><FeedbackDashboard /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const { initAudio } = useSound();

  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [initAudio]);

  return (
    <Router>
      <div className="relative min-h-screen text-foreground antialiased selection:bg-cyan-500/30">
        <AmbientBackground />
        <Navbar />
        <main>
          <Suspense fallback={<LoadingScreen />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
