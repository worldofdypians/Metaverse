import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../screens/Account/src/Utils.js/Auth/AuthDetails";
import { useQuery } from "@apollo/client/react";
import { GET_PLAYER } from "../../screens/Account/src/Containers/Dashboard/Dashboard.schema";
import { motion } from "motion/react";

const MarketSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("collections");
  const [isSticky, setIsSticky] = useState(false);

  const { email } = useAuth();

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.innerHeight + window.pageYOffset;
  //     const documentHeight = document.documentElement.scrollHeight;
  //     const distanceFromBottom = documentHeight - scrollPosition;

  //     setIsSticky(distanceFromBottom <= 200);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [])

  return (
    <div className="marketplace-sidebar d-flex justify-content-center p-4">
      <div
        className="d-flex flex-column justify-content-between w-100"
        style={{ height: "90%" }}
      >
        <div className="d-flex flex-column  gap-2">
          {/* <div className="sidebar-separator my-2"></div> */}
          <div className="accordion" id="accordionExample">
            <div className="">
              <h2 className="sidebar-item p-2 mb-0" id="headingOne">
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={`https://cdn.worldofdypians.com/wod/collectionsIcon.svg`}
                        style={{ width: "20px", height: "20px" }}
                        alt=""
                      />
                      <h6 className="sidebar-title mb-0">Collections</h6>
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/sidebarArrow.svg"
                      }
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${
                  location.pathname.includes("shop") ||
                  location.pathname.includes("loyalty") ||
                  location.pathname.includes("challenges")
                    ? "show"
                    : null
                }`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/shop/beta-pass/bnb"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item ${
                              location.pathname.includes("beta-pass")
                                ? "sidebar-item-active nft-active"
                                : null
                            }`
                      }
                    >
                      {/* <div className="icon-wrapper"></div> */}
                      <div className="d-flex align-items-center gap-5">
                        <span className={`nft-sidebar-title`}>Beta Pass</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/shop/caws"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item"
                      }
                    >
                      {/* <div className="icon-wrapper"></div> */}
                      <span className={`nft-sidebar-title`}>CAWS</span>
                    </NavLink>
                    <NavLink
                      to="/shop/land"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item"
                      }
                    >
                      {/* <div className="icon-wrapper"></div> */}
                      <span className={`nft-sidebar-title`}>Land</span>
                    </NavLink>
                    <NavLink
                      to="/shop/timepiece"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex ms-lg-3 p-2 align-items-center gap-2 sidebar-item`
                      }
                    >
                      {/* <div className="icon-wrapper"></div> */}
                      <span className={`nft-sidebar-title`}>
                        CAWS Timepiece
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NavLink
            to="/account/challenges/treasure-hunt"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "eventsIconActive" : "eventsIcon";
              return (
                <>
                  <img
                    src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Challenges</span>
                </>
              );
            }}
          />
          <NavLink
            to="/staking"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "stakeIconActive" : "stakeIcon";
              return (
                <>
                  <img
                    src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Staking</span>
                </>
              );
            }}
          />
          <NavLink
            to="/shop/mint/timepiece"
            end
            className={({ isActive }) =>
              isActive || location.pathname.includes("mint")
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon =
                isActive || location.pathname.includes("mint")
                  ? "mintIconActive"
                  : "mintIcon";
              return (
                <>
                  <img
                    src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Mint</span>
                </>
              );
            }}
          />

          {email && (
            //  &&
            //   data &&
            //   data.getPlayer &&
            //   data.getPlayer.displayName &&
            //   data.getPlayer.playerId &&
            //   data.getPlayer.wallet &&
            //   data.getPlayer.wallet.publicAddress
            <NavLink
              to="/loyalty-program"
              end
              className={({ isActive }) =>
                isActive
                  ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                  : "d-flex p-2 align-items-center gap-2 sidebar-item"
              }
              children={({ isActive }) => {
                const icon = isActive ? "loyaltyIconActive" : "loyaltyIcon";
                return (
                  <>
                    <img
                      src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                      // style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                    <span className={`sidebar-title`}>Loyalty Program</span>
                  </>
                );
              }}
            />
          )}
          <NavLink
            to="/ai-agent"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              return (
                <>
                  <img
                    src={`https://cdn.worldofdypians.com/wod/oryn-transparent.png`}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Oryn AI Agent</span>
                </>
              );
            }}
          />
          <a
            href="https://www.space.id/tld/21/"
            target="_blank"
            className="d-flex p-2 align-items-center gap-2 sidebar-item"
          >
            <img
              src="https://cdn.worldofdypians.com/wod/domainNameIcon.png"
              style={{ width: "20px", height: "20px" }}
              alt="wod domain"
            />
            <span className={`sidebar-title`}>.WOD Domain</span>
          </a>
          <div
            className="relative  flex items-center justify-center z-5"
            style={{ height: "fit-content" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-lg mx-auto"
            >
              {/* Compact Announcement Card */}
              <motion.div
                className="rounded-xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #5690FF 0%, #8C56FF 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                initial={{ rotateX: 20 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Shimmer sweep effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                  }}
                />

                {/* Subtle particle overlay */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
                    backgroundSize: "25px 25px",
                  }}
                />

                {/* Animated gradient orbs */}
                <motion.div
                  className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)",
                  }}
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-25"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
                  }}
                  animate={{
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Title */}
                <motion.h3
                  className="text-lg line-height-normal md:text-lg font-bold text-white mb-3 relative z-10 drop-shadow-lg"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Liquidity Catalyst Campaign
                </motion.h3>

                {/* Rewards Container */}
                <motion.div
                  className="inline-block mb-4 relative z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.div
                    className="px-3 py-2 rounded-full relative overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.25)",
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(10px)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255, 255, 255, 0.3)",
                        "0 0 30px rgba(255, 255, 255, 0.5)",
                        "0 0 20px rgba(255, 255, 255, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.h5 className="line-height-normal text-lg md:text-lg font-bold text-white drop-shadow-lg mb-0">
                      $250,000 Rewards
                    </motion.h5>
                  </motion.div>
                </motion.div>

                {/* Single Action Button */}
                <motion.div
                  className="flex justify-center relative z-10"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink
                      to="/liquidity-catalyst"
                      className="font-bold px-3 py-2 rounded-md shadow-xl flex items-center space-x-2 bg-white text-purple-600 hover:bg-gray-100 hover:bg-gray-100"
                    >
                      <span>Join Now</span>
                      {/* <ExternalLink className="w-4 h-4" /> */}
                    </NavLink>
                  </motion.div>
                </motion.div>

                {/* Corner decorations */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full z-10 border-2 border-white/40"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute bottom-3 left-3 w-6 h-6 rounded-full z-10 border-2 border-white/30"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 bg-white/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Edge glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                  }}
                  animate={{
                    boxShadow: [
                      "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                      "inset 0 0 30px rgba(255, 255, 255, 0.25)",
                      "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSidebar;
