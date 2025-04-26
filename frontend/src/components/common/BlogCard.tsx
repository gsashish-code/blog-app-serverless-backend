import { BlogCardProps } from "../../common/contants";



export function BlogCard({
    title,
    description,
    author,
    date,
    handleClick
}: BlogCardProps) {


    return (
        <div onClick={handleClick} className="flex select-none border-b-2 border-neutral-100 flex-col gap-2 p-4 bg-white  shadow-md w-full hover:bg-neutral-50 cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center capitalize text-white font-bold">
                    {author.charAt(0)}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                    <span className="font-medium capitalize">{author}</span>·
                    <span>{date}</span>
                </div>
            </div>
            <h2 className="text-lg text-neutral-700 font-bold mt-2 ">{title}</h2>
            <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        </div >
    );
}
