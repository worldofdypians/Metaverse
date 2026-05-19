/** Persists the UI semantic wallet type (e.g. "binance" vs generic WalletConnect). */

const SEMANTIC_WALLET_TYPE_KEY = "wod_semantic_wallet_type";

export function getPersistedSemanticWalletType() {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(SEMANTIC_WALLET_TYPE_KEY);
  } catch {
    return null;
  }
}

export function setPersistedSemanticWalletType(type) {
  try {
    if (typeof window === "undefined") return;
    if (type) window.localStorage.setItem(SEMANTIC_WALLET_TYPE_KEY, type);
    else window.localStorage.removeItem(SEMANTIC_WALLET_TYPE_KEY);
  } catch {
    // ignore quota / private mode
  }
}

export function clearPersistedSemanticWalletType() {
  setPersistedSemanticWalletType(null);
}
