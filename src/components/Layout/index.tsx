import Footer from "../Footer";
import Header from "../Header";

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
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
