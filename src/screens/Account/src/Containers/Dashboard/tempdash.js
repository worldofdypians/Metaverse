  <div className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative">
        <div className="container-lg mx-0">
          <LoginWrapper
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              justifyContent: "normal",
              alignItems: "normal",
              flexDirection: "column",
              gap: "30px",
              height: "auto",
              minHeight: "100%",
            }}
            img={dashboardBackground}
          >
            {loadingPlayer ? (
              <>
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override2}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              <div className="container-fluid px-0 px-lg-3">
                <div className={""}>
                  <div
                    className={
                      "d-flex flex-column gap-4 justify-content-center align-items-center"
                    }
                    style={{
                      marginTop: 40,
                    }}
                  >
                    <div
                      className={`col-12 d-flex flex-column gap-3  mt-5 mt-lg-0 ${classes.containerPlayer}`}
                    >
                      <ProfileCard
                        discountPercentage={discountPercentage}
                        getRankData={getRankData}
                        setPortfolio={() => setPortfolio(!portfolio)}
                        rankData={rankData}
                        userRank={userRank}
                        userRankCore={userRankCore}
                        userRankSkale={userRankSkale}
                        userBnbScore={userBnbScore}
                        userCoreScore={userCoreScore}
                        userRankViction={userRankViction}
                        userVictionScore={userVictionScore}
                        userSkaleScore={userSkaleScore}
                        genesisRank={genesisRank}
                        email={email}
                        username={data?.getPlayer?.displayName}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        userId={data?.getPlayer?.playerId}
                        balance={dypBalancebnb}
                        availableTime={availableTime}
                        isVerified={data?.getPlayer?.wallet}
                        coinbase={account}
                        setRankData={setRankData}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        userDataStar={userCollectedStars}
                        userDataPosition={userDataStar?.position}
                        onLinkWallet={connectWallet}
                        onSigninClick={onSigninClick}
                        onLogoutClick={() => {
                          logout();
                          // refreshSubscription(coinbase);
                          onSubscribeSuccess();
                          setclaimedChests(0);
                          setclaimedPremiumChests(0);
                          setclaimedCorePremiumChests(0);
                          setclaimedCoreChests(0);
                          setclaimedVictionPremiumChests(0);
                          setclaimedVictionChests(0);
                          setallChests([]);
                          setallSkaleChests([]);
                          setallCoreChests([]);
                          setallVictionChests([]);
                          setOpenedChests([]);
                          setOpenedCoreChests([]);
                          setOpenedVictionChests([]);
                          setOpenedSkaleChests([]);
                          setclaimedSkaleChests(0);
                          setclaimedSkalePremiumChests(0);
                          refetchPlayer();
                        }}
                        onSyncClick={handleShowSyncModal}
                        syncStatus={syncStatus}
                        isPremium={isPremium}
                        isConnected={isConnected}
                        onOpenLeaderboard={() => {
                          setLeaderboard(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                        handleSetAvailableTime={(value) => {
                          setGoldenPassRemainingTime(value);
                        }}
                        handleOpenDomains={handleOpenDomains}
                        domainName={domainName}
                      />

                      {portfolio && (
                        <OutsideClickHandler
                          onOutsideClick={() => setPortfolio(false)}
                        >
                          <div
                            className="popup-wrapper  popup-active p-3"
                            id="portfolio"
                            style={{ width: "60%", pointerEvents: "auto" }}
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <h2
                                className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                              >
                                My Portfolio
                              </h2>

                              <img
                                src={xMark}
                                onClick={() => setPortfolio(false)}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            </div>

                            <Portfolio
                              ethTokenData={ethTokenData}
                              dypTokenData={dypTokenData}
                              onOpenNfts={onOpenNfts}
                              listedNFTS={listedNFTS}
                              myBoughtNfts={myBoughtNfts}
                              address={data?.getPlayer?.wallet?.publicAddress}
                              coinbase={account}
                              isVerified={data?.getPlayer?.wallet}
                              favoritesArray={favorites}
                              dypBalance={dypBalance}
                              dypBalancebnb={dypBalancebnb}
                              dypBalanceavax={dypBalanceavax}
                              idypBalance={idypBalance}
                              idypBalancebnb={idypBalancebnb}
                              idypBalanceavax={idypBalanceavax}
                              showNfts={showNfts}
                              handleShowWalletPopup={() => {
                                setshowWalletModal(true);
                              }}
                              email={email}
                              userId={data?.getPlayer?.playerId}
                              username={data?.getPlayer?.displayName}
                              myCawsCollected={MyNFTSCaws}
                              myCawsOldCollected={MyNFTSCawsOld}
                              myLandCollected={MyNFTSLand}
                              myTimepieceCollected={MyNFTSTimepiece}
                              landStaked={landstakes}
                              myCawsWodStakes={myCawsWodStakesAll}
                              myWodWodStakes={myWodWodStakesAll}
                              myNFTSCoingecko={MyNFTSCoingecko}
                              myGateNfts={myGateNfts}
                              myConfluxNfts={myConfluxNfts}
                              myBaseNfts={myBaseNfts}
                              myDogeNfts={myDogeNfts}
                              myCmcNfts={myCmcNfts}
                              myCoreNfts={myCoreNfts}
                              myVictionNfts={myVictionNfts}
                              myMultiversNfts={myMultiversNfts}
                              mySkaleNfts={mySkaleNfts}
                              latestBoughtNFTS={latest20BoughtNFTS}
                              myOffers={myOffers}
                              allActiveOffers={allActiveOffers}
                              latestVersion={latestVersion}
                              MyNFTSLandBNB={MyNFTSLandBNB}
                              MyNFTSCawsBNB={MyNFTSCawsBNB}
                              MyNFTSLandAvax={MyNFTSLandAvax}
                              MyNFTSCawsAvax={MyNFTSCawsAvax}
                              MyNFTSLandBase={MyNFTSLandBase}
                              myNFTSBNB={MyNFTSBNB}
                              MyNFTSCawsBase={MyNFTSCawsBase}
                            />
                          </div>
                        </OutsideClickHandler>
                      )}
                      <TopSection
                        onOpenLeaderboard={() => {
                          setLeaderboard(true);
                        }}
                        onOpenGlobalLeaderboard={() => {
                          setGlobalLeaderboard(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        isPremium={isPremium}
                        handleShowPopup={(value) => {
                          setadClicked(value);
                        }}
                      />
                      <NewWalletBalance
                        onDailyRewardsPopupOpen={() => {
                          setdailyBonusPopup(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        bnbEarnUsd={bnbEarnUsd}
                        dogePrice={dogePrice}
                        weeklyplayerData={weeklyplayerDataAmount}
                        dailyplayerData={dailyplayerDataAmount}
                        dailyDataAmountCore={dailyDataAmountCore}
                        weeklyDataAmountCore={weeklyDataAmountCore}
                        monthlyDataAmountCore={monthlyDataAmountCore}
                        dailyDataAmountViction={dailyDataAmountViction}
                        weeklyDataAmountViction={weeklyDataAmountViction}
                        monthlyDataAmountViction={monthlyDataAmountViction}
                        dailyDataAmountSkale={dailyDataAmountSkale}
                        weeklyDataAmountSkale={weeklyDataAmountSkale}
                        monthlyDataAmountSkale={monthlyDataAmountSkale}
                        skaleEarnToken={skaleEarnToken}
                        skaleEarnUsd={skaleEarnUsd}
                        seiEarnUsd={seiEarnUsd}
                        coreEarnUsd={coreEarnUsd}
                        victionEarnUsd={victionEarnUsd}
                        skalePoints={skalePoints}
                        userRank2={userRank2}
                        genesisRank2={genesisRank2}
                        dailyPopup={dailyBonusPopup}
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        myBoughtNfts={myBoughtNfts}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        coinbase={account}
                        isVerified={data?.getPlayer?.wallet}
                        favoritesArray={favorites}
                        dypBalance={dypBalance}
                        dypBalancebnb={dypBalancebnb}
                        dypBalanceavax={dypBalanceavax}
                        idypBalance={idypBalance}
                        idypBalancebnb={idypBalancebnb}
                        idypBalanceavax={idypBalanceavax}
                        showNfts={showNfts}
                        claimedChests={claimedChests}
                        claimedPremiumChests={claimedPremiumChests}
                        claimedSkaleChests={claimedSkaleChests}
                        claimedSkalePremiumChests={claimedSkalePremiumChests}
                        claimedCoreChests={claimedCoreChests}
                        claimedCorePremiumChests={claimedCorePremiumChests}
                        claimedVictionChests={claimedVictionChests}
                        claimedVictionPremiumChests={
                          claimedVictionPremiumChests
                        }
                        kittyDashRecords={kittyDashRecords}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        email={email}
                        userId={data?.getPlayer?.playerId}
                        username={data?.getPlayer?.displayName}
                        myCawsCollected={MyNFTSCaws}
                        myCawsOldCollected={MyNFTSCawsOld}
                        myLandCollected={MyNFTSLand}
                        myTimepieceCollected={MyNFTSTimepiece}
                        landStaked={landstakes}
                        myCawsWodStakes={myCawsWodStakesAll}
                        myWodWodStakes={myWodWodStakesAll}
                        myNFTSCoingecko={MyNFTSCoingecko}
                        myGateNfts={myGateNfts}
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        latestBoughtNFTS={latest20BoughtNFTS}
                        myOffers={myOffers}
                        allActiveOffers={allActiveOffers}
                        isPremium={isPremium}
                        onRewardsClick={() => {
                          setmyRewardsPopup(true);
                        }}
                        rewardsPopup={myRewardsPopup}
                        onBalanceClick={() => {
                          setBalancePopup(true);
                        }}
                        availableTime={goldenPassRemainingTime}
                        canBuy={canBuy}
                        openedChests={openedChests}
                        openedSkaleChests={openedSkaleChests}
                        openedCoreChests={openedCoreChests}
                        openedSeiChests={openedSeiChests}
                        openedVictionChests={openedVictionChests}
                        onDailyBonusInfoClick={() => {
                          setdailyBonusInfo(true);
                        }}
                        userSocialRewards={userSocialRewards}
                        userEarnUsd={userEarnUsd}
                        userEarnETH={userEarnETH}
                        userPoints={userPoints}
                        cmcuserPoints={cmcuserPoints}
                        cmcuserEarnETH={cmcuserEarnETH}
                        cmcuserEarnUsd={cmcuserEarnUsd}
                        confluxUserPoints={confluxUserPoints}
                        confluxEarnUSD={confluxEarnUSD}
                        confluxEarnCFX={confluxEarnCFX}
                        gateEarnUSD={gateEarnUSD}
                        gateUserPoints={gateUserPoints}
                        gateEarnBnb={gateEarnBnb}
                        dogeEarnUSD={dogeEarnUSD}
                        dogeEarnBNB={dogeEarnBNB}
                        dogeUserPoints={dogeUserPoints}
                        baseEarnUSD={baseEarnUSD}
                        baseUserPoints={baseUserPoints}
                        baseEarnETH={baseEarnETH}
                        dypiusEarnUsd={dypiusEarnUsd}
                        dypiusEarnTokens={dypiusEarnTokens}
                        dypiusPremiumEarnUsd={dypiusPremiumEarnUsd}
                        dypiusPremiumEarnTokens={dypiusPremiumEarnTokens}
                        dypiusPremiumPoints={dypiusPremiumPoints}
                        corePoints={corePoints}
                        victionPoints={victionPoints}
                        bnbEarnToken={bnbEarnToken}
                        coreEarnToken={coreEarnToken}
                        victionEarnToken={victionEarnToken}
                        bnbPoints={bnbPoints}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                        cawsPremiumRewards={cawsPremiumRewards}
                        userRankRewards={userRankRewards}
                        adClicked={adClicked}
                        onClearAd={() => {
                          setadClicked("");
                        }}
                        multiversPoints={multiversPoints}
                        multiversEarnToken={multiversEarnToken}
                        multiversEarnUsd={multiversEarnUsd}
                      />
                      <WalletBalance
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        myBoughtNfts={myBoughtNfts}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        coinbase={account}
                        isVerified={data?.getPlayer?.wallet}
                        favoritesArray={favorites}
                        dypBalance={dypBalance}
                        dypBalancebnb={dypBalancebnb}
                        dypBalanceavax={dypBalanceavax}
                        idypBalance={idypBalance}
                        idypBalancebnb={idypBalancebnb}
                        idypBalanceavax={idypBalanceavax}
                        showNfts={showNfts}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        email={email}
                        userId={data?.getPlayer?.playerId}
                        username={data?.getPlayer?.displayName}
                        myCawsCollected={MyNFTSCaws}
                        myCawsOldCollected={MyNFTSCawsOld}
                        myLandCollected={MyNFTSLand}
                        myTimepieceCollected={MyNFTSTimepiece}
                        landStaked={landstakes}
                        myCawsWodStakes={myCawsWodStakesAll}
                        myWodWodStakes={myWodWodStakesAll}
                        myNFTSCoingecko={MyNFTSCoingecko}
                        myGateNfts={myGateNfts}
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        myDogeNfts={myDogeNfts}
                        myCmcNfts={myCmcNfts}
                        myCoreNfts={myCoreNfts}
                        myVictionNfts={myVictionNfts}
                        myMultiversNfts={myMultiversNfts}
                        mySkaleNfts={mySkaleNfts}
                        latestBoughtNFTS={latest20BoughtNFTS}
                        myOffers={myOffers}
                        allActiveOffers={allActiveOffers}
                        latestVersion={latestVersion}
                        MyNFTSLandBNB={MyNFTSLandBNB}
                        MyNFTSCawsBNB={MyNFTSCawsBNB}
                        MyNFTSLandAvax={MyNFTSLandAvax}
                        MyNFTSCawsAvax={MyNFTSCawsAvax}
                        MyNFTSLandBase={MyNFTSLandBase}
                        MyNFTSCawsBase={MyNFTSCawsBase}
                      />
                    </div>

                    {leaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper leaderboard-popup popup-active p-3"
                          id="leaderboard"
                          style={{ width: "80%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                WOD
                              </mark>{" "}
                              Leaderboard
                            </h2>
                            {/* {windowSize.width > 786 && (
                              <div className="d-flex align-items-center gap-2">
                                {!isPremium && (
                                  <div
                                    className="buy-premium-tag  px-4 py-1 d-flex flex-column justify-content-center align-items-center position-relative"
                                    onClick={() => {
                                      setLeaderboard(false);
                                      setgetPremiumPopup(true);
                                    }}
                                  >
                                    <span>Premium Subscriber</span>
                                    <h6>x2</h6>
                                    <div className="activate-premium-btn px-3 d-flex align-items-center justify-content-center">
                                      Activate
                                    </div>
                                  </div>
                                )}

                                <NavLink
                                  to={"/shop/events/golden-pass"}
                                  className="buy-golden-tag  px-4 py-1 d-flex flex-column justify-content-center align-items-center position-relative"
                                >
                                  <span>Golden Pass - Double</span>
                                  <h6>Double Rewards</h6>
                                  <div className="activate-golden-btn px-3 d-flex align-items-center justify-content-center">
                                    Activate
                                  </div>
                                </NavLink>
                              </div>
                            )} */}
                            <img
                              src={xMark}
                              onClick={() => setLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          {/* {windowSize.width < 786 && (
                            <div className="d-flex align-items-center gap-2">
                              {!isPremium && (
                                <div
                                  className="buy-premium-tag px-4 py-1 d-flex flex-column align-items-center justify-content-center position-relative"
                                  onClick={() => {
                                    setLeaderboard(false);
                                    setgetPremiumPopup(true);
                                  }}
                                >
                                  <span>Premium Subscriber</span>
                                  <h6>x2</h6>
                                  <div className="activate-premium-btn px-3 d-flex align-items-center justify-content-center">
                                    Activate
                                  </div>
                                </div>
                              )}
                              <NavLink
                                to={"/shop/events/golden-pass"}
                                className="buy-golden-tag px-4 py-1 d-flex flex-column align-items-center justify-content-center position-relative"
                              >
                                <span>Golden Pass - Double</span>
                                <h6>Double Rewards</h6>
                                <div className="activate-golden-btn px-3 d-flex align-items-center justify-content-center">
                                  Activate
                                </div>
                              </NavLink>
                            </div>
                          )} */}
                          <NewLeaderBoard
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            dypBalancebnb={dypBalancebnb}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            availableTime={goldenPassRemainingTime}
                            email={email}
                            isPremium={isPremium}
                            allBnbData={allBnbData}
                            allSkaleData={allSkaleData}
                            allCoreData={allCoreData}
                            allVictionData={allVictionData}
                            dailyplayerData={dailyplayerData}
                            weeklyplayerData={weeklyplayerData}
                            monthlyplayerData={monthlyplayerData}
                            genesisData={genesisData}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}
                    {genesisLeaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setGenesisLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper leaderboard-popup popup-active p-3"
                          id="leaderboard"
                          style={{ width: "35%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                Genesis
                              </mark>{" "}
                              Rewards
                            </h2>

                            <img
                              src={xMark}
                              onClick={() => setGenesisLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>

                          <GenesisLeaderboard
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            dypBalancebnb={dypBalancebnb}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            availableTime={goldenPassRemainingTime}
                            email={email}
                            isPremium={isPremium}
                            allBnbData={allBnbData}
                            allSkaleData={allSkaleData}
                            dailyplayerData={dailyplayerData}
                            weeklyplayerData={weeklyplayerData}
                            monthlyplayerData={monthlyplayerData}
                            genesisData={genesisData}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}
                    {globalLeaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setGlobalLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper leaderboard-popup popup-active p-3"
                          id="leaderboard"
                          style={{
                            width: "35%",
                            pointerEvents: "auto",
                            backgroundSize: "auto",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-end">
                            <img
                              src={xMark}
                              onClick={() => setGlobalLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>

                          <GlobalLeaderboard
                            genesisData={genesisData}
                            previousgenesisData={previousgenesisData}
                            previousGenesisVersion={previousGenesisVersion}
                            allStarData={allStarData}
                            screen={"dash"}
                            availableTime={goldenPassRemainingTime}
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            userDataStar={userDataStar}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {myRewardsPopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => setmyRewardsPopup(false)}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="leaderboard"
                          style={{
                            width: "fit-content",
                            pointerEvents: "auto",
                            overflowX: "auto",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Rewards
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setmyRewardsPopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyRewardsPopupNew
                            address={data?.getPlayer?.wallet?.publicAddress}
                            weeklyplayerData={weeklyplayerDataAmount}
                            dailyplayerData={dailyplayerDataAmount}
                            dailyDataAmountCore={dailyDataAmountCore}
                            weeklyDataAmountCore={weeklyDataAmountCore}
                            monthlyDataAmountCore={monthlyDataAmountCore}
                            dailyDataAmountViction={dailyDataAmountViction}
                            weeklyDataAmountViction={weeklyDataAmountViction}
                            monthlyDataAmountViction={monthlyDataAmountViction}
                            dailyDataAmountSkale={dailyDataAmountSkale}
                            weeklyDataAmountSkale={weeklyDataAmountSkale}
                            monthlyDataAmountSkale={monthlyDataAmountSkale}
                            userRank2={userRank2}
                            email={email}
                            userDataStar={dataAmountStar}
                            allChests={allChests}
                            allSkaleChests={allSkaleChests}
                            allCoreChests={allCoreChests}
                            allVictionChests={allVictionChests}
                            allSeiChests={allSeiChests}
                            availableTime={goldenPassRemainingTime}
                            userSocialRewards={userSocialRewards}
                            bnbEarnUsd={bnbEarnUsd}
                            skaleEarnUsd={skaleEarnUsd}
                            multiversEarnUsd={multiversEarnUsd}
                            seiEarnUsd={seiEarnUsd}
                            victionEarnUsd={victionEarnUsd}
                            coreEarnUsd={coreEarnUsd}
                            kittyDashRecords={kittyDashRecords}
                            userRankRewards={userRankRewards}
                            cawsPremiumRewards={cawsPremiumRewards}
                            genesisRank2={genesisRank2}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {dailyBonusInfo && (
                      <OutsideClickHandler
                        onOutsideClick={() => setdailyBonusInfo(false)}
                      >
                        <DailyBonusModal
                          data={dailyBonusData}
                          onClose={() => setdailyBonusInfo(false)}
                        />
                      </OutsideClickHandler>
                    )}

                    {(getPremiumPopup || adClicked === "premium" || hashValue === "#premium") && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setgetPremiumPopup(false);
                          setadClicked("");
                          window.location.hash = "";
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="subscribe-container p-2 position-relative">
                            <div
                              className=""
                              style={{ background: "#8E97CD" }}
                            ></div>
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="free-plan-title">
                                Premium Subscription
                              </h6>
                              <img
                                src={xMark}
                                onClick={() => {
                                  setgetPremiumPopup(false);
                                  setadClicked("");
                                  window.location.hash = "";
                                }}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            {discountPercentage > 0 || nftPremium_total > 0 ? (
                              <div className="premium-discount-bg mt-3 p-4 position-relative">
                                <div className="premiumRedTag position-absolute">
                                  <div className="position-relative d-flex flex-column">
                                    <img src={premiumRedTag} alt="" />
                                    <div className="d-flex flex-column position-absolute discountwrap">
                                      <span className="discount-price2 font-oxanium">
                                        {discountPercentage}%
                                      </span>
                                      <span className="discount-price-bottom">
                                        Discount
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex flex-row gap-2 gap-lg-0 justify-content-between mt-2 mt-lg-0 justify-content-lg-start flex-lg-column flex-md-column flex-sm-column align-items-center align-items-lg-start align-items-md-start align-items-sm-start">
                                  <div className="d-flex flex-column">
                                    <h6 className="lifetime-plan-text m-0">
                                      Lifetime plan
                                    </h6>
                                    {nftPremium_total > 0 && (
                                      <h6 className="token-amount-placeholder m-0 d-block d-lg-none d-md-none d-sm-none">
                                        Valid until:{" "}
                                        {new Date(
                                          nftDiscountObject.expiration * 1000
                                        )
                                          .toDateString()
                                          .slice(
                                            3,
                                            new Date(
                                              nftDiscountObject.expiration *
                                                1000
                                            ).toDateString().length
                                          )}
                                      </h6>
                                    )}
                                  </div>
                                  <div className="d-flex align-items-end gap-2">
                                    <h6 className="discount-price">
                                      {discountPercentage == 100
                                        ? "FREE"
                                        : "$" +
                                          (100 - Number(discountPercentage))}
                                    </h6>
                                    <h6 className="old-price-text">$100</h6>
                                  </div>
                                  {nftPremium_total > 0 && (
                                    <h6 className="token-amount-placeholder m-0 premium-custom-text">
                                      Valid until:{" "}
                                      {new Date(
                                        nftDiscountObject.expiration * 1000
                                      )
                                        .toDateString()
                                        .slice(
                                          3,
                                          new Date(
                                            nftDiscountObject.expiration * 1000
                                          ).toDateString().length
                                        )}
                                    </h6>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="premium-gold-bg d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                                <div className="d-flex flex-column gap-2">
                                  <span className="lifetime-plan mb-0">
                                    Lifetime plan
                                  </span>
                                  <h6 className="plan-cost mb-0">$100</h6>
                                </div>
                                <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
                                  <div className="premium-chains-wrapper">
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/ethIcon.svg`)
                                            .default
                                        }
                                        alt=""
                                      />
                                      <span className="subscription-chain mb-0">
                                        Ethereum
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/wbnbIcon.svg`)
                                            .default
                                        }
                                        alt=""
                                      />
                                      <span className="subscription-chain mb-0">
                                        BNB Chain
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                            .default
                                        }
                                        alt=""
                                      />
                                      <span className="subscription-chain mb-0">
                                        Avalanche
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={baseLogo}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Base
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={conflux}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Conflux
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={skaleIcon}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        SKALE
                                      </span>

                                      {/*   <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={seiIcon}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    <span className="subscription-chain mb-0">
                                      SEI
                                    </span>
                                  </div> */}
                                    </div>{" "}
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={coreIcon}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        CORE
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={vicitonIcon}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Viction
                                      </span>
                                    </div>
                                  </div>
                                  <img src={premiumIcon} alt="" />
                                </div>
                              </div>
                            )}
                            <div className="my-3">
                              <h6 className="popup-subtitle mb-0">Benefits</h6>
                            </div>
                            <div className="premium-benefits-wrapper d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={metaverseIcon} alt="" />
                                  <h6 className="premium-benefits-title mb-0">
                                    Metaverse
                                  </h6>
                                </div>
                                {metaverseBenefits.map((item, index) => (
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={greenCheck} alt="" />
                                    <span className="premium-benefits-item mb-0">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={dappsIcon} alt="" />
                                  <h6 className="premium-benefits-title mb-0">
                                    Dapps
                                  </h6>
                                </div>
                                {dappsBenefits.map((item, index) => (
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={greenCheck} alt="" />
                                    <span className="premium-benefits-item mb-0">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>{" "}
                            <hr className="form-divider my-4" />
                            {isConnected && (
                              <>
                                <div className="d-flex mt-4 mb-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
                                  <div className="d-flex flex-column gap-3 subscribe-input-container">
                                    <span className="token-amount-placeholder">
                                      Select chain
                                    </span>
                                    <div className="dropdown position relative">
                                      <button
                                        class={`btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle`}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <div
                                          className="d-flex align-items-center gap-2"
                                          style={{ color: "#fff" }}
                                        >
                                          <img
                                            src={require(`../../Images/premium/tokens/${chainDropdown.symbol}Icon.svg`)}
                                            alt=""
                                            style={{ width: 18, height: 18 }}
                                          />
                                          {chainDropdown.name}
                                        </div>
                                        <img src={launchpadIndicator} alt="" />
                                      </button>
                                      <ul className="dropdown-menu w-100">
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleEthPool}
                                        >
                                          <img
                                            src={
                                              require(`../../Images/premium/tokens/ethIcon.svg`)
                                                .default
                                            }
                                            style={{ width: 18, height: 18 }}
                                            alt=""
                                          />
                                          Ethereum
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleBnbPool}
                                        >
                                          <img
                                            src={
                                              require(`../../Images/premium/tokens/wbnbIcon.svg`)
                                                .default
                                            }
                                            style={{ width: 18, height: 18 }}
                                            alt=""
                                          />
                                          BNB Chain
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleAvaxPool}
                                        >
                                          <img
                                            src={
                                              require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                                .default
                                            }
                                            style={{ width: 18, height: 18 }}
                                            alt=""
                                          />
                                          Avalanche
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleBasePool}
                                        >
                                          <img
                                            src={baseLogo}
                                            alt=""
                                            style={{
                                              width: "18px",
                                              height: "18px",
                                            }}
                                          />
                                          Base Network
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleConfluxPool}
                                        >
                                          <img
                                            src={conflux}
                                            alt=""
                                            style={{
                                              width: "18px",
                                              height: "18px",
                                            }}
                                          />
                                          Conflux Network
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleSkalePool}
                                        >
                                          <img
                                            src={skaleIcon}
                                            alt=""
                                            style={{
                                              width: "18px",
                                              height: "18px",
                                            }}
                                          />
                                          SKALE
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleCorePool}
                                        >
                                          <img
                                            src={coreIcon}
                                            alt=""
                                            style={{
                                              width: "18px",
                                              height: "18px",
                                            }}
                                          />
                                          CORE
                                        </li>
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleVictionPool}
                                        >
                                          <img
                                            src={vicitonIcon}
                                            alt=""
                                            style={{
                                              width: "18px",
                                              height: "18px",
                                            }}
                                          />
                                          Viction
                                        </li>
                                        {/*   <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleSeiPool}
                                    >
                                      <img
                                        src={seiIcon}
                                        alt=""
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      />
                                      SEI
                                    </li> */}
                                      </ul>
                                    </div>
                                  </div>

                                  {/* <div className="d-flex flex-column gap-3 subscribe-input-container"></div> */}
                                  {discountPercentage < 100 && (
                                    <div className="d-flex flex-column align-items-end gap-3">
                                      <span className="my-premium-balance-text mb-0">
                                        My balance:{" "}
                                        {getFormattedNumber(
                                          tokenBalance / 10 ** tokenDecimals,
                                          5
                                        )}{" "}
                                        {dropdownIcon.toUpperCase()}
                                      </span>
                                      <div
                                        className="premium-benefits-wrapper p-2 d-flex align-items-center gap-4"
                                        style={{ height: "34px" }}
                                      >
                                        <span className="subscription-price-text mb-0">
                                          Subscription Price:
                                        </span>

                                        <div className="d-flex align-items-center gap-2">
                                          <div className="dropdown position relative">
                                            <button
                                              class={`btn launchpad-dropdown d-flex gap-1 justify-content-between align-items-center dropdown-toggle2 w-100`}
                                              type="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <div
                                                className="d-flex align-items-center gap-2"
                                                style={{ color: "#fff" }}
                                              >
                                                <img
                                                  src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                                  alt=""
                                                  style={{
                                                    width: 18,
                                                    height: 18,
                                                  }}
                                                />
                                                {/* {dropdownTitle} */}
                                              </div>
                                              <img
                                                src={launchpadIndicator}
                                                alt=""
                                              />
                                            </button>
                                            <ul className="dropdown-menu w-100">
                                              {Object.keys(
                                                chainId === 1
                                                  ? window.config
                                                      .subscriptioneth_tokens
                                                  : chainId === 56
                                                  ? window.config
                                                      .subscriptionbnb_tokens
                                                  : chainId === 1030
                                                  ? window.config
                                                      .subscriptioncfx_tokens
                                                  : chainId === 43114
                                                  ? window.config
                                                      .subscription_tokens
                                                  : chainId === 8453
                                                  ? window.config
                                                      .subscriptionbase_tokens
                                                  : chainId === 1482601649
                                                  ? window.config
                                                      .subscriptionskale_tokens
                                                  : chainId === 88
                                                  ? window.config
                                                      .subscriptionviction_tokens
                                                  : chainId === 1116
                                                  ? window.config
                                                      .subscriptioncore_tokens
                                                  : chainId === 713715
                                                  ? window.config
                                                      .subscriptionsei_tokens
                                                  : window.config
                                                      .subscription_tokens
                                              ).map((t, i) => (
                                                <li
                                                  key={i}
                                                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                                  onClick={() => {
                                                    window.cached_contracts =
                                                      Object.create(null);
                                                    setTimeout(() => {
                                                      setdropdownIcon(
                                                        chainId === 1
                                                          ? window.config
                                                              .subscriptioneth_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 56
                                                          ? window.config
                                                              .subscriptionbnb_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 43114
                                                          ? window.config
                                                              .subscription_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 8453
                                                          ? window.config
                                                              .subscriptionbase_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 1030
                                                          ? window.config
                                                              .subscriptioncfx_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId ===
                                                            1482601649
                                                          ? window.config
                                                              .subscriptionskale_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 88
                                                          ? window.config
                                                              .subscriptionviction_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 1116
                                                          ? window.config
                                                              .subscriptioncore_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 713715
                                                          ? window.config
                                                              .subscriptionsei_tokens[
                                                              t
                                                            ]?.symbol
                                                          : window.config
                                                              .subscription_tokens[
                                                              t
                                                            ]?.symbol
                                                      );
                                                      setdropdownTitle(
                                                        chainId === 1
                                                          ? window.config
                                                              .subscriptioneth_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 56
                                                          ? window.config
                                                              .subscriptionbnb_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 43114
                                                          ? window.config
                                                              .subscription_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 8453
                                                          ? window.config
                                                              .subscriptionbase_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 1030
                                                          ? window.config
                                                              .subscriptioncfx_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId ===
                                                            1482601649
                                                          ? window.config
                                                              .subscriptionskale_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 88
                                                          ? window.config
                                                              .subscriptionviction_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 713715
                                                          ? window.config
                                                              .subscriptionsei_tokens[
                                                              t
                                                            ]?.symbol
                                                          : chainId === 1116
                                                          ? window.config
                                                              .subscriptioncore_tokens[
                                                              t
                                                            ]?.symbol
                                                          : window.config
                                                              .subscription_tokens[
                                                              t
                                                            ]?.symbol
                                                      );

                                                      // console.log(t);
                                                      handleSubscriptionTokenChange(
                                                        t
                                                      );
                                                      handleCheckIfAlreadyApproved(
                                                        t
                                                      );
                                                    }, 200);
                                                  }}
                                                >
                                                  <img
                                                    src={
                                                      chainId === 1
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptioneth_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 56
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptionbnb_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 43114
                                                        ? require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 1030
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptioncfx_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 8453
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptionbase_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 1482601649
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptionskale_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 1116
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptioncore_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 88
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptionviction_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : chainId === 713715
                                                        ? require(`../../Images/premium/tokens/${window.config.subscriptionsei_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                        : require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                            t
                                                          ]?.symbol.toLowerCase()}Icon.svg`)
                                                    }
                                                    alt=""
                                                    style={{
                                                      width: 18,
                                                      height: 18,
                                                    }}
                                                  />
                                                  {chainId === 1
                                                    ? window.config
                                                        .subscriptioneth_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 56
                                                    ? window.config
                                                        .subscriptionbnb_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 43114
                                                    ? window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol
                                                    : chainId === 1030
                                                    ? window.config
                                                        .subscriptioncfx_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 8453
                                                    ? window.config
                                                        .subscriptionbase_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 1482601649
                                                    ? window.config
                                                        .subscriptionskale_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 1116
                                                    ? window.config
                                                        .subscriptioncore_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 88
                                                    ? window.config
                                                        .subscriptionviction_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 713715
                                                    ? window.config
                                                        .subscriptionsei_tokens[
                                                        t
                                                      ]?.symbol
                                                    : window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          {/* <img
                                      src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                      height={16}
                                      width={16}
                                      alt="usdt"
                                    /> */}
                                          <span className="subscription-price-token mb-0">
                                            {formattedPrice.slice(0, 7)}
                                          </span>
                                        </div>
                                        <span className="subscription-price-usd mb-0">
                                          ${100 - Number(discountPercentage)}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* <div className="d-flex flex-column align-items-end justify-content-lg-end">
                                <span className="token-balance-placeholder">
                                  Token Balance
                                </span>
                                <h6 className="account-token-amount">
                                  {" "}
                                  {getFormattedNumber(
                                    tokenBalance / 10 ** tokenDecimals,
                                    6
                                  )}
                                </h6>
                              </div> */}
                                </div>
                              </>
                            )}
                            {/* <div
                              className="subscription-token-wrapper  p-2 d-flex align-items-center justify-content-between  mt-3"
                              style={{ width: "100%" }}
                            >
                              <span className="token-amount-placeholder">
                                Subscription price:
                              </span>
                              <div className="d-flex align-items-center gap-2">
                                <span className="usdt-text">
                                  {formattedPrice.slice(0, 9)}
                                </span>

                                <img
                                  src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                  height={24}
                                  width={24}
                                  alt="usdt"
                                />
                              </div>
                            </div> */}
                            {chainId === 1482601649 && (
                              <div className="gotoNebula-wrapper p-3 mb-3">
                                <div className="d-flex w-100 justify-content-between gap-2">
                                  <span className="nebula-wrapper-text">
                                    Bridge your USDC to Nebula now!
                                  </span>
                                  <a
                                    className="nebula-bridgebtn"
                                    href="https://portal.skale.space/bridge?from=mainnet&to=green-giddy-denebola&token=usdc&type=erc20"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Nebula Bridge
                                  </a>
                                </div>
                              </div>
                            )}
                            {isConnected &&
                            discountPercentage > 0 &&
                            chainId === 56 ? (
                              <div className="d-flex align-items-center gap-3 justify-content-center">
                                <div
                                  className={` ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    disabled={
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? true
                                        : false
                                    }
                                    onClick={(e) => handleApprove(e)}
                                  >
                                    {loadspinner === false &&
                                    (approveStatus === "initial" ||
                                      approveStatus === "deposit" ||
                                      approveStatus === "failsubscribe" ||
                                      approveStatus === "approveAmount" ||
                                      approveStatus === "successsubscribe") ? (
                                      <>
                                        Approve{" "}
                                        {approveStatus === "approveAmount"
                                          ? "token"
                                          : nftPremium_total > 0
                                          ? "NFT"
                                          : ""}
                                      </>
                                    ) : loadspinner === false &&
                                      approveStatus === "fail" ? (
                                      "Failed"
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        Processing
                                        <div
                                          className="spinner-border "
                                          role="status"
                                          style={{
                                            height: "1rem",
                                            width: "1rem",
                                          }}
                                        ></div>{" "}
                                      </div>
                                    )}
                                  </button>
                                </div>
                                <div
                                  className={` ${
                                    isApproved === false
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      isApproved === false
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    onClick={() => handleSubscribe()}
                                  >
                                    {loadspinnerSub === false &&
                                    (approveStatus === "initial" ||
                                      approveStatus === "fail" ||
                                      approveStatus === "deposit") ? (
                                      <>
                                        {discountPercentage > 0 ||
                                        nftPremium_total > 0
                                          ? "Redeem"
                                          : "Buy"}
                                      </>
                                    ) : loadspinnerSub === false &&
                                      approveStatus === "successsubscribe" ? (
                                      "Success"
                                    ) : loadspinnerSub === false &&
                                      approveStatus === "failsubscribe" ? (
                                      "Failed"
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        Processing
                                        <div
                                          className="spinner-border "
                                          role="status"
                                          style={{
                                            height: "1rem",
                                            width: "1rem",
                                          }}
                                        ></div>{" "}
                                      </div>
                                    )}
                                  </button>
                                </div>
                              </div>
                            ) : isConnected && discountPercentage === 0 ? (
                              <div className="d-flex align-items-center gap-3 justify-content-center">
                                <div
                                  className={` ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    disabled={
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? true
                                        : false
                                    }
                                    onClick={(e) => handleApprove(e)}
                                  >
                                    {loadspinner === false &&
                                    (approveStatus === "initial" ||
                                      approveStatus === "deposit" ||
                                      approveStatus === "failsubscribe" ||
                                      approveStatus === "approveAmount" ||
                                      approveStatus === "successsubscribe") ? (
                                      <>
                                        Approve{" "}
                                        {approveStatus === "approveAmount"
                                          ? "token"
                                          : nftPremium_total > 0
                                          ? "NFT"
                                          : ""}
                                      </>
                                    ) : loadspinner === false &&
                                      approveStatus === "fail" ? (
                                      "Failed"
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        Processing
                                        <div
                                          className="spinner-border "
                                          role="status"
                                          style={{
                                            height: "1rem",
                                            width: "1rem",
                                          }}
                                        ></div>{" "}
                                      </div>
                                    )}
                                  </button>
                                </div>
                                <div
                                  className={` ${
                                    isApproved === false
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      isApproved === false
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    onClick={() => handleSubscribe()}
                                  >
                                    {loadspinnerSub === false &&
                                    (approveStatus === "initial" ||
                                      approveStatus === "fail" ||
                                      approveStatus === "deposit") ? (
                                      <>
                                        {discountPercentage > 0 ||
                                        nftPremium_total > 0
                                          ? "Redeem"
                                          : "Buy"}
                                      </>
                                    ) : loadspinnerSub === false &&
                                      approveStatus === "successsubscribe" ? (
                                      "Success"
                                    ) : loadspinnerSub === false &&
                                      approveStatus === "failsubscribe" ? (
                                      "Failed"
                                    ) : (
                                      <div
                                        className="spinner-border "
                                        role="status"
                                        style={{
                                          height: "1rem",
                                          width: "1rem",
                                        }}
                                      ></div>
                                    )}
                                  </button>
                                </div>
                              </div>
                            ) : isConnected &&
                              discountPercentage > 0 &&
                              chainId !== 56 ? (
                              <div
                                className={`d-flex align-items-center justify-content-center mb-2`}
                              >
                                <button
                                  className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                                  onClick={() => {
                                    handleBnbPool();
                                  }}
                                  style={{
                                    width: "fit-content",
                                    whiteSpace: "nowrap",
                                    fontSize: 14,
                                  }}
                                >
                                  Switch to BNB Chain
                                </button>
                              </div>
                            ) : (
                              <div
                                className={`d-flex align-items-center justify-content-center mb-2`}
                              >
                                <button
                                  className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                                  onClick={() => {
                                    setshowWalletModal(true);
                                    setgetPremiumPopup(false);
                                  }}
                                  style={{
                                    width: "fit-content",
                                    whiteSpace: "nowrap",
                                    fontSize: 14,
                                  }}
                                >
                                  Connect wallet
                                </button>
                              </div>
                            )}
                            <div
                              className={`d-flex align-items-center justify-content-center`}
                            >
                              {!coinbase && (
                                <span style={{ color: "rgb(227, 6 ,19)" }}>
                                  Please connect your wallet first
                                </span>
                              )}
                              {/* <div className="d-flex flex-column gap-2 justify-content-end align-items-center">
                                <button
                                  className={
                                    "btn success-btn px-4 align-self-end"
                                  }
                                  disabled={
                                    approveStatus === "fail" || !coinbase
                                      ? true
                                      : false
                                  }
                                  style={{
                                    background:
                                      approveStatus === "fail"
                                        ? "linear-gradient(90.74deg, #f8845b 0%, #f0603a 100%)"
                                        : "linear-gradient(90.74deg, #75CAC2 0%, #57B6AB 100%)",
                                  }}
                                  onClick={(e) =>
                                    isApproved === false
                                      ? handleApprove(e)
                                      : handleSubscribe()
                                  }
                                >
                                  {isApproved === true &&
                                  loadspinner === false &&
                                  loadspinnerSub === false &&
                                  (approveStatus === "deposit" ||
                                    approveStatus === "initial") ? (
                                    "Subscribe"
                                  ) : isApproved === false &&
                                    loadspinner === false &&
                                    approveStatus === "initial" &&
                                    loadspinnerSub === false ? (
                                    "Approve"
                                  ) : loadspinner === false &&
                                    approveStatus === "fail" &&
                                    loadspinnerSub === false ? (
                                    "Failed"
                                  ) : (
                                    <div
                                      className="spinner-border "
                                      role="status"
                                      style={{
                                        height: "1.5rem",
                                        width: "1.5rem",
                                      }}
                                    ></div>
                                  )}
                                </button>
                                <span style={{ color: "#E30613" }}>
                                  {status}
                                </span>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </OutsideClickHandler>
                    )}

                    {balancePopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setBalancePopup(false);
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Balance
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setBalancePopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyBalance
                            dypBalance={dypBalance}
                            dypBalancebnb={dypBalancebnb}
                            dypBalanceavax={dypBalanceavax}
                            idypBalance={idypBalance}
                            idypBalancebnb={idypBalancebnb}
                            idypBalanceavax={idypBalanceavax}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* {dailyBonusPopup && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setdailyBonusPopup(false);
                }}
              >
                <div
                  className="package-popup-wrapper2"
                  id="dailyrewardpopup"
                  style={{ pointerEvents: "auto" }}
                >
                  <img
                    src={rewardPopup}
                    alt=""
                    className="popup-linear2"
                    loading="eager"
                  />

                  <DailyBonusPopup
                    onclose={() => {
                      setdailyBonusPopup(false);
                    }}
                    isPremium={isPremium}
                    address={data?.getPlayer?.wallet?.publicAddress}
                    claimedChests={claimedChests}
                    claimedPremiumChests={claimedPremiumChests}
                    onChestClaimed={() => {
                      setCount(count + 1);
                    }}
                    standardChests={standardChests}
                    premiumChests={premiumChests}
                    email={email}
                    openedChests={openedChests}
                    chainId={chainId}
                    coinbase={coinbase}
                    handleSwitchNetwork={handleSwitchNetwork}
                    myNFTSCaws={MyNFTSCaws.length}
                    myNFTSLand={MyNFTSLand.length}
                    myNFTSTimepiece={MyNFTSTimepiece.length}
                    allChests={allChests}
                    canBuy={canBuy}
                    dummypremiumChests={dummypremiumChests}
                  />
                </div>
              </OutsideClickHandler>
            )} */}
            {(dailyBonusPopup || hashValue === "#dailybonus") && (
              // <OutsideClickHandler
              //   onOutsideClick={() => {
              //     setdailyBonusPopup(false);
              //   }}
              // >
              <NewDailyBonus
                isPremium={isPremium}
                bnbImages={bnbImages}
                skaleImages={skaleImages}
                seiImages={seiImages}
                victionImages={victionImages}
                coreImages={coreImages}
                chainId={chainId}
                dypTokenData={dypTokenData}
                ethTokenData={ethTokenData}
                dyptokenData_old={dyptokenData_old}
                handleSwitchChain={handleSwitchChain}
                handleSwitchNetwork={handleSwitchNetwork}
                listedNFTS={listedNFTS}
                onclose={() => {
                  setdailyBonusPopup(false);
                  window.location.hash = "";
                }}
                coinbase={coinbase}
                standardChests={standardChests}
                premiumChests={premiumChests}
                standardSkaleChests={standardSkaleChests}
                premiumSkaleChests={premiumSkaleChests}
                standardCoreChests={standardCoreChests}
                premiumCoreChests={premiumCoreChests}
                standardVictionChests={standardVictionChests}
                premiumVictionChests={premiumVictionChests}
                standardSeiChests={standardSeiChests}
                premiumSeiChests={premiumSeiChests}
                claimedChests={claimedChests}
                claimedPremiumChests={claimedPremiumChests}
                claimedSkaleChests={claimedSkaleChests}
                claimedSkalePremiumChests={claimedSkalePremiumChests}
                claimedCoreChests={claimedCoreChests}
                claimedCorePremiumChests={claimedCorePremiumChests}
                claimedVictionChests={claimedVictionChests}
                claimedVictionPremiumChests={claimedVictionPremiumChests}
                claimedSeiChests={claimedSeiChests}
                claimedSeiPremiumChests={claimedSeiPremiumChests}
                email={email}
                openedChests={openedChests}
                openedSkaleChests={openedSkaleChests}
                openedCoreChests={openedCoreChests}
                openedVictionChests={openedVictionChests}
                openedSeiChests={openedSeiChests}
                canBuy={canBuy}
                address={data?.getPlayer?.wallet?.publicAddress}
                allChests={allChests}
                allSkaleChests={allSkaleChests}
                allCoreChests={allCoreChests}
                allVictionChests={allVictionChests}
                allSeiChests={allSeiChests}
                onChestClaimed={() => {
                  setCount(count + 1);
                }}
                onSkaleChestClaimed={() => {
                  setCount(count + 1);
                }}
                onCoreChestClaimed={() => {
                  setCount(count + 1);
                }}
                onVictionChestClaimed={() => {
                  setCount(count + 1);
                }}
                onSeiChestClaimed={() => {
                  setCount(count + 1);
                }}
                dummypremiumChests={dummypremiumChests}
                onPremiumClick={() => {
                  setgetPremiumPopup(true);
                }}
                premiumTxHash={premiumTxHash}
                selectedChainforPremium={selectedChainforPremium}
                onPremiumClickOther={() => {
                  setdailyBonusPopup(false);
                  setgetPremiumPopup(true);
                }}
              />
              // </OutsideClickHandler>
            )}
            {showChecklistModal === true && (
              <ChecklistModal
                show={showChecklistModal}
                handleClose={() => {
                  setshowChecklistModal(false);
                }}
                cawsitem={tokensState?.items?.length > 0 && tokensState.items}
                stakes={stakes}
              />
            )}

            {showWalletModal === true && success === false && (
              <WalletModal
                show={showWalletModal}
                handleClose={() => {
                  setshowWalletModal(false);
                }}
                handleConnection={handleConnect}
              />
            )}

            {showSyncModal === true && (
              <SyncModal
                onCancel={() => {
                  setshowSyncModal(false);
                }}
                onclose={() => {
                  setshowSyncModal(false);
                }}
                open={showSyncModal}
                onConfirm={handleSync}
                syncStatus={syncStatus}
              />
            )}

            {showChecklistLandNftModal === true && (
              <ChecklistLandNftModal
                show={showChecklistLandNftModal}
                handleClose={() => {
                  setshowChecklistLandNftModal(false);
                }}
                cawsitem={
                  tokensState?.landItems?.length > 0 && tokensState.landItems
                }
                stakes={landstakes}
              />
            )}
            {/* <ErrorAlert error={connectedState?.error} /> */}
          </LoginWrapper>
        </div>
      </div>