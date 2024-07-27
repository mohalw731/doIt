import Welcome from "../layout/Welcome";
import ChatBox from "./Chatbox";
import Form from "./Form";

export default function BrainstormLayout() {
  return (
    <main className="z-50 w-full h-[calc(100dvh-120px)] my-5">
      <section className="max-w-4xl h-full mx-auto relative py-5 flex flex-col">
        <div className="md:py-10 py-5">
          <Welcome />
        </div>
        <ChatBox />
        <Form />
      </section>
    </main>
  );
}
