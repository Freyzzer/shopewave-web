import Link from "next/link";



export function ButtonLink({title}: {title: string}) {
    return(
        <Link href="#" className=" bg-[#F05C7D] text-white rounded-full flex items-center justify-center w-25 mt-4">
            <p className="px-4 py-2 text-sm font-medium ">
                {title}
            </p>
        </Link>
    )
}