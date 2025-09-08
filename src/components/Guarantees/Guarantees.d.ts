import { ReactNode } from 'react';

interface Guarantee {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface GuaranteesProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  guarantees?: Guarantee[];
  footerText?: ReactNode;
}

declare const Guarantees: React.FC<GuaranteesProps>;
export default Guarantees;