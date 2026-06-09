import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Trung Tâm Tiếng Trung Huamei - Chinh Phục Tiếng Trung, Mở Cửa Tương Lai',
  description: 'Hệ thống đào tạo tiếng Trung chuẩn quốc tế Huamei Education. Phương pháp toàn diện, cam kết đầu ra, giúp học viên tự tin giao tiếp và đạt điểm cao HSK.',
  icons: {
    icon: '/assets/images/logo_footer.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={roboto.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
