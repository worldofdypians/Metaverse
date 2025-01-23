import React, { useEffect } from "react";
import "./_terms.scss";

const BinanceCampaignRules = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Binance Wallet Campaign Rules";
  }, []);

  return (
    <div className="container-fluid mt-lg-5 pt-lg-5 px-0 d-flex news-main-wrapper align-items-center justify-content-center">
      <div className="custom-container  my-lg-0 my-5 py-0 py-lg-5">
        <div className="d-flex w-100 flex-column">
          <div className="row w-100 mx-0 news-container">
            <div className="explorer-grid-title my-4">Campaign Rules</div>
            <div className="news-card terms-container p-4 d-flex flex-column gap-3">
              <p className="text-white m-0">
                Welcome to the{" "}
                <b>
                  World of Dypians $50,000 WOD Token Airdrop Campaign with
                  Binance Wallet!
                </b>{" "}
                This is your chance to earn a share of $50,000 in WOD tokens by
                completing simple tasks and demonstrating your commitment to the
                World of Dypians ecosystem. Whether you're a seasoned player or
                a newcomer, this campaign is designed to reward you for your
                participation and engagement.
              </p>
              <p className="text-white m-0">
                <b>Activity Period:</b>
              </p>
              <ul>
                <li className="text-white">Start: 2025-01-23 12:00 (UTC)</li>
                <li className="text-white">End: 2025-02-06 12:00 (UTC)</li>
              </ul>
              <p className="text-white m-0">
                <b>Mission Details and Prizes:</b>
              </p>
              <ol>
                <li className="text-white">
                  <b>Off-Chain Tasks</b>
                  <ul>
                    <li className="text-white">
                      <b>
                        <a
                          href="https://x.com/BinanceWallet"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white text-decoration-underline"
                        >
                          Follow Binance Wallet on X
                        </a>
                      </b>
                    </li>

                    <li className="text-white">
                      <b>
                        <a
                          href="https://x.com/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white text-decoration-underline"
                        >
                          Follow World of Dypians on X
                        </a>
                      </b>
                    </li>
                    <li className="text-white">
                      <b>
                        <a
                          href="https://x.com/worldofdypians/status/1861727880608149537"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white text-decoration-underline"
                        >
                          Like and Retweet the Pinned Post
                        </a>
                      </b>
                    </li>
                  </ul>
                </li>
                <li className="text-white">
                  <b>On-Chain Tasks</b>
                  <ul>
                    <li className="text-white">
                      Swap a minimum of $10 USDC for $WOD on BNB Chain using the
                      native swap feature in the Binance Wallet
                    </li>
                  </ul>
                </li>
              </ol>
              <p className="text-white m-0">
                <b>Prizes Breakdown:</b>
              </p>
              <p className="text-white m-0">
                2,000 winners will be selected to share $50,000 in WOD tokens.
                Each winner will receive $25 in WOD tokens, selected via a
                raffle.
              </p>
              <p className="text-white m-0">
                <u>
                  The value of the rewards for WOD tokens was calculated on
                  2025-01-23.
                </u>
              </p>
              <p className="text-white m-0">
                <b>Terms and Conditions (T&C):</b>
              </p>
              <ol>
                <li className="text-white">
                  Participants must complete all mandatory tasks to qualify.
                </li>
                <li className="text-white">
                  Rewards can be claimed in Binance Wallet after the campaign.
                </li>
                <li className="text-white">
                  Users with multiple entries or fraudulent behavior will be
                  disqualified.
                </li>
                {/* <li className="text-white">
                Swap at least $10 worth of USDC/WOD on Binance Wallet
                </li> */}
              </ol>

              <p className="text-white m-0">
                <b>FAQs</b>
              </p>
              <ol>
                <li className="text-white">
                  <b>What is the campaign prize?</b>
                  <ul>
                    <li
                      className="text-white"
                      style={{ listStyleType: "none" }}
                    >
                      The prize pool consists of $50,000 worth of WOD tokens,
                      shared among 2,000 winners, each receiving $25 worth of
                      WOD tokens.
                    </li>
                  </ul>
                </li>
                <li className="text-white">
                  <b>Who is eligible to participate?</b>
                  <ul>
                    <li
                      className="text-white"
                      style={{ listStyleType: "none" }}
                    >
                      Only Keyless MPC Binance Wallet users with verified
                      accounts are eligible to participate in this campaign.
                      Each user can only join once, ensuring fair participation
                      and preventing duplicate entries.
                    </li>
                  </ul>
                </li>
                <li className="text-white">
                  <b>Can I participate with multiple wallets?</b>
                  <ul>
                    <li
                      className="text-white"
                      style={{ listStyleType: "none" }}
                    >
                      No, participants using multiple wallets or engaging in
                      fraudulent behavior will be disqualified.
                    </li>
                  </ul>
                </li>
                {/* <li className="text-white">
                  <b>Do I need to hold WOD tokens before swapping?</b>
                  <ul>
                    <li
                      className="text-white"
                      style={{ listStyleType: "none" }}
                    >
                      Yes, you need at least $25 worth of WOD tokens before
                      participating in the swapping process.
                    </li>
                  </ul>
                </li> */}
                <li className="text-white">
                  <b>Is there a limit on the number of entries?</b>
                  <ul>
                    <li
                      className="text-white"
                      style={{ listStyleType: "none" }}
                    >
                      Each participant can enter once and must complete all
                      tasks to be eligible for the prize.
                    </li>
                  </ul>
                </li>
              </ol>

              {/* <p className="text-white m-0">
                <b>Tutorial: How to Stake WOD Tokens</b>
              </p>
              <p className="text-white m-0">
                Follow these simple steps to stake your WOD tokens and qualify
                for the campaign:
              </p>
              <ol>
                <li className="text-white">
                  <b>Step 1: Access the Staking Pool</b>
                  <ul>
                    <li className="text-white">
                      Go to the official staking pool URL:{" "}
                      <a
                        href="https://www.worldofdypians.com/staking"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white text-decoration-underline"
                      >
                        https://www.worldofdypians.com/staking
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="text-white">
                  <b>Step 2: Connect Your Wallet</b>
                  <ul>
                    <li className="text-white">
                      Click on the “Connect Wallet” button at the top-right
                      corner of the page.
                    </li>
                    <li className="text-white">
                      Select your Binance Wallet and authorize the connection.
                    </li>
                  </ul>
                </li>
                <li className="text-white">
                  <b>Step 3: Approve WOD Tokens</b>
                  <ul>
                    <li className="text-white">
                      Ensure you have at least <b>50 WOD</b> tokens in your
                      wallet.
                    </li>
                    <li className="text-white">
                      Click on “Approve” to allow the staking pool to interact
                      with your WOD tokens.
                    </li>
                  </ul>
                </li>
                <li className="text-white">
                  <b>Step 4: Stake Your WOD Tokens</b>
                  <ul>
                    <li className="text-white">
                      Enter the amount of WOD tokens you want to stake (minimum
                      50 WOD).
                    </li>
                    <li className="text-white">
                      Confirm the transaction in your wallet and pay the
                      necessary gas fee.
                    </li>
                  </ul>
                </li>
              </ol> */}
              <p className="text-white m-0">
                That’s it! You’re now part of the $50,000 WOD Token Airdrop.
                Good luck!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinanceCampaignRules;
