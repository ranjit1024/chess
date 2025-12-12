export function Button({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
    return <button onClick={onClick} className="px-8 py-4 text-2xl bg-gray-50 hover:bg-gray-300 font-bold rounded">

        {children}
    </button>
}