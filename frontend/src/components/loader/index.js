import styles from "./Loader.module.css";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <section className={styles.loaderSection}>
      <span className={styles.loader1}> </span>
    </section>,
    document.getElementById("loadingPortal")
  );
};

export default Loader;
