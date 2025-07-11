import { ThemeProvider } from "next-themes";
import "./../globals.css";

import Navbar from "./../components/navbar";
import Footer from "../components/footer";
export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Navbar />
          {/* Match this to your navbar’s height: 
              if py-3 + line-height ≈ 3rem, you might need pt-16 or pt-20 */}
          <main className="pt-0">
            {children}
          </main>
          <Footer/>
        </body>
      </html>
    );
  }