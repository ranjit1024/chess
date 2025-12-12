export function Button({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
    return <button onClick={onClick} className="p-2 text-xl w-full  bg-green-50 hover:bg-green-100 font-medium rounded-md font-sans">

        {children}
    </button>
}