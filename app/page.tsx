import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";

export default function IndexPage() {
  return <>
    <h1>MY NEXT PROJECT V11</h1>
    <Counter />
  </>;
}

export const metadata: Metadata = {
  title: "MY NEXT PROJECT",
};
