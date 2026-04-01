import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XALL — Your Personal Financial Agent',
  description: 'From addiction recovery to financial education to total financial autonomy. View our pitch deck.',
};

export default function XallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
