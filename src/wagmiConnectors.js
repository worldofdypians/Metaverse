import { createConfig, http } from "wagmi";
import { fallback } from "viem";
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
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";

const binanceConnector = getWagmiConnectorV2();

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
  autoConnect: true,
  connectors: [
    walletConnect({
      projectId: "a4f2c3075e5ea8ee42bdfe3c74a29caf"
    }),
    injected(),
    binanceConnector(),
    metaMask(),
    coinbaseWallet(),
  ],
  transports: {
    [bsc.id]: http(),
    [mainnet.id]: http(),
    // [matchain.id]: http(),
    [opBNB.id]: http(),
    [manta.id]: http("https://pacific-rpc.manta.network/http"),
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
      "https://mainnet.skalenodes.com/v1/green-giddy-denebola"
    ),
    [immutableZkEvm.id]: http("https://rpc.immutable.com"),
    [confluxESpace.id]: http("https://evm.confluxrpc.com"),
    [vanar.id]: http("https://rpc.vanarchain.com"),
    // [taraxa.id]: http(),
  },
});
