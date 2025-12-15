import { createConfig, http } from "wagmi";
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
    [manta.id]: http(),
    [taiko.id]: http(),
    [coreDao.id]: http(),
    [base.id]: http(),
    [sei.id]: http(),
    [viction.id]: http(),
    [avalanche.id]: http(),
    [skaleNebula.id]: http(),
    [immutableZkEvm.id]: http(),
    [confluxESpace.id]: http(),
    [vanar.id]: http(),
    // [taraxa.id]: http(),
  },
});
