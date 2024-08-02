import BrainstormLayout from "../components/quill/QuillLayout";
import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/quill/Sidebar";

export default function Quill() {
  return (
    <main>
      <Navbar />
      <div className="flex gap-10 ">
      {/* <Sidebar/> */}
      <BrainstormLayout />
      </div>
    </main>
  );
}
