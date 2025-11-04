import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStats: {
    userPoints: 0,
    userEarnUsd: 0,
    userEarnETH: 0,
    cmcuserPoints: 0,
    cmcuserEarnUsd: 0,
    cmcuserEarnETH: 0,
    confluxUserPoints: 0,
    confluxEarnUSD: 0,
    confluxEarnCFX: 0,
    gateEarnUSD: 0,
    gateUserPoints: 0,
    gateEarnBnb: 0,
    dogeUserPoints: 0,
    dogeEarnUSD: 0,
    dogeEarnBNB: 0,
    baseUserPoints: 0,
    baseEarnUSD: 0,
    baseEarnETH: 0,
    bnbEarnToken: 0,
    bnbEarnUsd: 0,
    bnbPoints: 0,
    trustEarnToken: 0,
    trustEarnUsd: 0,
    trustPoints: 0,
    teaEarnToken: 0,
    teaEarnUsd: 0,
    teaPoints: 0,
    dypiusEarnTokens: 0,
    dypiusEarnUsd: 0,
    dypiusPremiumEarnTokens: 0,
    dypiusPremiumEarnUsd: 0,
    dypiusPremiumPoints: 0,
    coreEarnUsd: 0,
    coreEarnToken: 0,
    corePoints: 0,
    victionEarnUsd: 0,
    victionEarnToken: 0,
    victionPoints: 0,
    vanarEarnUsd: 0,
    vanarEarnToken: 0,
    vanarPoints: 0,
    taikoEarnUsd: 0,
    taikoEarnToken: 0,
    taikoPoints: 0,
    taraxaEarnUsd: 0,
    taraxaEarnToken: 0,
    taraxaPoints: 0,
    cookieEarnUsd: 0,
    cookieEarnToken: 0,
    cookiePoints: 0,
    immutableEarnUsd: 0,
    immutableEarnToken: 0,
    immutablePoints: 0,
    easy2StakeEarnUsd: 0,
    easy2StakeEarnToken: 0,
    easy2StakePoints: 0,
    midleEarnUsd: 0,
    midleEarnToken: 0,
    midlePoints: 0,
    kucoinEarnUsd: 0,
    kucoinEarnToken: 0,
    kucoinPoints: 0,
    mantaEarnUsd: 0,
    mantaEarnToken: 0,
    mantaPoints: 0,
    multiversEarnUsd: 0,
    multiversEarnToken: 0,
    multiversPoints: 0,
    seiEarnUsd: 0,
    seiEarnToken: 0,
    seiEarnPoints: 0,
    chainlinkEarnUsd: 0,
    chainlinkEarnToken: 0,
    chainlinkEarnPoints: 0,
    skaleEarnUsd: 0,
    skaleEarnToken: 0,
    skalePoints: 0,
    matEarnUsd: 0,
    matEarnToken: 0,
    matPoints: 0,
    userEvents: 0,
  },
  userNFTs: {
    myTeaBnbNfts: [],
    myTeaOpbnbNfts: [],
    myTeaSeiNfts: [],
    myTaraxaNfts: [],
    mybnb5yaNfts: [],
    myTeaBaseNfts: [],
    mykucoinNFTs: [],
    myNFTSTimepiece: [],
    myNFTSLand: [],
    myNFTSCaws: [],
    myNFTSBNB: [],
    myNFTSopBNB: [],
    myNFTSLandBNB: [],
    myNFTSCawsBNB: [],
    myNFTSLandAvax: [],
    myNFTSCawsAvax: [],
    myNFTSLandBase: [],
    myNFTSCawsBase: [],
    MyNFTSCoingecko: [],
    myGateNfts: [],
    myConfluxNfts: [],
    myBaseNfts: [],
    myDogeNfts: [],
    myCmcNfts: [],
    mySkaleNfts: [],
    myCoreNfts: [],
    myVictionNfts: [],
    myMultiversNfts: [],
    myImmutableNfts: [],
    myMantaNfts: [],
    myTaikoNfts: [],
    myCookieNfts: [],
    mySeiNfts: [],
    myMatNfts: [],
  },
  userProgress: {
    // Global Rankings
    globalMonthly: 0,
    globalWeekly: 0,
    totalStars: 0,

    // BNB Chain
    userRank: 0,
    userBnbStars: 0,
    userBnbScore: 0,

    // Skale Chain
    userRankSkale: 0,
    userSkaleStars: 0,
    userSkaleScore: 0,

    // Core Chain
    userRankCore: 0,
    userCoreStars: 0,
    userCoreScore: 0,

    // Viction Chain
    userRankViction: 0,
    userVictionStars: 0,
    userVictionScore: 0,

    // Manta Chain
    userRankManta: 0,
    userMantaStars: 0,
    userMantaScore: 0,

    // Base Chain
    userRankBase: 0,
    userBaseStars: 0,
    userBaseScore: 0,

    // Taiko Chain
    userRankTaiko: 0,
    userTaikoStars: 0,
    userTaikoScore: 0,

    // MAT Chain
    userRankMat: 0,
    userMatStars: 0,
    userMatScore: 0,

    // Sei Chain
    userRankSei: 0,
    userSeiStars: 0,
    userSeiScore: 0,

    // Vanar Chain
    userRankVanar: 0,
    userVanarStars: 0,
    userVanarScore: 0,

    // Taraxa Chain
    userRankTaraxa: 0,
    userTaraxaStars: 0,
    userTaraxaScore: 0,

    // Prime Status
    primeStars: false,
    isPremium: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => ({ ...initialState }),
    setUserStats: (state, action) => {
      state.userStats = { ...state.userStats, ...action.payload };
    },
    setUserNFTs: (state, action) => {
      state.userNFTs = { ...state.userNFTs, ...action.payload };
    },
    setUserProgress: (state, action) => {
      state.userProgress = { ...state.userProgress, ...action.payload };
    },
  },
});

export const { resetUser, setUserStats, setUserNFTs, setUserProgress } =
  userSlice.actions;

export default userSlice.reducer;
