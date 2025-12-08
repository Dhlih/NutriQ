import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import {
    Search,
    Wallet,
    Utensils,
    Flame,
    Beef,
    ChefHat,
    Loader2,
    ArrowRight,
} from "lucide-react";
import AppLayout from "@/Components/AppLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// --- MOCK DATA ---
const MOCK_RECOMMENDATIONS = [
    {
        id: 1,
        nama: "Gado-gado Spesial",
        harga: 15000,
        kalori: 350,
        protein: 12,
        deskripsi: "Sayuran segar dengan bumbu kacang rendah gula.",
    },
    {
        id: 2,
        nama: "Pepes Ikan Nila",
        harga: 22000,
        kalori: 280,
        protein: 24,
        deskripsi: "Kukusan ikan rempah tanpa minyak goreng.",
    },
    {
        id: 3,
        nama: "Soto Ayam Bening",
        harga: 18000,
        kalori: 320,
        protein: 18,
        deskripsi: "Kuah bening segar dengan suwiran dada ayam.",
    },
    {
        id: 4,
        nama: "Tumis Brokoli Tahu",
        harga: 12000,
        kalori: 200,
        protein: 10,
        deskripsi: "Menu simpel kaya serat dan protein nabati.",
    },
];

export default function Rekomendasi() {
    const [budget, setBudget] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!budget) return;

        setIsLoading(true);
        setRecommendations(null);

        setTimeout(() => {
            setIsLoading(false);
            setRecommendations(MOCK_RECOMMENDATIONS);
        }, 1500);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <AppLayout>
            <Head title="Rekomendasi Menu" />

            <div className="min-h-screen w-full bg-[#F7F9F0] pb-20">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#2C3A2C] mb-3 tracking-tight">
                            Rekomendasi Menu
                        </h1>
                        <p className="text-[#5C6F5C]">
                            Cari menu sehat dan hemat sesuai budget Anda.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto bg-white p-3 rounded-2xl shadow-lg shadow-[#4A624E]/5 border border-[#D5E1C3] mb-12 relative z-10">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Wallet
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C6F5C]"
                                    size={18}
                                />
                                <Input
                                    type="number"
                                    placeholder="Contoh: 25000"
                                    className="pl-11 py-5 text-base border-transparent bg-[#F9FAEF] focus:bg-white focus:ring-2 focus:ring-[#7A9E7E] rounded-xl w-full text-[#2C3A2C]"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading || !budget}
                                className="py-5 px-6 bg-[#4A624E] hover:bg-[#3B4F3E] text-white rounded-xl font-semibold shadow-md transition-all"
                            >
                                {isLoading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    <Search size={20} />
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Content Area */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-16 text-center opacity-80">
                                <ChefHat
                                    size={48}
                                    className="text-[#4A624E] animate-bounce mb-4"
                                />
                                <p className="text-[#5C6F5C] font-medium">
                                    Sedang memilihkan menu terbaik...
                                </p>
                            </div>
                        )}

                        {!isLoading && !recommendations && (
                            <div className="text-center opacity-40 py-10">
                                <Utensils
                                    size={64}
                                    className="mx-auto mb-3 text-[#D5E1C3]"
                                />
                                <p className="text-[#5C6F5C] text-sm">
                                    Masukkan budget untuk memulai pencarian.
                                </p>
                            </div>
                        )}

                        {/* HASIL REKOMENDASI */}
                        {!isLoading && recommendations && (
                            <div>
                                <div className="flex items-center justify-between mb-6 px-1">
                                    <h2 className="text-xl font-bold text-[#2C3A2C]">
                                        Hasil Pencarian
                                    </h2>
                                    <span className="text-[#5C6F5C] text-sm bg-white px-3 py-1 rounded-full border border-[#D5E1C3] font-medium">
                                        Budget: {formatRupiah(budget)}
                                    </span>
                                </div>

                                {/* Grid 2 Kolom (Card Lebar) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {recommendations.map((item) => (
                                        <div
                                            key={item.id}
                                            // Tambahkan h-full agar card sama tinggi jika deskripsi panjang
                                            className="group bg-white rounded-2xl border border-[#D5E1C3] overflow-hidden hover:shadow-xl hover:shadow-[#4A624E]/10 transition-all duration-300 flex flex-col h-full"
                                        >
                                            {/* FIXED HEIGHT IMAGE: 
                                                h-48 (12rem/192px) w-full relative 
                                            */}
                                            <div className="h-48 w-full relative bg-[#E9EFDB] overflow-hidden shrink-0">
                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-[#4A624E] shadow-sm">
                                                    {formatRupiah(item.harga)}
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 flex-1 flex flex-col justify-between text-left">
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#2C3A2C] mb-2 leading-snug group-hover:text-[#4A624E] transition-colors">
                                                        {item.nama}
                                                    </h3>

                                                    <p className="text-[#5C6F5C] text-sm mb-4 leading-relaxed line-clamp-2">
                                                        {item.deskripsi}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#F2F5E8]">
                                                    {/* Nutrisi */}
                                                    <div className="flex gap-3">
                                                        <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-orange-100">
                                                            <Flame size={14} />
                                                            {item.kalori} Kcal
                                                        </div>
                                                        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                                                            <Beef size={14} />
                                                            {item.protein}g Pro
                                                        </div>
                                                    </div>

                                                 
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
