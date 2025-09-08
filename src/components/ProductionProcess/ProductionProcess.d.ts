import { ReactNode } from 'react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ProductionProcessProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  steps?: ProcessStep[];
  guarantee?: ReactNode;
}

declare const ProductionProcess: React.FC<ProductionProcessProps>;
export default ProductionProcess;