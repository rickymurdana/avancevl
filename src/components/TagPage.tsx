import axios from "axios";
import { useEffect, useState } from "react";
import useWindowResize from "../utils/windowResize";

const SkeletonLoading = () => {
    return (
        <div className="animate-pulse flex flex-col w-36 space-y-2">
            <div className="w-full h-20 bg-gray-400 rounded"></div>
            <div className="h-4 bg-gray-400 rounded w-12"></div>
            <div className="h-4 bg-gray-400 rounded w-20"></div>
        </div>
    )
}

export default function TagPage() {
    const [list, setList] = useState<any>([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    function handleResize() {
        setScreenWidth(window.innerWidth);
    }

    useWindowResize(handleResize);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`https://avl-frontend-exam.herokuapp.com/api/tags`);
            for (const item of res.data) {
                setList((prevState: any) => [...prevState, item]);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="md:px-20 md:py-14 p-5 flex flex-col w-full gap-5">
            <label className="text-2xl">Tags</label>
            <div className="md:px-7 p-2 flex flex-row h-screen flex-wrap gap-5 justify-center overflow-y-scroll overscroll-contain">
                {
                    list.length ? list.map((el: any) => (
                        <div className="flex flex-col w-36">
                            <div className="flex items-end p-2 w-full h-20 bg-[#FFFFFF0F]">
                                <div className="flex w-[80%] p-1 text-white border-2 rounded-md text-sm font-medium"><p className="truncate">{el.name}</p></div>
                            </div>
                            <label className="text-sm truncate">{el.name}</label>
                            <span className="text-xs text-white/50">{el.count} results</span>
                        </div>
                    )) :
                    [0,1,2,3,4,5,6,7,8,9,10].map(() => <SkeletonLoading /> )
                }
            </div>
        </div>
    )
}