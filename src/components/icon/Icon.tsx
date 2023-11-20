import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import styled from 'styled-components';

const FallBack = styled.div<{ $size: string | number | undefined }>`
  background-color: transparent;
  width: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : '24px')};
  height: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : '24px')};
`;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, size, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={<FallBack $size={size} />}>
      <LucideIcon {...props} size={size} />
    </Suspense>
  );
};

export default Icon;
