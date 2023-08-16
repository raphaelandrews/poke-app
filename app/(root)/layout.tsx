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
      <Sidebar userId={userId} />
      <Main>
        {children}
      </Main>
    </>
  );
};