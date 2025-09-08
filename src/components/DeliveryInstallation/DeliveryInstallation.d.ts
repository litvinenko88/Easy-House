import { ReactNode } from 'react';

interface DeliveryStep {
  icon: string;
  title: string;
  desc?: string;
  description?: string;
}

interface DeliveryInstallationProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  steps?: DeliveryStep[];
  footerText?: ReactNode;
}

declare const DeliveryInstallation: React.FC<DeliveryInstallationProps>;
export default DeliveryInstallation;