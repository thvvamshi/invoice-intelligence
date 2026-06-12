import Header from "../components/layout/Header";

import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <>
          <Header />

          <Navbar />

          {children}
        </>
      </main>
    </div>
  );
}
