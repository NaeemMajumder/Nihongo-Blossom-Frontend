import { Outlet } from "react-router-dom";
import AdminNav from "./components/header/AdminNav";
import Footer from "./components/footer/Footer";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
