import { useState, useRef, useEffect } from "react";

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function useBinancePayPremium() {
  const [statusPrime, setStatus] = useState("idle"); // idle | processing | success | fail
  const [qrCode, setQrCode] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState("");
  const pollInterval = useRef(null);

  // 1. Create order
  async function createPremiumOrder(walletAddress, price) {
    try {
      setStatus("creating");
      setOrderDetails("Prime Subscription");

      const res = await fetch(
        "https://api.worldofdypians.com/api/binance/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletAddress,
            orderAmount: 100,
            goodsName: "Prime Subscription",
            description: "Prime Subscription",
            returnUrl: "https://www.worldofdypians.com/account/prime",
            cancelUrl: "https://www.worldofdypians.com/account/prime",
          }),
        }
      );

      const order = await res.json();

      if (!order.merchantTradeNo) {
        console.error("Order creation failed");
      }

      setCreatedOrder(order.data);

      setStatus("waitingPayment");

      launchBinancePay(order);
      startPolling(order.merchantTradeNo, "Premium Subscription");
    } catch (err) {
      console.error("Create order failed:", err);
      setStatus("failed");
      localStorage.removeItem("binanceOrder");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  // 2. Handle QR vs deep link
  function launchBinancePay(order) {
    if (isMobileDevice()) {
      window.location.href = order.data.qrcodeLink;
    } else {
      setQrCode(order.data.qrcodeLink);
      setShowQr(true);
    }
  }

  // 3. Poll order status
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
          setTimeout(() => setStatus("idle"), 3000);
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

  // 4. Validate bundle
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
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      console.error("Validate failed:", err);
      setStatus("failed");
      localStorage.removeItem("binanceOrder");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  // 5. Activate bundle
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
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      console.error("Activate failed:", err);
      setStatus("failed");
      localStorage.removeItem("binanceOrder");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  //  Popup QR Component
  function QRComponent({ onClose }) {
    if (!qrCode || !showQr) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
            {(statusPrime === "waiting" ||
              statusPrime === "waitingPayment") && (
              <p className="text-yellow-400 text-sm font-medium">
                Please do not close this window until the payment is confirmed
              </p>
            )}
            {statusPrime === "verified" ||
              (statusPrime === "validating" && (
                <p className="text-yellow-400 text-sm font-medium">
                  Payment verified ✅. Now validating bundle…
                </p>
              ))}
            {statusPrime === "activating" && (
              <p className="text-yellow-400 text-sm font-medium">
                Validation completed ✅. Now activating on-chain…
              </p>
            )}
            {statusPrime === "success" && (
              <p className="text-green-400 text-sm font-medium">
                🎉 Success! Your {orderDetails} Bundle is active.
              </p>
            )}
            {statusPrime === "fail" && (
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
                <p className="text-gray-400 text-xs mt-2">Details</p>
                <p className="font-medium">Prime Subscription</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <img src={qrCode} width={150} height={150} alt="QR Code" />
              <p className="text-gray-400 text-xs mt-2">
                Scan to pay with Binance App
              </p>{" "}
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
    statusPrime, // "idle" | "processing" | "success" | "fail"
    txHash, // transaction hash after activation
    QRComponent, // popup with QR code
    createPremiumOrder,
  };
}
