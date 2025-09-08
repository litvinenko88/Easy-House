import { ReactNode } from 'react';

interface ProblemSolutionProps {
  title?: ReactNode;
  problems: string[];
  solutions: string[];
}

declare const ProblemSolution: React.FC<ProblemSolutionProps>;
export default ProblemSolution;