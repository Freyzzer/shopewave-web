import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";


export default function TextLink({tittle}: {tittle: string}) {
  return (
    <Link href="#" className="group relative text-[#494049] w-auto flex items-center justify-center mt-4 ">
      <div className="absolute bottom-0 left-0 h-0.5 bg-[#494049] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
        <p className="px-4 py-2 text-sm font-medium ">
            {tittle}
        </p>
        <ArrowRightIcon className="w-6 h-6 group-hover:animate-bounce"/>    
    </Link>
  )
}
