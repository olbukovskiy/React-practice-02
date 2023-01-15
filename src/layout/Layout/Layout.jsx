import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{<Outlet />}</main>

      <Footer />

      <ToastContainer />
    </div>
  );
};
