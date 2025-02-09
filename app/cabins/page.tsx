import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabins",
};

const Cabins = async () => {
  return (
    <div>
      <h1>Cabins Page</h1>
      <ul></ul>
    </div>
  );
};

export default Cabins;
