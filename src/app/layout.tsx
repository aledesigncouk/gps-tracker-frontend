import { RangeDatesContextStore } from "@store/ContextRangeDates";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = { title: "Nautilus Tracker" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RangeDatesContextStore>{children}</RangeDatesContextStore>
      </body>
    </html>
  );
}
