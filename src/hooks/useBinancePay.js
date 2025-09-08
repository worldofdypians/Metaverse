import { useState, useEffect, useRef } from "react";

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function useBinancePay() {
  const [merchantTradeNo, setMerchantTradeNo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [statusbinance, setStatus] = useState("idle");
  const [txHash, setTxHash] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState("");

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
      setOrderDetails(bundleType);
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
      setCreatedOrder(order.data);

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

    if (isMobileDevice()) {
      window.location.href = order.data.qrcodeLink;
    } else {
      setQrCode(order.data.qrcodeLink);
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
    if (!qrCode || !showQr) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white rounded-xl shadow-xl w-[450px] max-w-[95%] p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setShowQr(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-4">
            <p className="text-yellow-400 text-sm font-medium">
              Please do not close this window until the payment is confirmed
            </p>
          </div>

          {/* Payment Info */}
          <div className="flex justify-between border-b border-gray-700 pb-4">
            <div>
              <p className="text-gray-400 text-sm">Payment Amount</p>
              <h2 className="text-3xl font-bold">
                {createdOrder.totalFee}{" "}
                <span className="text-lg">{createdOrder.currency}</span>
              </h2>
              <p className="text-gray-400 text-sm">
                ≈ ${createdOrder.totalFee}
              </p>

              <div className="mt-4">
                <p className="text-gray-400 text-xs">Merchant Name</p>
                <p className="font-medium">World of Dypians</p>
                <p className="text-gray-400 text-xs mt-2">Bundle Name</p>
                <p className="font-medium">{orderDetails}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <img src={qrCode} width={150} height={150} alt="QR Code" />
              <p className="text-gray-400 text-xs mt-2">
                Scan to pay with Binance App
              </p>
              <button
                onClick={() => window.open(createdOrder.checkoutUrl, "_blank")}
                className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition"
              >
                Continue on Browser
              </button>
            </div>
          </div>

          <div className="sidebar-separator2 my-2"></div>
          <div className="flex flex-col items-center mt-6">
            <p className="text-gray-500 text-xs mt-2 text-center">
              First-time users must{" "}
              <a
                href="https://accounts.binance.com"
                className="text-yellow-400 underline"
              >
                register a Binance Account
              </a>{" "}
              and complete identity verification
            </p>
          </div>
        </div>
      </div>
    );
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
