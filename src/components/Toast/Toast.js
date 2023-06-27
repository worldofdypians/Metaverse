import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";

const Toast = ({ title, showToast }) => {
  const windowSize = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showToast === true) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
      toast(title, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [showToast]);

  return (
    <div>
      {showConfetti === true && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </div>
  );
};

export default Toast;
