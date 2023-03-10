import { useEffect, useState } from "react";
import left from "../assets/left.png";
import axios from "axios";
import { PersonType } from "../types/person";
import InfiniteScroll from "react-infinite-scroll-component";
import useWindowResize from "../utils/windowResize";

const Tabs = ({ tabs, activeTab, setActiveTab }: any) => {

  const handleClick = (index: any) => {
    setActiveTab(index);
  };

  return (
    <div className="flex">
      {tabs.map((tab: any, index: any) => (
        <button
          key={index}
          className={`${
            index === activeTab
              ? 'border-b-2 border-white text-white'
              : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } flex-1 whitespace-nowrap text-sm font-medium py-4 px-1 focus:outline-none`}
          onClick={() => handleClick(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const SkeletonLoading = () => {
    return (
        <div className="animate-pulse flex justify-between">
            <div className="flex items-center my-2 space-x-2">
                <div className="rounded-md bg-gray-400 h-10 w-10"></div>
                <div className="space-y-1">
                    <div className="h-4 bg-gray-400 rounded w-12"></div>
                    <div className="h-4 bg-gray-400 rounded w-20"></div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="rounded-full bg-gray-400 h-8 w-20"></div>
            </div>
        </div>
    )
}

const Followers = ({ followers, page, totalPage, fetch }: any) => {
    return (
        <div id="scroll" className="h-screen overflow-y-scroll overscroll-contain">
            <InfiniteScroll
            dataLength={followers.length}
            next={fetch}
            hasMore={totalPage !== page ? true : false}
            loader={
                <button className="flex m-auto p-2 w-2/3 rounded-md text-white font-bold text-xs" disabled>
                    <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    Load more...
                </button>
            }
            endMessage={
                <div className="m-auto">
                    <p className="text-white font-bold text-xs">
                        No more data loaded
                    </p>
                </div>
            }
            scrollableTarget="scroll"
        >   
        {
            followers.length ? followers.map((follower: any, index: any) => (
            <div className="flex justify-between">
                <div key={index} className="flex items-center my-2">
                    <img
                    className="w-10 h-10 rounded-md mr-4"
                    src={`https://randomuser.me/api/portraits/men/40.jpg`}
                    alt={`Avatar of ${follower.name}`}
                    loading="lazy"
                    />
                    <div>
                        <div className="font-medium text-white">{follower.name}</div>
                        <div className="text-white/50">@{follower.username}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    {follower.isFollowing ? <button className="px-3 py-1 bg-white rounded-full text-sm font-medium">Following</button> : <button className="px-3 py-1 border rounded-full text-white text-sm font-medium">Follow</button>}
                </div>
            </div> 
            )) :
            [0,1,2,3,4,5,7,8,9].map(() => <SkeletonLoading />)
        }
        </InfiniteScroll>
        </div>
    );
};

const Following = ({ following }: any) => {
  return (
    <div className="h-screen overflow-y-scroll overscroll-contain">
        {
            following.length ? following.map((user: any, index: any) => (
                <div className="flex justify-between">
                    <div key={index} className="flex items-center my-2">
                        <img
                        className="w-10 h-10 rounded-md mr-4"
                        src={`https://randomuser.me/api/portraits/men/40.jpg`}
                        alt={`Avatar of ${user.name}`}
                        loading="lazy"
                        />
                        <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-white/50">@{user.username}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="px-3 py-1 bg-white rounded-full text-sm font-medium">Following</button>
                    </div>
                </div>
            )) :
            [0,1,2,3,4,5,7,8,9].map(() => <SkeletonLoading />)
        }
    </div>
  );
};

const Search = ({ setPageSize, pageSize, setSearch, screenWidth }: any) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        setSearch(keyword)
    }

    return (
        <div className={`${screenWidth > 1440 ? 'w-2/3' : 'w-full'} h-screen container flex flex-col justify-between md:px-32 md:py-14 p-5`}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <label className="font-medium text-lg">Search</label>
                    <input type="text" placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full px-2 py-2 mt-2 placeholder:text-sm bg-zinc-900 bg-zinc-900 border-2 rounded-md border-white/50 focus:outline-none focus:border-[#FF9B33]"></input>
                </div>
                <div className="flex flex-col gap-5">
                    <label className="font-medium text-lg"># of results of page</label>
                    <label className="font-medium text-lg"><span className="font-bold text-4xl">{pageSize}</span> results</label>
                    <div>
                        <input type="range" min={0} value={pageSize} max={50} onChange={(ev) => setPageSize(ev.target.value) } className="w-full" />
                        <div className="w-full flex flex-row text-white/50">
                            <div className={`${Number(pageSize) === 0 && 'text-white'} w-1/5`}>0</div>
                            <div className={`${Number(pageSize) === 10 && 'text-white'} w-1/5`}>10</div>
                            <div className={`${Number(pageSize) === 20 && 'text-white'} w-1/5`}>20</div>
                            <div className={`${Number(pageSize) === 30 && 'text-white'} w-1/5`}>30</div>
                            <div className={`${Number(pageSize) === 40 && 'text-white'} w-1/5`}>40</div>
                            <div className={`${Number(pageSize) === 50 && 'text-white'} w-5/5`}>50</div>
                        </div>
                    </div>
                </div>
                <div className="p-px bg-gray-700"></div>
            </div>
            <button className="p-2 md:w-1/3 sm:w-full rounded-md bg-white font-bold text-xs mb-44 md:mb-10" onClick={handleSearch}>SEARCH</button>
        </div>
    )
}

const Results = ({ search, pageSize, setSearch, screenWidth }: any) => {
    const [list, setList] = useState<PersonType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setTimeout(async () => {
            const res: any = await axios.get(`https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${pageSize}&keyword=${search}`);
            setTotalPages(res.data.totalPages);
            for (const item of res.data.data) {
              setList((prevState: PersonType[]) => [...prevState, item]);
            }
            setPage(page+1);
        }, 1000)
    }

    const SkeletonLoadingResult = () => {
        return (
            <div className="animate-pulse flex flex-col w-[219px] space-y-1">
                <div className="w-full h-[146px] bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-12"></div>
                <div className="h-4 bg-gray-400 rounded w-20"></div>
            </div>
        )
    }

    return (
        <div className={`${screenWidth > 1440 ? 'w-2/3' : 'w-full'} container p-5 md:px-20 md:py-14 flex flex-col gap-5`}>
            <div className="flex flex-row gap-5">
                <div className="flex items-center cursor-pointer" onClick={() => setSearch('')}>
                    <img src={left} width={10} height={16} alt="left" />
                </div>
                <label className="text-2xl">{screenWidth > 640 ? 'Results' : 'Home Page'}</label>
            </div>
            <div id="scroll" className="px-7 h-screen overflow-y-scroll overscroll-contain">
                {screenWidth <= 640 && <div className="pb-5"><label className="text-2xl">Results</label></div>}
                <InfiniteScroll
                    dataLength={list.length}
                    next={fetchData}
                    hasMore={totalPages !== page ? true : false}
                    loader={
                        <div className="m-auto">
                            <button className="flex p-2 w-/3 rounded-md text-white font-bold text-xs" disabled>
                                <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                Load more...
                            </button>
                        </div>
                    }
                    endMessage={
                        <div className="m-auto">
                            <p className="text-white font-bold text-xs">
                                No more data loaded
                            </p>
                        </div>
                    }
                    scrollableTarget="scroll"
                    className="flex flex-row flex-wrap gap-5 justify-center"
                >
                    {
                        list.length ? 
                        list.map((el: PersonType) => (
                            <div className="flex flex-col space-y-1">
                                <img src={`https://randomuser.me/api/portraits/men/40.jpg`} className="w-[219px] h-[146px]" alt={el.avater} loading="lazy" />
                                <label className="text-sm">{el.name}</label>
                                <span className="text-xs text-white/50">by {el.username}</span>
                            </div>
                        )) :
                        [0,1,2,3,4,5,6,7,8,9].map(() => <SkeletonLoadingResult />)
                    }
                </InfiniteScroll>
            </div>	
            {/* <button className="p-2 w-/3 rounded-md bg-white font-bold text-xs" onClick={() => setPage((val: any) => val + 1)}>MORE</button> */}
        </div>
    )
}

export default function HomePage() {
    const [activeTab, setActiveTab] = useState(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [followers, setFollowers] = useState<PersonType[]>([]);
    const [following, setFollowing] = useState<PersonType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    function handleResize() {
        setScreenWidth(window.innerWidth);
    }

    useWindowResize(handleResize);

    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
    }, []);
    
    async function fetchFollowers() {
        setTimeout(async () => {
            const res = await axios.get(`https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=10`);
            setTotalPage(res.data.totalPages);
            for (const item of res.data.data) {
              setFollowers((prevState: PersonType[]) => [...prevState, item]);
            }
            setPage(page+1);
        }, 1000)
    }

    async function fetchFollowing() {
        setTimeout(async () => {
            const res = await axios.get(`https://avl-frontend-exam.herokuapp.com/api/users/friends?page=1&pageSize=10`);
            for (const item of res.data.data) {
                setFollowing((prevState: PersonType[]) => [...prevState, item]);
            }
        }, 1000)
    }

    const tabs = [
        { label: `Followers (${followers.length})`, content: <Followers followers={followers} page={page} totalPage={totalPage} fetch={fetchFollowers} /> },
        { label: `Following (${following.length})`, content: <Following following={following} /> },
    ];

    return (
      <>
        {search ? <Results search={search} setSearch={setSearch} pageSize={pageSize} screenWidth={screenWidth} /> : <Search setPageSize={setPageSize} screenWidth={screenWidth} pageSize={pageSize} setSearch={setSearch} />}
        {screenWidth >= 1440 && <div className="w-1/3 container mx-auto my-4">
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {tabs[activeTab].content}
        </div>}
      </>
    )
}