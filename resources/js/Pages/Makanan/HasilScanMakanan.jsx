import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ChevronLeft,
    ScanLine,
    Calendar,
    Package,
    Flame,
    Beef,
    Wheat,
    Droplet,
    Sparkles,
    Leaf,
    Candy,
    Utensils, // Added icon for food name
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Components/AppLayout";

export default function HasilScan({ makanan }) {
    // --- Helper Format Tanggal ---
    const formattedDate = makanan.tanggal_formatted ?? makanan.tanggal;

    return (
        <AppLayout>
            <Head title="Hasil Scan" />

            <div className="w-full min-h-screen bg-[#F7F9F0] pb-20">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* --- HEADER NAVIGATION --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[#2C3A2C]">
                                    Hasil Scan Makanan
                                </h1>
                                <p className="text-[#5C6F5C] text-sm">
                                    Detail nutrisi dari makanan yang Anda scan.
                                </p>
                            </div>
                        </div>

                        <Link
                            href={route("scan.index")}
                            className="w-full md:w-auto"
                        >
                            <Button className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white px-6 py-5 rounded-xl shadow-lg shadow-[#4A624E]/20 w-full md:w-auto flex items-center gap-2">
                                <ScanLine size={18} />
                                Scan Lagi
                            </Button>
                        </Link>
                    </div>

                    {/* --- INFO UTAMA (FOTO & METADATA) --- */}
                    <div className="bg-white rounded-2xl border border-[#D5E1C3] p-6 mb-10 shadow-sm flex flex-col md:flex-row gap-8">
                        {/* Foto */}
                        <div className="w-full md:w-1/3">
                            <div
                                className="relative w-full overflow-hidden rounded-xl bg-[#E9EFDB] border border-[#D5E1C3]
                    aspect-[4/3] sm:aspect-video md:aspect-square"
                            >
                                <img
                                    src={makanan.foto}
                                    alt="Foto makanan"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex-1 flex flex-col justify-center gap-6">
                            {/* --- BAGIAN NAMA MAKANAN (DITAMBAHKAN) --- */}
                            <div className="pb-4 border-b border-[#F2F5E8]">
                                <h2 className="text-3xl font-bold text-[#2C3A2C] mb-2 flex items-center gap-2">
                                    {makanan.nama || "Nama Makanan"}{" "}
                                    {/* Menampilkan nama makanan */}
                                </h2>
                                <p className="text-[#5C6F5C]">
                                    Total Kalori:{" "}
                                    <span className="font-bold text-[#4A624E]">
                                        {makanan.total_kalori} Kkal
                                    </span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-[#F9FAEF] border border-[#D5E1C3]">
                                    <div className="flex items-center gap-2 text-[#5C6F5C] mb-1">
                                        <Calendar size={16} />
                                        <span className="text-xs font-medium uppercase tracking-wide">
                                            Waktu Scan
                                        </span>
                                    </div>
                                    <p className="font-bold text-[#2C3A2C] text-lg">
                                        {formattedDate}
                                    </p>
                                    <p className="text-sm text-[#5C6F5C]">
                                        {makanan.jam}
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#F9FAEF] border border-[#D5E1C3]">
                                    <div className="flex items-center gap-2 text-[#5C6F5C] mb-1">
                                        <Package size={16} />
                                        <span className="text-xs font-medium uppercase tracking-wide">
                                            Item Terdeteksi
                                        </span>
                                    </div>
                                    <p className="font-bold text-[#2C3A2C] text-lg">
                                        {makanan.detail_makanans.length} Jenis
                                    </p>
                                    <p className="text-sm text-[#5C6F5C]">
                                        Makanan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- TOTAL NUTRISI (GRID CARD) --- */}
                    {/* ... (Code lainnya sama seperti sebelumnya) ... */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-[#E9EFDB] p-2 rounded-lg text-[#4A624E]">
                                <Sparkles size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-[#2C3A2C]">
                                Total Nutrisi
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 ">
                            <NutrisiCard
                                label="Kalori"
                                value={makanan.total_kalori}
                                unit="Kkal"
                                icon={Flame}
                                color="text-orange-500"
                                bg="bg-orange-50"
                                border="border-orange-100"
                            />
                            <NutrisiCard
                                label="Karbo"
                                value={makanan.total_karbohidrat}
                                unit="g"
                                icon={Wheat}
                                color="text-yellow-600"
                                bg="bg-yellow-50"
                                border="border-yellow-100"
                            />
                            <NutrisiCard
                                label="Protein"
                                value={makanan.total_protein}
                                unit="g"
                                icon={Beef}
                                color="text-blue-600"
                                bg="bg-blue-50"
                                border="border-blue-100"
                            />
                            <NutrisiCard
                                label="Lemak"
                                value={makanan.total_lemak}
                                unit="g"
                                icon={Droplet}
                                color="text-red-500"
                                bg="bg-red-50"
                                border="border-red-100"
                            />
                            <NutrisiCard
                                label="Serat"
                                value={makanan.total_serat}
                                unit="g"
                                icon={Leaf}
                                color="text-green-600"
                                bg="bg-green-50"
                                border="border-green-100"
                            />
                            <NutrisiCard
                                label="Gula"
                                value={makanan.total_gula_tambahan}
                                unit="g"
                                icon={Candy}
                                color="text-pink-500"
                                bg="bg-pink-50"
                                border="border-pink-100"
                            />
                            <NutrisiCard
                                label="Natrium"
                                value={makanan.total_natrium}
                                unit="mg"
                                icon={Sparkles}
                                color="text-purple-500"
                                bg="bg-purple-50"
                                border="border-purple-100"
                            />
                        </div>
                    </div>

                    {/* --- RINCIAN PER ITEM --- */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-[#E9EFDB] p-2 rounded-lg text-[#4A624E]">
                                <Package size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-[#2C3A2C]">
                                Rincian Per Item
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {makanan.detail_makanans.map((d, i) => {
                                const beratOtomatis =
                                    parseFloat(d.karbohidrat || 0) +
                                    parseFloat(d.protein || 0) +
                                    parseFloat(d.lemak || 0);
                                const beratFinal =
                                    d.berat ?? beratOtomatis.toFixed(1);

                                return (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl border border-[#D5E1C3] p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#F2F5E8]">
                                            <h3 className="text-lg font-bold text-[#2C3A2C] capitalize">
                                                {d.nama}
                                            </h3>
                                            <span className="bg-[#E9EFDB] text-[#4A624E] px-3 py-1 rounded-full text-sm font-semibold border border-[#D5E1C3]">
                                                {beratFinal}g
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                            <MiniItem
                                                label="Kalori"
                                                value={d.kalori}
                                                unit="Kkal"
                                            />
                                            <MiniItem
                                                label="Protein"
                                                value={d.protein}
                                                unit="g"
                                            />
                                            <MiniItem
                                                label="Lemak"
                                                value={d.lemak}
                                                unit="g"
                                            />
                                            <MiniItem
                                                label="Karbo"
                                                value={d.karbohidrat}
                                                unit="g"
                                            />
                                            <MiniItem
                                                label="Serat"
                                                value={d.serat}
                                                unit="g"
                                            />
                                            <MiniItem
                                                label="Natrium"
                                                value={d.natrium}
                                                unit="mg"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

/* ==== COMPONENT: KARTU TOTAL NUTRISI (COLORFUL) ==== */
function NutrisiCard({ label, value, unit, icon: Icon, color, bg, border }) {
    return (
        <div
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${bg} ${border} transition-transform hover:-translate-y-1`}
        >
            <div className={`mb-2 ${color}`}>
                <Icon size={20} />
            </div>
            <span className="text-xs text-gray-600 font-medium uppercase mb-1">
                {label}
            </span>
            <p className={`text-xl font-bold ${color}`}>
                {value}{" "}
                <span className="text-xs text-gray-500 font-normal">
                    {unit}
                </span>
            </p>
        </div>
    );
}

/* ==== COMPONENT: ITEM DETAIL (MINIMALIS) ==== */
function MiniItem({ label, value, unit }) {
    return (
        <div className="flex flex-col p-3 rounded-lg bg-[#F9FAEF] border border-[#E9EFDB]">
            <span className="text-xs text-[#5C6F5C] uppercase tracking-wide mb-1">
                {label}
            </span>
            <p className="font-bold text-[#2C3A2C]">
                {value ?? 0}{" "}
                <span className="text-xs font-normal text-[#8D9F8D]">
                    {unit}
                </span>
            </p>
        </div>
    );
}
