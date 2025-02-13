import ContextStore from "src/store/ContextStore";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ContextStore>
      <Component {...pageProps} />
    </ContextStore>
  );
}

export default MyApp;
