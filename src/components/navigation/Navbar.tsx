'use client';

import {useUser} from '@auth0/nextjs-auth0/client';
import React from 'react';
import {LoginButton, LogoutButton, SignUpButton} from '@/components/buttons';

export const NavBarButtons = () => {
  const {user} = useUser();

  return (
    <div>
      {!user && (
        <>
          <SignUpButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
