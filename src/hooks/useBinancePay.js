import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export function useBinancePay() {
  const [merchantTradeNo, setMerchantTradeNo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [statusbinance, setStatus] = useState("idle");
  const [txHash, setTxHash] = useState(null);
  const [showQr, setShowQr] = useState(false);

  const pollInterval = useRef(null);

  const days = [
    "dragon-ruins",
    "cold-bite",
    "fury-beast",
    "wing-storm",
    "maze-day",
    "scorpion-king",
    "stone-eye",
  ];
  const now = new Date();

  const utcDayIndex = new Date().getUTCDay();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const isAfterCutoff = utcHours === 0 && utcMinutes >= 30;

  let adjustedDay = isAfterCutoff
    ? utcDayIndex === 0
      ? 7
      : utcDayIndex
    : utcHours === 0
    ? utcDayIndex === 0
      ? 6
      : utcDayIndex - 1
    : utcDayIndex === 0
    ? 7
    : utcDayIndex;

  const dayName = days[adjustedDay - 1];

  const returnUrl = `https://www.worldofdypians.com/${dayName}`;
  const cancelUrl = `https://www.worldofdypians.com/${dayName}`;

  async function createOrder({ walletAddress, bundleType }) {
    try {
      setStatus("creating");

      const res = await fetch(
        "https://api.worldofdypians.com/api/binance/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletAddress: walletAddress,
            orderAmount: BUNDLE_PRICES[bundleType],
            goodsName: bundleType,
            description: bundleType,
            returnUrl: returnUrl,
            cancelUrl: cancelUrl,
          }),
        }
      );

      const order = await res.json();

      if (!order.merchantTradeNo) {
        throw new Error("Order creation failed");
      }

      setMerchantTradeNo(order.merchantTradeNo);
      setStatus("waitingPayment");

      launchBinancePay(order);
      startPolling(order.merchantTradeNo, bundleType);
    } catch (err) {
      console.error("Create order failed:", err);
      setStatus("failed");
    }
  }

  function launchBinancePay(order) {
    // const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // if (isMobile && order.qrcodeLink) {
    //   window.location.href = order.qrcodeLink;
    //   console.log("test");
    //   setQrCode(order.qrcodeLink);
    // } else

    if (order.data.qrContent) {
      // desktop → show QR to scan

      setQrCode(order.data.qrContent);
      setShowQr(true);
    }
  }

  function startPolling(tradeNo, bundleType) {
    if (pollInterval.current) clearInterval(pollInterval.current);

    pollInterval.current = setInterval(async () => {
      try {
        const res = await fetch(
          `https://api.worldofdypians.com/api/binance/order-status/${tradeNo}`
        );
        const data = await res.json();

        if (data.status === "PAID") {
          clearInterval(pollInterval.current);
          await validateBundle(bundleType, tradeNo);
        } else if (["CLOSED", "EXPIRED", "FAIL"].includes(data.status)) {
          clearInterval(pollInterval.current);
          setStatus("failed");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);
  }

  async function validateBundle(bundleType, tradeNo) {
    try {
      setStatus("validating");

      const res = await fetch(
        "https://api.worldofdypians.com/api/binance/validate-bundle",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bundleType, merchantTradeNo: tradeNo }),
        }
      );

      const data = await res.json();

      if (data.success) {
        await activateBundle(bundleType, tradeNo);
      } else {
        setStatus("failed");
      }
    } catch (err) {
      console.error("Validate failed:", err);
      setStatus("failed");
    }
  }

  async function activateBundle(bundleType, tradeNo) {
    try {
      setStatus("activating");

      const res = await fetch(
        "https://api.worldofdypians.com/api/binance/activate-bundle",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bundleType, merchantTradeNo: tradeNo }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setTxHash(data.txHash);
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (err) {
      console.error("Activate failed:", err);
      setStatus("failed");
    }
  }

  function QRComponent() {
    if (!qrCode) return null;
    if (showQr) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 font-bold"
              onClick={() => setShowQr(false)}
            >
              ✖
            </button>
            <p className="mb-4">Scan this QR with Binance app:</p>
            <QRCodeSVG value={qrCode} size={200} />
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, []);

  return { createOrder, merchantTradeNo, QRComponent, statusbinance, txHash };
}

const BUNDLE_PRICES = {
  "Dragon Ruins": 2,
  "Cold Bite": 2.5,
  "Fury Beast": 2.5,
  "Wing Storm": 3,
  "Scorpion King": 3.5,
  "Stone Eye": 3,
  "Puzzle Madness": 4,
  "Golden Pass": 1,
  "Premium Subscription": 1,
};
