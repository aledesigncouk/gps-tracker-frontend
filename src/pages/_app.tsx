import ContextRangeDates from "@store/ContextRangeDates";
// import "@styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContextRangeDates>
      <Component {...pageProps} />
    </ContextRangeDates>
  );
}

export default MyApp;
