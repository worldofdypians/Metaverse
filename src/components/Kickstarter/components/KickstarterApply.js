import "../_kickstarter.scss";
import "./kickstarter_newcss.scss";

const KickstarterApply = () => {
  // return (
  //   <div className="container-fluid d-flex align-items-center justify-content-center py-5">
  //     <div className="custom-container d-flex justify-content-center">
  //       <div className="d-flex flex-column gap-2 align-items-center">
  //         <h6 className="main-hero-title font-montserrat">
  //           Ready to Kickstart Your Growth?
  //         </h6>
  //         <p className="market-banner-desc font-montserrat text-center w-75">
  //           Take your project from launch to mainstream adoption. Plug into a
  //           fully gamified, AI-powered metaverse that rewards, educates, and
  //           activates users on-chain.
  //         </p>
  //         <a
  //           href="https://forms.gle/MUYyzKpS23yrzGcB7"
  //           target="_blank"
  //           rel="noreferrer"
  //           className="explore-btn px-3 py-2"
  //         >
  //           Start Your Kickstart Journey Now
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-blue-900/30"></div>

      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-tw border-blue-400/20 rounded-full"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bordertw border-purple-400/20 rounded-full"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bordertw border-yellow-400/20 rounded-full"></div>
      <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"></div>

      <div className="custom-container mx-auto text-center relative">
        <h2 className="text-4xl md:text-6xl text-white mb-6 metrics-title">
          READY TO KICKSTART
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent metrics-title">
            YOUR GROWTH?
          </span>
        </h2>

        <p className="text-gray-300 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
          Join the most innovative gaming partnership program and unlock
          unprecedented opportunities for your brand in the metaverse.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="https://forms.gle/MUYyzKpS23yrzGcB7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded transition-all disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-yellow-400 to-orange-500 font-medium hover:from-yellow-300 hover:to-orange-400 text-black px-8 py-2 text-lg group"
          >
            {/* <Rocket className="w-5 h-5 mr-2 group-hover:animate-pulse" /> */}
            START YOUR JOURNEY
            {/* <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /> */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default KickstarterApply;
