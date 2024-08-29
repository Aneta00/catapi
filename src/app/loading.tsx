import { Skeleton } from 'antd';

const LoadingSkeleton = () => {
  return (
    <Skeleton active paragraph={{ rows: 4 }} />
  );
};

export default LoadingSkeleton;