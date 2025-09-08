import { ReactNode } from 'react';

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FeaturesProps {
  title?: ReactNode;
  features?: Feature[];
}

declare const Features: React.FC<FeaturesProps>;
export default Features;