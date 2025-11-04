// hooks/useRouteLoader.js
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function useRouteLoader() {
  const navigate = useNavigate();

  const loadAndNavigate = async (importFn, to) => {
    NProgress.start();
    try {
      await importFn();
      navigate(to);
    } finally {
      NProgress.done();
    }
  };

  return loadAndNavigate;
}
