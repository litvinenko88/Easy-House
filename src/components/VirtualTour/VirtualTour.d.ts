import { ReactNode } from 'react';

interface VirtualTourProps {
  title?: ReactNode;
  description?: ReactNode;
}

declare const VirtualTour: React.FC<VirtualTourProps>;
export default VirtualTour;