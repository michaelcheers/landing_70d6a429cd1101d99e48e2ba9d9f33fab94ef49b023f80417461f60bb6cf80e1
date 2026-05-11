import { useEffect } from 'react';

interface HamiltonTrackerProps {
  slug: string;
}

export default function HamiltonTracker({ slug }: HamiltonTrackerProps) {
  useEffect(() => {
    // Always update the current location based on the current page
    const currentLocation = slug.includes('hamilton') ? 'hamilton' : 'other';
    sessionStorage.setItem('currentLocation', currentLocation);
  }, [slug]);

  return null;
}