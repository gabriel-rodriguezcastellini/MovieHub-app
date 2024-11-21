import Footer from "../Footer";
import Header from "../Header";
import ScrollToTop from "../../hooks/ScrollToTop";
import ScrollToTopButton from "../ScrollToTopButton";

const Layout = ({
  children,
  user,
}: {
  children:
    | string
    | number
    | React.ReactElement<
        unknown,
        string | React.JSXElementConstructor<unknown>
      >;
  user: { email: string } | null;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <ScrollToTop />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
