// components/main_layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content">
        <Outlet /> {/* This renders the child routes */}
      </main>
      <Footer />
    </div>
  );
}
