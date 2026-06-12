import Header from "../components/layout/Header";
import FileUploader from "../components/uploader/FileUploader";

export default function MainLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Header />
        <FileUploader />
        {children}
      </main>
    </div>
  );
}