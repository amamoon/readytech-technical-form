import { Suspense } from "react";
import Form from "./components/form";

export default function Home() {
  return (
    <div className="bg-black">
      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
}
