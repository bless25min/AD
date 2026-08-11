import { useEffect } from 'react';
import { CollaborationHero } from '../components/home/CollaborationHero';
import { OutcomeFirstCollaboration } from '../components/home/OutcomeFirstCollaboration';
import { CollaborationCTA } from '../components/home/CollaborationCTA';
import './home.css';

export const HomePage = () => {
  useEffect(() => {
    document.documentElement.classList.add('collaboration-route');
    return () => document.documentElement.classList.remove('collaboration-route');
  }, []);

  return (
    <main className="collaboration-home">
      <CollaborationHero />
      <OutcomeFirstCollaboration />
      <CollaborationCTA />
    </main>
  );
};
