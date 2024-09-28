import React from 'react';
import { DotLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <DotLoader
        color="#79b1ec"
        cssOverride={{}}
        loading
        size={70}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;
