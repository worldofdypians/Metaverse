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

  const returnUrl = `https://www.worldofdypians.com/account/challenges/${dayName}`;
  const cancelUrl = `https://www.worldofdypians.com/account/challenges/${dayName}`;

  const returnUrlGP = `https://www.worldofdypians.com/account#golden-pass`;
  const cancelUrlGP = `https://www.worldofdypians.com/account#golden-pass`;

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
            returnUrl: bundleType === "Golden Pass" ? returnUrlGP : returnUrl,
            cancelUrl: bundleType === "Golden Pass" ? cancelUrlGP : cancelUrl,
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
      localStorage.removeItem("binanceOrder");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
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
          localStorage.removeItem("binanceOrder");
          setTimeout(() => {
            setStatus("idle");
          }, 3000);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);
  }

  const stopPolling = () => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = null;
    }
  };

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
        localStorage.removeItem("binanceOrder");
        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      }
    } catch (err) {
      console.error("Validate failed:", err);
      setStatus("failed");
      localStorage.removeItem("binanceOrder");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
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

        setTimeout(() => {
          localStorage.removeItem("binanceOrder");
          setShowQr(false);
          setQrCode(null);
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("failed");
        localStorage.removeItem("binanceOrder");
        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      }
    } catch (err) {
      console.error("Activate failed:", err);
      setStatus("failed");
      localStorage.removeItem("binanceOrder");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  }

  function QRComponent() {
    if (!qrCode || !showQr) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
        <div className="bg-gray-900 text-white rounded-xl shadow-xl w-[450px] max-w-[95%] p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => {
              setShowQr(false);
              setStatus("failed");
              localStorage.removeItem("binanceOrder");
              stopPolling();
              setTimeout(() => {
                setStatus("idle");
              }, 3000);
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-4">
            {(statusbinance === "waiting" ||
              statusbinance === "waitingPayment") && (
              <p className="text-yellow-400 text-sm font-medium">
                Please do not close this window until the payment is confirmed
              </p>
            )}
            {statusbinance === "verified" ||
              (statusbinance === "validating" && (
                <p className="text-yellow-400 text-sm font-medium">
                  Payment verified ✅. Now validating bundle…
                </p>
              ))}
            {statusbinance === "activating" && (
              <p className="text-yellow-400 text-sm font-medium">
                Validation completed ✅. Now activating on-chain…
              </p>
            )}
            {statusbinance === "success" && (
              <p className="text-green-400 text-sm font-medium">
                🎉 Success! Your {orderDetails} Bundle is active.
              </p>
            )}
            {statusbinance === "fail" && (
              <p className="text-red-400 text-sm font-medium">
                ❌ Payment failed during on-chain activation.
              </p>
            )}
          </div>

          {/* Payment Info */}
          <div className="flex justify-between border-b border-gray-700 pb-4">
            <div>
              <p className="text-gray-400 text-sm">Payment Amount</p>
              <h2 className="text-3xl font-bold">
                ${createdOrder.totalFee}{" "}
              </h2>
              <div className="mt-4">
                <p className="text-gray-400 text-xs">Merchant Name</p>
                <p className="font-medium">World of Dypians</p>
                <p className="text-gray-400 text-xs mt-2">Bundle Name</p>
                <p className="font-medium">{orderDetails}</p>
              </div>
            </div>

            {/* QR Code */}
            {/* {(statusbinance === "waiting" ||
              statusbinance === "waitingPayment") && ( */}
            <div className="flex flex-col items-center">
              <img src={qrCode} width={150} height={150} alt="QR Code" />
              <p className="text-gray-400 text-xs mt-2">
                Scan to pay with Binance App
              </p>
              <button
                onClick={() => {
                  localStorage.setItem(
                    "binanceOrder",
                    JSON.stringify(createdOrder)
                  );
                  localStorage.setItem("binanceOrderDetails", orderDetails);
                  window.open(
                    `https://pay.binance.com/en/checkout/confirm?prepayOrderId=${createdOrder.prepayId}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition"
              >
                Continue on Browser
              </button>
            </div>
            {/* )} */}
          </div>

          <div className="sidebar-separator2 my-2"></div>
          <div className="flex flex-col items-center mt-6">
            <p className="text-gray-300 text-xs mt-2 text-center">
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
  useEffect(() => {
    const storedOrder = localStorage.getItem("binanceOrder");
    const storedDetails = localStorage.getItem("binanceOrderDetails");

    if (storedOrder && storedDetails && !showQr) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        const parsedDetails = JSON.parse(storedDetails);

        setCreatedOrder(parsedOrder);
        setOrderDetails(parsedDetails);
        setMerchantTradeNo(parsedOrder.merchantTradeNo);

        setQrCode(parsedOrder.qrcodeLink);
        setShowQr(true);

        launchBinancePay(parsedOrder);
        startPolling(parsedOrder.merchantTradeNo, parsedDetails);

        // optional: cleanup polling when component unmounts
        return () => {
          stopPolling?.();
        };
      } catch (err) {
        console.error("Failed to parse Binance order from storage", err);
        localStorage.removeItem("binanceOrder");
        localStorage.removeItem("binanceOrderDetails");
      }
    }
  }, [showQr, launchBinancePay, startPolling, stopPolling]);

  return {
    createOrder,
    merchantTradeNo,
    QRComponent,
    statusbinance,
    txHash,
    qrCode,
  };
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
