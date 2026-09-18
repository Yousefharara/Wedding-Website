import { useState } from "react";
import { Toaster } from "sonner";
import "./App.css";
import IntroSequence from "./components/organisms/intro/IntroSequence";
import HomeTemplate from "./components/templates/HomeTemplate";

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <IntroSequence onFinish={() => setEntered(true)} />
      <HomeTemplate entered={entered} />
      <Toaster richColors position="top-center" dir="rtl" toastOptions={{
        style: { fontFamily: "Cairo, sans-serif" },
      }} />
    </>
  );
}

export default App;