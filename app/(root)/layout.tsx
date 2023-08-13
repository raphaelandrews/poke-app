import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Main from '@/app/main';
import Sidebar from '@/components/sidebar/sidebar';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className="grid lg:grid-cols-5">
        <Sidebar userId={userId} className="hidden md:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            <Main>
              {children}
            </Main>
          </div>
        </div>
      </div>
    </>
  );
};