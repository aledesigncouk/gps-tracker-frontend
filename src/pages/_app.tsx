import ContextRangeDates from "@store/ContextRangeDates";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ContextRangeDates>
      <Component {...pageProps} />
    </ContextRangeDates>
  );
}

export default MyApp;
