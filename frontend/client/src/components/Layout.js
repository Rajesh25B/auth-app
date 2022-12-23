import { HelmetProvider } from "react-helmet-async";
import Navbar from "components/Navbar";

const Layout = ({ title, content, children }) => (
  <>
    <HelmetProvider>
      <title>{title}</title>
      <meta name="description" content={content} />
    </HelmetProvider>
    <Navbar />
    <div className="container mt-5">{children}</div>
  </>
);

export default Layout;
