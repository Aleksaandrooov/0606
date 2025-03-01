import React from 'react';
import { PreLoader } from './PreLoader';
import { Container } from '@/components/ui/container';
import { HeaderButtons } from './header-buttons';

export const Header = () => {
  return (
    <header className="border-b sticky top-0 z-50 bg-zinc-950">
      <Container className="flex items-center max-md:justify-center px-0 h-12 relative z-20">
        <PreLoader />
        <HeaderButtons className="ml-auto pr-5 max-md:hidden" />
      </Container>
    </header>
  );
};
