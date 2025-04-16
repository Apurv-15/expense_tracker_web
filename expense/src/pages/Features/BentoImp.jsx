import React from "react";

export const BentoImp = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-blue-400">
          Deploy faster
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Everything you need to deploy your app
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* MOBILE FRIENDLY */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-blue-400 max-lg:text-center">
                  Mobile friendly
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-300 max-lg:text-center">
                  "Our app is fully optimized for mobile devices, ensuring a
                  seamless and responsive experience on any screen size."
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-[1rem] bg-gray-800 shadow-2xl">
                  <img
                    className="max-h-[90%] max-w-[90%] object-contain"
                    src="/images/phone.png"
                    alt="Phone"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-t-2xl">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-blue-400 max-lg:text-center">
                  Performance
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-300 max-lg:text-center">
                  Experience lightning-fast load times and smooth interactions
                  across all devices.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-gray-800"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-blue-400 max-lg:text-center">
                  Security
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-300 max-lg:text-center">
                  Your data is protected with enterprise-grade encryption and
                  secure authentication.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <img
                  className="h-[min(152px,40cqw)] object-contain"
                  src="/images/security.png"
                  alt="Security"
                />
              </div>
            </div>
          </div>

          {/* POWERFUL APIs (Simplified) */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-b-2xl lg:rounded-r-2xl">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-blue-400 max-lg:text-center">
                  Powerful APIs
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-300 max-lg:text-center">
                  Easily integrate with third-party services using our robust
                  and flexible APIs. <br></br>
                  📊 Deep Insights & Seamless Integrations Track spending trends
                  and performance metrics with real-time analytics on the
                  Insights page, powered by our robust, developer-friendly APIs.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow flex items-center justify-center">
                <img
                  className="max-h-[90%] max-w-[90%] object-contain"
                  src="/images/API.jpeg"
                  alt="API"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoImp;
