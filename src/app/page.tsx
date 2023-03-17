// import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
      <div className="flex space-x-2 text-center">
        {/* First Column */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Explain something to me&quot;</p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat?&quot;
            </p>
            <p className="infoText">
              &quot;What is the colour of the sun?&quot;
            </p>
          </div>
        </div>

        {/* Second Column */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              &quot;Change the ChatGPT Model to use&quot;
            </p>
            <p className="infoText">
              &quot;Messages are stored in Firebase&apos;s Firestore&quot;
            </p>
            <p className="infoText">
              &quot;Hot Toast notifications when ChatGPT is thinking!&quot;
            </p>
          </div>
        </div>

        {/* Third Column */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              &quot;Don&apos;t always rely on the information you see here&quot;
            </p>
            <p className="infoText">
              &quot;May occasionally produce biased content&quot;
            </p>
            <p className="infoText">
              &quot;Limited knowledge of world and events after 2021&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
