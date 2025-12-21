import Link from "next/link";

interface Link {
    title: string,
    link: string,
}

export function ButtonLink({title, link}: Link) {
    return(
        <Link href="#" className=" bg-[#F05C7D] text-white rounded-full flex items-center justify-center w-25 mt-4">
            <p className="px-4 py-2 text-sm font-medium ">
                {title}
            </p>
        </Link>
    )
}