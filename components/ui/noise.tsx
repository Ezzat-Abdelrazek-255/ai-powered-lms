import React from "react";

const Noise = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-noise h-screen bg-[url(/images/noise.gif)] bg-repeat opacity-[0.02]"></div>
  );
};

export default Noise;
