export function Button({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
    return <button onClick={onClick} className=" text-2xl  w-full  bg-green-500 text-white  hover:shado font-semibold p-2  rounded-md font-sans hover:outline-none hover:ring-2 hover:ring-[#b2f74b]">

        {children}
    </button>
}