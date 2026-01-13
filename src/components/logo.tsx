import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({
  className,
}: {
  className?: string;
}) {
  const src = '/images/logo-full.png';

  return (
    <div className={cn('relative w-14 h-14', className)}>
      <Image src={src} alt="Sol & Clay" fill className="object-contain" />
    </div>
  );
}
