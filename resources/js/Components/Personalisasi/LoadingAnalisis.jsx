import React, { useState, useEffect } from "react";
import { Brain, Sparkles, Loader2 } from "lucide-react";
import { Head } from "@inertiajs/react";

export default function LoadingAnalisis() {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);

    const tips = [
        "Minum air putih 2 liter sehari membantu metabolisme.",
        "Protein membantu memperbaiki sel tubuh yang rusak.",
        "Kurangi gula tambahan untuk energi yang lebih stabil.",
        "Serat membantu pencernaan dan membuat kenyang lebih lama.",
        "Tidur yang cukup sama pentingnya dengan nutrisi.",
    ];

    // Simulasi Progress Bar & Ganti Tips
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) return 100;
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        const tipTimer = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(tipTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#F7F9F0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <Head title="Menganalisis..." />

            {/* Background Accents */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#E9EFDB] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#7A9E7E] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
                {/* Icon Animation */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[#7A9E7E] rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <div className="bg-white p-6 rounded-full shadow-lg border border-[#D5E1C3] relative">
                        <Brain
                            size={48}
                            className="text-[#4A624E] animate-bounce"
                        />
                        <Sparkles
                            size={24}
                            className="text-yellow-500 absolute -top-2 -right-2 animate-spin-slow"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-[#2C3A2C] mb-2">
                    AI Sedang Bekerja...
                </h2>
                <p className="text-[#5C6F5C] mb-8">
                    Mengidentifikasi makanan dan menghitung nutrisi.
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-[#D5E1C3] h-3 rounded-full overflow-hidden mb-8 relative">
                    <div
                        className="bg-[#4A624E] h-full transition-all duration-500 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                {/* Card Tips */}
                <div className="bg-white border border-[#D5E1C3] p-5 rounded-2xl shadow-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-center gap-2 mb-2 text-[#4A624E] font-semibold text-sm uppercase tracking-wide">
                        <Loader2 size={16} className="animate-spin" />
                        Tips Kesehatan
                    </div>
                    <p className="text-[#2C3A2C] font-medium transition-all duration-500 min-h-[3rem] flex items-center justify-center">
                        "{tips[tipIndex]}"
                    </p>
                </div>
            </div>
        </div>
    );
}
