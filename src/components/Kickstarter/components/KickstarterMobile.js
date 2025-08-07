import "../_kickstarter.scss";
import "./kickstarter_newcss.scss";

const KickstarterMobile = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <div className="custom-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-white metrics-title">
              TAKE WOD WITH YOU EVERYWHERE
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Access World of Dypians directly through Telegram! Manage your
              partnerships, track performance, and stay connected with the
              community right from your favorite messaging app.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Real-time notifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Partnership management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Community interaction</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Performance analytics</span>
              </div>
            </div>
          </div>

          {/* iPhone Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* iPhone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Notch */}
                  <div className="relative bg-black h-6 flex justify-center">
                    <div className="bg-black rounded-b-2xl w-32 h-4"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-gradient-to-b from-blue-50 to-white h-[600px] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=600&fit=crop"
                      alt="WOD Telegram Mini App Interface"
                      className="w-full h-full object-cover"
                    />

                    {/* App UI Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            {/* <MessageCircle className="w-4 h-4 text-white" /> */}
                          </div>
                          <div>
                            <div className="text-gray-900 text-sm">
                              World of Dypians
                            </div>
                            <div className="text-gray-500 text-xs">
                              Partnership Dashboard
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-gray-100 rounded-lg h-3 w-full"></div>
                          <div className="bg-gray-100 rounded-lg h-3 w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
                {/* <MessageCircle className="w-4 h-4 text-white" /> */}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 rounded-full p-2 shadow-lg animate-pulse delay-300">
                {/* <Smartphone className="w-4 h-4 text-white" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KickstarterMobile;
