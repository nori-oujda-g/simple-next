import { type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
// import { MyNav } from "./components/MyNav";

import 'bootstrap/dist/css/bootstrap.min.css';
// import { MyNav } from "./components/MyNav";
// import 'app/styles/layout.module.css';
import "react-datepicker/dist/react-datepicker.css";

import MyNav from "./components/MyNav";
interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section style={{ background: '#eee' }}>
            <MyNav />

            {/* <header >
              <Image
                src="/logo.svg"
                className={styles.logo}
                alt="logo"
                width={100}
                height={100}
              />
            </header> */}
            {children}
            {/* <main className={styles.main}></main> */}
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
