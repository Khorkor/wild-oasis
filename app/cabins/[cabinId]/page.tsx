import { Suspense } from "react";

import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import type { ICabin } from "@/app/_types/Cabin";

type Params = Promise<{ cabinId: string }>;

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

export const generateStaticParams = async (): Promise<
  { cabinId: string }[]
> => {
  const cabins: ICabin[] = await getCabins();
  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
};

const CabinPage = async ({ params }: { params: Params }) => {
  const cabin: ICabin | null = await getCabin(Number((await params).cabinId));

  return (
    <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      <Cabin cabin={cabin!} />
      <div>
        <h2 className="mb-6 text-center text-3xl font-semibold text-accent-400 sm:mb-8 sm:text-4xl lg:mb-10 lg:text-5xl">
          Reserve {cabin?.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin!} />
        </Suspense>
      </div>
    </div>
  );
};

export default CabinPage;
