import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({title}: {title?: string}) {
    const router = useRouter();
    return(
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          {title}
        </button>
    )
}
