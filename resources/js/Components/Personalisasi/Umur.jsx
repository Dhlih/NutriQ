import Title from "../Title"; // Pastikan path benar

export default function Umur({ setData, data }) {
    return (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">

            <Title
                text="Berapa umur Anda saat ini?"
                className="text-3xl md:text-4xl font-bold text-center text-[#2C3A2C] mb-4"
            />

            <div className="relative w-full max-w-xs mt-8">
                <input
                    type="number"
                    className="w-full bg-white border-2 border-[#D5E1C3] focus:border-[#7A9E7E] focus:ring-4 focus:ring-[#7A9E7E]/10 rounded-2xl py-4 px-6 text-center text-2xl font-bold text-[#2C3A2C] placeholder:text-[#D5E1C3] outline-none transition-all shadow-sm"
                    placeholder="0"
                    onChange={(e) => setData("umur", e.target.value)}
                    value={data.umur}
                    autoFocus
                    min="1"
                    max="120"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#5C6F5C] font-medium pointer-events-none">
                    Tahun
                </span>
            </div>
        </div>
    );
}
