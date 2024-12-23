import React from 'react';

import Lottie from 'react-lottie';
import animationData from './login.json';

export default function LoginLottie() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={700}
        />
      </div>
    );
  }