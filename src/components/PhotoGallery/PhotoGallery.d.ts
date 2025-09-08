import { ReactNode } from 'react';

interface PhotoGalleryProps {
  title?: ReactNode;
  subtitle?: ReactNode;
}

declare const PhotoGallery: React.FC<PhotoGalleryProps>;
export default PhotoGallery;