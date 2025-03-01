import React from 'react';
import { HeaderButtons } from '../Header/header-buttons';

export const FooterMobile = () => {
  return (
    <footer className="sticky md:hidden top-50 bottom-0 flex backdrop-blur-md h-10 items-center px-10">
      <HeaderButtons className="justify-around w-full" />
    </footer>
  );
};
