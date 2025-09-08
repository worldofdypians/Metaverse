import { useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function useBinancePayPremium() {
  const [statusPrime, setStatus] = useState("idle"); // idle | processing | success | fail
  const [qrCode, setQrCode] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [txHash, setTxHash] = useState(null);

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
  function QRComponent() {
    if (!qrCode || !showQr) return null;
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

  return {
    statusPrime, // "idle" | "processing" | "success" | "fail"
    txHash, // transaction hash after activation
    launchPremiumSubscription,
    QRComponent, // popup with QR code
  };
}
