import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col">
      <Header {...{t}}  />
      <main className="pt-16 flex-1">{children}</main>
      <Footer {...{t}} />
    </div>
  );
};
