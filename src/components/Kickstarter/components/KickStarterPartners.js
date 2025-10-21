import "../_kickstarter.scss";
import "./kickstarter_newcss.scss";

const KickstarterPartners = ({partners}) => {

  return (
    <section
      className="py-20 px-lg-6 px-2 relative overflow-hidden bordertw-3 border-black"
      id="partners"
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-yellow-900/20 to-amber-900/20"></div>
        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="custom-container mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 bordertw border-orange-400/30 rounded-full backdrop-blur-sm mb-8">
            {/* <Shield className="w-4 h-4 text-orange-300 mr-2" /> */}
            <span className="text-orange-300 font-semibold text-sm uppercase tracking-wider">
              Trusted Ecosystem
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-6">
            <span className="text-white metrics-title">TRUSTED BY</span>
            <br />
            <span className="bg-gradient-to-r metrics-title from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              INDUSTRY LEADERS
            </span>
          </h2>
        </div>

        {/* Partners showcase container */}
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-lg-8 p-3 bordertw border-white/20 mb-12 relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-amber-500/10 rounded-3xl"></div>

          <div className="relative">
            {/* Compact logo grid */}
            <div className="grid kickstart-partner-grid md:grid-cols-8 lg:grid-cols-12 gap-6 items-center justify-items-center">
              {partners.map((partner, index) => (
                <div key={index} className="group relative">
                  {/* Glow effect for individual logos */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacitytw-0 group-hover:opacitytw-100 rounded-xl blur-lg transition-all duration-500 scale-150"></div>

                  <div className="relative w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm bordertw border-orange-400/50 transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden group-hover:bg-black/60">
                    <img
                      src={`https://cdn.worldofdypians.com/wod/${partner.icon}`}
                      alt={partner.name}
                      className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Enhanced tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500/90 to-yellow-500/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacitytw-0 group-hover:opacitytw-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 bordertw border-orange-400/30 shadow-lg shadow-orange-500/25">
                    {partner.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-orange-500/90"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles matching the theme */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping opacitytw-40"
            style={{
              top: `${20 + i * 12}%`,
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default KickstarterPartners;
