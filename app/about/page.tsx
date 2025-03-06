import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getCabins } from "@/app/_lib/data-service";
import { ICabin } from "@/app/_types";
import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";

export const metadata: Metadata = {
  title: "About",
};

export const revalidate = 86400;

const About = async () => {
  const cabins: ICabin[] = await getCabins();

  return (
    <div className="grid grid-cols-1 items-center gap-x-24 gap-y-12 text-lg md:grid-cols-5 md:gap-y-32">
      {/* First Section */}
      <div className="md:col-span-3">
        <h1 className="mb-6 text-4xl font-medium text-accent-400 md:mb-10">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="order-1 mt-6 md:order-none md:col-span-2 md:mt-0">
        <Image
          src={about1}
          placeholder="blur"
          quality={80}
          alt="Family sitting around a fire pit in front of cabin"
          className="w-full rounded-lg"
        />
      </div>

      {/* Second Section */}
      <div className="order-3 mt-4 md:order-none md:col-span-2 md:mt-0">
        <Image
          src={about2}
          placeholder="blur"
          quality={80}
          alt="Family that manages The Wild Oasis"
          className="w-full rounded-lg"
        />
      </div>

      <div className="order-2 md:order-none md:col-span-3">
        <h1 className="mb-6 text-4xl font-medium text-accent-400 md:mb-10">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div className="mt-4 hidden justify-center md:order-none md:mt-0 md:flex md:justify-start">
            <Link
              href="/cabins"
              className="inline-block w-full max-w-[280px] bg-accent-500 px-8 py-5 text-center text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600 md:w-auto"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
      <div className="order-5 mt-4 flex justify-center md:order-none md:mt-0 md:hidden">
        <Link
          href="/cabins"
          className="inline-block w-full bg-accent-500 px-8 py-5 text-center text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600 md:w-auto"
        >
          Explore our luxury cabins
        </Link>
      </div>
    </div>
  );
};

export default About;
