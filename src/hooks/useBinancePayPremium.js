import { useState } from "react";
import axios from "axios";

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function useBinancePayPremium() {
  const [statusPrime, setStatus] = useState("idle"); // idle | processing | success | fail
  const [qrCode, setQrCode] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);

  async function launchPremiumSubscription(walletAddress, price) {
    try {
      setStatus("processing");
      setTxHash(null);

      // 1. Create order
      const { data: order } = await axios.post(
        "https://api.worldofdypians.com/api/binance/create-order",
        {
          walletAddress: walletAddress,
          orderAmount: price,
          goodsName: "Premium Subscription",
          description: "Premium Subscription",
          returnUrl: "https://www.worldofdypians.com/account/prime",
          cancelUrl: "https://www.worldofdypians.com/account/prime",
        }
      );
      setCreatedOrder(order.data);
      const merchantTradeNo = order.merchantTradeNo;

      // 2. Handle QR vs deep link
      if (isMobileDevice()) {
        window.location.href = order.data.qrcodeLink;
      } else {
        setQrCode(order.data.qrContent);
        setShowQr(true);
      }

      // 3. Poll for PAID
      let paid = false;
      while (!paid) {
        const { data: statusRes } = await axios.get(
          `https://api.worldofdypians.com/api/binance/order-status/${merchantTradeNo}`
        );
        if (statusRes.status === "PAID") {
          paid = true;
        } else {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }

      // 4. Validate
      await axios.post(
        "https://api.worldofdypians.com/api/binance/validate-bundle",
        {
          bundleType: "Premium Subscription",
          merchantTradeNo,
        }
      );

      // 5. Activate
      const { data: activate } = await axios.post(
        "https://api.worldofdypians.com/api/binance/activate-bundle",
        {
          bundleType: "Premium Subscription",
          merchantTradeNo,
        }
      );

      setTxHash(activate.txHash);
      setStatus("success");
      setShowQr(false);
    } catch (err) {
      console.error(err);
      setStatus("fail");
      setShowQr(false);
    }
  }

  //  Popup QR Component
  function QRComponent({ onClose }) {
    if (!qrCode) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white rounded-xl shadow-xl w-[450px] max-w-[95%] p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
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
                onClick={() =>
                  window.open(
                    `https://pay.binance.com/en/checkout/confirm?prepayOrderId=${createdOrder.prepayId}`,
                    "_blank"
                  )
                }
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

  return {
    statusPrime, // "idle" | "processing" | "success" | "fail"
    txHash, // transaction hash after activation
    launchPremiumSubscription,
    QRComponent, // popup with QR code
  };
}
