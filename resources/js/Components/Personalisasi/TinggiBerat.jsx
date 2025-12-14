import Title from "../Title";

export default function TinggiBerat({ setData, data }) {
    return (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Icon Visual */}

            <Title
                text="Tinggi & Berat Badan"
                className="text-3xl md:text-4xl font-bold text-center text-[#2C3A2C] mb-4"
            />

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg mt-8">
                {/* Input Tinggi */}
                <div className="md:w-full w-[95%] mx-auto">
                    <label className="block text-sm font-semibold text-[#2C3A2C] mb-2 ml-1">
                        Tinggi Badan
                    </label>
                    <div className="relative ">
                        <input
                            type="number"
                            className="w-full  bg-white border-2 border-[#D5E1C3] focus:border-[#7A9E7E] focus:ring-4 focus:ring-[#7A9E7E]/10 rounded-2xl py-4 pl-6 pr-12 text-xl font-bold text-[#2C3A2C] placeholder:text-[#D5E1C3] outline-none transition-all shadow-sm"
                            placeholder="0"
                            onChange={(e) => setData("tinggi", e.target.value)}
                            value={data.tinggi}
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#5C6F5C] font-medium pointer-events-none">
                            cm
                        </span>
                    </div>
                </div>

                {/* Input Berat */}
                <div className="md:w-full w-[95%] mx-auto">
                    <label className="block text-sm font-semibold text-[#2C3A2C] mb-2 ml-1">
                        Berat Badan
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full bg-white border-2 border-[#D5E1C3] focus:border-[#7A9E7E] focus:ring-4 focus:ring-[#7A9E7E]/10 rounded-2xl py-4 pl-6 pr-12 text-xl font-bold text-[#2C3A2C] placeholder:text-[#D5E1C3] outline-none transition-all shadow-sm"
                            placeholder="0"
                            onChange={(e) => setData("berat", e.target.value)}
                            value={data.berat}
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#5C6F5C] font-medium pointer-events-none">
                            kg
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
