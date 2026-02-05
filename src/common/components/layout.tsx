import { Header } from "./header/header";
import { Footer } from "./footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};
