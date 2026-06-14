import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import GrowthArc from '../components/GrowthArc';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Aadarsh Vision Micro Finance Foundation';
  }, []);

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-navy-800 px-6 text-center text-white">
      <GrowthArc className="pointer-events-none absolute -left-16 top-10 h-56 w-80 text-gold-400 opacity-20" />
      <GrowthArc className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-80 rotate-180 text-forest-400 opacity-15" />
      <p className="eyebrow justify-center text-gold-300">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-base text-navy-100 sm:text-lg">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <Home className="h-4 w-4" />
        Back to Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </main>
  );
};

export default NotFound;
