import { useDispatch, useSelector } from "react-redux";

import {
  resetWallet,
  setAddress,
  setChainId,
  setWalletModal,
  openWalletModal,
  closeWalletModal,
  setWalletId,
  setWalletType,
  setIsConnected,
} from "../slices/walletSlice";
import { resetUser, setUserStats, setUserNFTs, setUserProgress } from "../slices/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return {
    user,
    resetUser: () => dispatch(resetUser()),
    setUserStats: (data) => dispatch(setUserStats(data)),
    setUserNFTs: (data) => dispatch(setUserNFTs(data)),
    setUserProgress: (data) => dispatch(setUserProgress(data)),
  };
};

export const useWallet = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const selectAddress = useSelector((state) => state.wallet.address);
  const selectChainId = useSelector((state) => state.wallet.chainId);
  const selectIsConnected = useSelector((state) => state.wallet.isConnected);
  const selectWalletModal = useSelector((state) => state.wallet.walletModal);

  return {
    wallet,
    address: selectAddress,
    chainId: selectChainId,
    isConnected: selectIsConnected,
    walletModal: selectWalletModal,
    resetWallet: () => dispatch(resetWallet()),
    setAddress: (address) => dispatch(setAddress(address)),
    setChainId: (chainId) => dispatch(setChainId(chainId)),
    setWalletModal: (show) => dispatch(setWalletModal(show)),
    openWalletModal: () => dispatch(openWalletModal()),
    closeWalletModal: () => dispatch(closeWalletModal()),
    setWalletId: (id) => dispatch(setWalletId(id)),
    setWalletType: (type) => dispatch(setWalletType(type)),
    setIsConnected: (value) => dispatch(setIsConnected(value)),
  };
};
