import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Landing } from './pages/Landing';
import { Detector } from './pages/Detector';
import { Report } from './pages/Report';
import { Analytics } from './pages/Analytics';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { FAQ } from './pages/FAQ';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

import './App.css';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Dynamic Page Router Map
  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/landing':
        return <Landing />;
      case '/detector':
        return <Detector />;
      case '/report':
        return <Report />;
      case '/analytics':
        return <Analytics />;
      case '/history':
        return <History />;
      case '/settings':
        return <Settings />;
      case '/faq':
        return <FAQ />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      case '/privacy':
        return <Privacy />;
      case '/terms':
        return <Terms />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <RouterProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </RouterProvider>
  );
}

export default App;
