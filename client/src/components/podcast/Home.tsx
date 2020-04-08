import React from 'react';
import { Button, Layout, PageHeader } from 'antd';

export function Home() {
  return (
    <>
      <PageHeader
        title="Speakrr"
        extra={[<Button href="/podcast/add">Add Podcast</Button>]}
      />
    </>
  );
}
