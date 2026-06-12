import Header from "../components/layout/Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Header />
        {children}
      </main>
    </div>
  );
}