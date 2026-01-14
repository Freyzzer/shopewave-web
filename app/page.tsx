import {ButtonLink} from "@/components/button-link";

import SectionProduct from "@/components/section-product";
import Image from "next/image";

export default  function Home() {

  return (
    <>
      <header className="w-full h-[300px] md:mb-8 bg-[#93B7BE]" id="background">
        <div className="flex items-center justify-between ">
          <section className=" group text-4xl font-bold text-[#494049]">
            <h2 className="">Grab Up to 50% off on</h2>
            <h2 className="">Select Product</h2>
            <ButtonLink title="Shop Now" />
          </section>
          <Image
            src="/ilustra_shop.svg"
            alt="Hero Banner"
            width={300}
            height={300}
            className="object-contain max-sm:hidden"
          />
        </div>
      </header>
      <main className="w-full">
        <div className="w-full max-lg:px-6 max-md:px-4">
          <SectionProduct />
        </div>
      </main>
    </>
  );
}
