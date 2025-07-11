import { ThemeProvider } from "next-themes";
import "./../globals.css";

export const metadata = {
  title: "Elaco App",
  description: "Book your seat on best coworking space in Tunisia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Include meta tags, fonts, etc. */}
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

