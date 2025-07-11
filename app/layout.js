import { ThemeProvider } from "next-themes";
import "./globals.css";
import ScrollToTop from './components/ScrollToTop';
import { UserProvider } from './context/UserContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import LoadingProgress from "./components/progress"; 
import Chat from "./components/chat"
config.autoAddCss = false;

export const metadata = {
  title: "Elaco App",
  description: "Book your seat in best coworking space in Tunisia",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en" suppressHydrationWarning>
        <head>{/* meta tags */}</head>
        <body>
          <LoadingProgress />
          <div id="modal"></div>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
          <ScrollToTop />
          {/* <Footer /> */}
          <Chat/>
        </body>
      </html>
    </UserProvider>
  );
}
