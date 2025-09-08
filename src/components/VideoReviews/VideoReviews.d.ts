import { ReactNode } from 'react';

interface VideoReviewsProps {
  title?: ReactNode;
  description?: ReactNode;
  showAllVideos?: boolean;
  showViewAllButton?: boolean;
}

declare const VideoReviews: React.FC<VideoReviewsProps>;
export default VideoReviews;