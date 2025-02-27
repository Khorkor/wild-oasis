import Cabin from "@/app/_components/Cabin";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import type { ICabin } from "@/app/_types/Cabin";

type Params = Promise<{ cabinId: string }>; // Updated type for Params

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<{ title: string }> => {
  const { cabinId } = await params;
  const cabinIdNumber = Number(cabinId);
  const cabin: ICabin | null = await getCabin(cabinIdNumber);
  return { title: `Cabin ${cabin?.name || "Not Found"}` };
};

export const generateStaticParams = async () => {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
};

const CabinPage = async ({ params }: { params: Params }) => {
  const { cabinId } = await params;
  const cabinIdNumber = Number(cabinId);
  const cabin: ICabin | null = await getCabin(cabinIdNumber);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin!} />
      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
};

export default CabinPage;
