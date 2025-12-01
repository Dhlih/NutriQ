export default function SelectBox({ icon: Icon, label, active, onClick }) {
    // Kelas CSS yang dinamis berdasarkan prop 'active'
    // Ganti 'border-quaternary' dan 'ring-quaternary' dengan kelas warna yang Anda definisikan di Tailwind
    const quaternaryBorderClass = "border-quaternary ring-2 ring-quaternary";

    return (
        <div className="flex flex-col items-center">
            <button
                // Panggil fungsi onClick yang diteruskan dari komponen induk
                onClick={onClick}
                className={`
                    bg-white border rounded-xl md:p-[2.5rem] p-[2rem] gap-[1rem] hover:opacity-80 
                    transition duration-200 ease-in-out
                    
                    ${active ? quaternaryBorderClass : "border-gray-200"} 
                    ${active ? "fill-tertiary" : "fill-secondary"}
                `}
            >
                {/* Icon adalah komponen React yang diteruskan sebagai prop */}
                <Icon size={54} />
            </button>

            <span className="block text-center text-2xl font-medium mt-[1rem]">
                {label}
            </span>
        </div>
    );
}
