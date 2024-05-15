import React from 'react';
import chatLogo from '../assets/logo.png';

const Logo = () => {
  return (
    <img
      src={chatLogo}
      alt='chat-logo'
      height={40}
      onClick={() => {
        window.location.reload();
      }}
    />
  );
};

export default Logo;
