import React from 'react';

import { Chat } from '@/components';

const Dashboard = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-[calc(100dvh-64px)]">
      <div className="w-full bg-red-200 col-span-2"></div>
      <div className="h-full">
        <Chat />
      </div>
    </section>
  );
};

export default Dashboard;
