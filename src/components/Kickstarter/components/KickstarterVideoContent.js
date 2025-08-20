import OutsideClickHandler from "react-outside-click-handler";
import "../_kickstarter.scss";
import "./kickstarter_newcss.scss";
import { useState } from "react";
import VideoPopup from "../../../screens/Game/VideoPopup";

const KickstarterVideoContent = () => {
  const [videoPopup, setVideoPopup] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

  const videos = [
    {
      title: "The Gathering Storm Launch Trailer",
      thumbnail: "https://cdn.worldofdypians.com/wod/kickstarterVideo1.webp",
      views: "124K",
      duration: "1:38",
      gradient: "from-cyan-500 to-blue-600",
      link: "https://www.youtube.com/watch?v=v5Um-Q8l9z8",
      id: "v5Um-Q8l9z8",
    },
    {
      title: "World of Dypians: Mask of Power",
      thumbnail: "https://cdn.worldofdypians.com/wod/kickstarterVideo3.webp",
      views: "38k",
      duration: "0:15",
      gradient: "from-purple-500 to-pink-600",
      link: "https://www.youtube.com/watch?v=rJNbNdeg4U8",
      id: "rJNbNdeg4U8",
    },
    {
      title: "Humanoid AI: The Future Is Now",
      thumbnail: "https://cdn.worldofdypians.com/wod/kickstarterVideo4.webp",
      views: "77K",
      duration: "1:50",
      gradient: "from-green-500 to-emerald-600",
      link: "https://www.youtube.com/watch?v=P8HTt5M4VKw",
      id: "P8HTt5M4VKw",
    },
    {
      title: "World of Dypians: Viking Saga",
      thumbnail: "https://cdn.worldofdypians.com/wod/kickstarterVideo2.webp",
      views: "83K",
      duration: "4:09",
      gradient: "from-cyan-500 to-teal-600",
      link: "https://www.youtube.com/watch?v=pa10GcXzZQ4",
      id: "pa10GcXzZQ4",
    },
  ];

  return (
    <>
      <section
        className="py-20 px-lg-6 px-2 relative overflow-hidden bordertw-3 border-black"
        id="videos"
      >
        {/* Dynamic background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1649429398909-db7ae841c386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBuZXR3b3JrfGVufDF8fHx8MTc1NDQ4NTk1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tech Network"
            className="w-full h-full object-cover opacitytw-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-pink-900/30"></div>
        </div>

        <div className="custom-container mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 bordertw border-red-400/30 rounded-full backdrop-blur-sm mb-8">
              {/* <Play className="w-4 h-4 text-red-300 mr-2" /> */}
              <span className="text-red-300 text-sm uppercase tracking-wider">
                Video Content
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl mb-6">
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent metrics-title">
                SEE IT IN
              </span>
              <br />
              <span className="text-white metrics-title">ACTION</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="group cursor-pointer relative"
                onClick={() => {
                  setVideoPopup(true);
                  setVideoLink(video.id); // This is now the clean ID
                }}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${video.gradient} opacitytw-0 group-hover:opacitytw-20 rounded-2xl blur-xl transition-all duration-500 hover:transform hover:scale-105 h-full overflow-hidden`}
                ></div>

                <div className="relative bg-black/40 h-100 backdrop-blur-sm rounded-2xl overflow-hidden bordertw border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 shadow-2xl group-hover:shadow-3xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${video.gradient} opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500`}
                    ></div>

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`bg-gradient-to-r ${video.gradient} rounded-full p-3 group-hover:scale-110 transition-all duration-300 shadow-2xl`}
                      >
                        <img
                          src="https://cdn.worldofdypians.com/wod/playIcon.svg"
                          className="w-8 h-8 text-white fill-current"
                          alt=""
                        />
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1 bordertw border-white/20">
                      {/* <Clock className="w-3 h-3 text-white" /> */}
                      <span className="text-white text-sm">
                        {video.duration}
                      </span>
                    </div>

                    {/* Featured badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400/90 to-orange-500/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1 bordertw border-yellow-300/50">
                      {/* <Star className="w-3 h-3 text-white fill-current" /> */}
                      <span className="text-black text-xs uppercase tracking-wide font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6 relative d-flex flex-column justify-content-between">
                    <h3
                      className={`text-xl mb-3 group-hover:bg-gradient-to-r group-hover:${video.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-white`}
                    >
                      {video.title}
                    </h3>

                    {/* <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {video.description}
                  </p> */}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        {/* <Eye className="w-4 h-4 mr-1" /> */}
                        <span>{video.views} views</span>
                      </div>

                      {/* <div
                        className={`px-3 py-1 bg-gradient-to-r ${video.gradient} bg-opacity-20 rounded-full bordertw border-current opacitytw-20`}
                      >
                        <span className="text-xs text-white uppercase tracking-wide">
                          Watch
                        </span>
                      </div> */}
                    </div>
                  </div>

                  {/* Animated border */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${video.gradient} opacitytw-0 group-hover:opacitytw-30 transition-opacity duration-500 pointer-events-none`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {videoPopup && (
        <OutsideClickHandler onOutsideClick={() => setVideoPopup(false)}>
          <VideoPopup
            videoLink={videoLink}
            closeOverlay={() => setVideoPopup(false)}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default KickstarterVideoContent;
