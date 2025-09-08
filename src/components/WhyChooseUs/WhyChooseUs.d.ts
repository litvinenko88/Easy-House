import { ReactNode } from 'react';

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface WhyChooseUsProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  advantages?: Advantage[];
  ctaTitle?: ReactNode;
  ctaText?: ReactNode;
}

declare const WhyChooseUs: React.FC<WhyChooseUsProps>;
export default WhyChooseUs;