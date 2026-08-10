import { useEffect } from 'react';
import { CollaborationHero } from '../components/home/CollaborationHero';
import { AssetRouter } from '../components/home/AssetRouter';
import { CollaborationFlywheel } from '../components/home/CollaborationFlywheel';
import { CollaborationEntrances } from '../components/home/CollaborationEntrances';
import { SoftwarePartnerBlueprint } from '../components/home/SoftwarePartnerBlueprint';
import { FeaturedEvidence } from '../components/home/FeaturedEvidence';
import { CollaborationTrust } from '../components/home/CollaborationTrust';
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
      <AssetRouter />
      <CollaborationFlywheel />
      <CollaborationEntrances />
      <SoftwarePartnerBlueprint />
      <FeaturedEvidence />
      <CollaborationTrust />
      <CollaborationCTA />
    </main>
  );
};
