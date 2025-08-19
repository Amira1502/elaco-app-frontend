
import { Outfit } from 'next/font/google';
import { SidebarProvider } from '@/app/context/SidebarContext';
import { ThemeProvider } from '@/app/context/ThemeContext';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className={`${outfit.className} dark:bg-gray-900`}>
          {children}
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
