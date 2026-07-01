import { createConfig, http } from "wagmi";
import { fallback } from "viem";
import "@metamask/connect-evm";
import {
  mainnet,
  // matchain,
  opBNB,
  bsc,
  manta,
  taiko,
  coreDao,
  base,
  sei,
  viction,
  avalanche,
  skaleNebula,
  immutableZkEvm,
  confluxESpace,
  vanar,
  // taraxa,
} from "wagmi/chains";
import {
  metaMask,
  coinbaseWallet,
  walletConnect,
  injected,
} from "wagmi/connectors";

export const wagmiClient = createConfig({
  chains: [
    mainnet,
    // matchain,
    opBNB,
    bsc,
    manta,
    taiko,
    coreDao,
    base,
    sei,
    viction,
    avalanche,
    skaleNebula,
    immutableZkEvm,
    confluxESpace,
    vanar,
    // taraxa,
  ],
  connectors: [
    metaMask({
      dapp: {
        name: "World of Dypians",
        url:
          typeof window !== "undefined"
            ? window.location.origin
            : "https://www.worldofdypians.com",
      },
    }),
    walletConnect({
      projectId: "a4f2c3075e5ea8ee42bdfe3c74a29caf",
      metadata: {
        name: "World of Dypians",
        description: "World of Dypians",
        url:
          typeof window !== "undefined"
            ? window.location.origin
            : "https://www.worldofdypians.com",
        icons:
          typeof window !== "undefined"
            ? [`${window.location.origin}/favicon.ico`]
            : ["https://www.worldofdypians.com/favicon.ico"],
      },
    }),
    injected(),
    // Dedicated connector for Binance App's built-in DApp browser.
    // Only functional when window.binancew3w.ethereum is present (i.e. inside the Binance app).
    injected({
      target: () => {
        if (
          typeof window !== "undefined" &&
          typeof window.binancew3w?.ethereum !== "undefined"
        ) {
          return {
            id: "wallet.binance.com",
            name: "Binance Web3 Wallet",
            provider: window.binancew3w.ethereum,
          };
        }
        return undefined;
      },
    }),
    coinbaseWallet(),
  ],
  transports: {
    [bsc.id]: http(),
    [mainnet.id]: fallback([
      http("https://mainnet.infura.io/v3/04ee2486b5344943b461abeb58fbffaf"),
    ]),
    // [matchain.id]: http(),
    [opBNB.id]: http(),
    [manta.id]: fallback([
      http("https://pacific-rpc.manta.network/http"),
      http("https://manta-pacific.drpc.org"),
      http("https://r1.pacific.manta.systems/http"),
      http("https://1rpc.io/manta"),
    ]),
    [taiko.id]: fallback([
      http("https://rpc.mainnet.taiko.xyz"),
      http("https://rpc.ankr.com/taiko"),
    ]),
    [coreDao.id]: fallback([
      http("https://rpc.coredao.org"),
      http("https://core.drpc.org"),
    ]),
    [base.id]: fallback([
      http("https://1rpc.io/base"),
      http("https://base-rpc.publicnode.com"),
    ]),
    [sei.id]: fallback([
      http("https://evm-rpc.sei-apis.com"),
      http("https://sei.drpc.org"),
    ]),
    [viction.id]: fallback([
      http("https://rpc.viction.xyz"),
      http("https://viction.drpc.org"),
    ]),
    [avalanche.id]: fallback([
      http("https://api.avax.network/ext/bc/C/rpc"),
      http("https://avalanche.publicnode.com"),
    ]),
    [skaleNebula.id]: http(
      "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
    ),
    [immutableZkEvm.id]: http("https://rpc.immutable.com"),
    [confluxESpace.id]: http("https://evm.confluxrpc.com"),
    [vanar.id]: http("https://rpc.vanarchain.com"),
    // [taraxa.id]: http(),
  },
});
