import { ReactNode } from 'react';

interface ProjectConstructorProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  onConstructorOpen?: () => void;
}

declare const ProjectConstructor: React.FC<ProjectConstructorProps>;
export default ProjectConstructor;