import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Ruler,
    Weight,
    Loader2,
    Save,
    X,
    MarsStroke,
    User,
    Cake,
    Bike,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card } from "@/Components/ui/card";
import AppLayout from "@/Components/AppLayout";
// Hapus import useNotify

// Import komponen kustom (Alert dan LoadingAnalisis)
import Alert from "@/Components/Alert"; // Asumsi path Alert
import LoadingAnalisis from "@/Components/Personalisasi/LoadingAnalisis";

export default function Profil() {
    const { user, flash } = usePage().props;

    // 1. STATE BARU: Notifikasi Alert & Loading
    const [alert, setAlert] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Hapus: const { notifySuccess, notifyError } = useNotify();

    const { data, setData, patch, processing, errors } = useForm({
        name: user?.name || "",
        tinggi: user?.tinggi || "",
        berat: user?.berat || "",
        jenis_kelamin: user?.jenis_kelamin || "",
        umur: user?.umur || "",
        aktivitas: user?.aktivitas || "",
    });

    // Fungsi lokal untuk menampilkan Alert (menggantikan notifySuccess/Error)
    const displayAlert = (variant, title, message) => {
        setAlert(null); // Clear previous alert
        setAlert({ variant, title, message });
    };

    // PENGATURAN TIMEOUT ALERT (1500ms)
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 1500); // Durasi 1500ms
            return () => clearTimeout(timer);
        }
    }, [alert]);

    // Cek apakah data sensitif yang memicu perhitungan nutrisi berubah/diisi
    const shouldRecalculate = () => {
        const hasCriticalData =
            data.umur &&
            data.tinggi &&
            data.berat &&
            data.jenis_kelamin &&
            data.aktivitas;

        const dataChanged =
            data.umur != user?.umur ||
            data.tinggi != user?.tinggi ||
            data.berat != user?.berat ||
            data.jenis_kelamin != user?.jenis_kelamin ||
            data.aktivitas != user?.aktivitas;

        return hasCriticalData && dataChanged;
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const needsAnalysis = shouldRecalculate();

        patch("/profile", {
            preserveScroll: true,

            onStart: () => {
                // Tampilkan LoadingAnalisis JIKA perhitungan diperlukan
                if (needsAnalysis) {
                    setIsAnalyzing(true);
                }
            },

            onSuccess: () => {
                // Notifikasi sukses (menggunakan Alert kustom)
                displayAlert(
                    "success",
                    "Berhasil",
                    "Profil berhasil diperbarui!"
                );
            },

            onError: (errors) => {
                console.error(errors);

                // Cek error perhitungan Gemini (dari backend controller)
                if (errors.error) {
                    displayAlert(
                        "destructive",
                        "Perhitungan Gagal",
                        errors.error
                    );
                }
                // Cek error validasi Inertia
                else if (Object.keys(errors).length > 0) {
                    displayAlert(
                        "warning",
                        "Input Tidak Valid",
                        "Periksa kembali semua kolom input."
                    );
                }
                // Error umum
                else {
                    displayAlert(
                        "destructive",
                        "Gagal",
                        "Terjadi kesalahan sistem yang tidak terduga."
                    );
                }
            },

            onFinish: () => {
                // Sembunyikan LoadingAnalisis setelah permintaan selesai
                setIsAnalyzing(false);
            },
        });
    };

    // Opsi untuk Tingkat Aktivitas (Menggunakan value yang sesuai dengan Gemini)
    const aktivitasOptions = [
        {
            value: "Sedentary",
            label: "Sangat Rendah (Jarang Beraktivitas)",
        },
        { value: "Lightly active", label: "Rendah (Olah Raga 1-3x/minggu)" },
        { value: "Moderately active", label: "Sedang (Olah Raga 3-5x/minggu)" },
        { value: "Very active", label: "Tinggi (Olah Raga 6-7x/minggu)" },
        { value: "Extra active", label: "Sangat Tinggi (Olah Raga 2x/hari)" },
    ];

    // Style Class Helpers (tidak berubah)
    const iconClass =
        "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6F5C]";
    const inputClass =
        "pl-10 bg-[#F9FAEF] border-[#D5E1C3] focus:border-[#7A9E7E] focus:ring-[#7A9E7E] text-[#2C3A2C] placeholder:text-[#8D9F8D]";
    const labelClass = "text-base font-semibold text-[#2C3A2C] mb-1.5";
    const selectClass = `flex h-12 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 ${inputClass} appearance-none`;

    // 4. Pengondisian Render LoadingAnalisis
    if (isAnalyzing) {
        return <LoadingAnalisis />;
    }

    // Tampilan Form Profil
    return (
        <AppLayout>
            <Head title="Profil" />

            {/* 5. TAMPILKAN ALERT FIXED (max-w-xs) */}
            {alert && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[250px] animate-in fade-in slide-in-from-top-1">
                    <Alert variant={alert.variant} title={alert.title}>
                        {alert.message}
                    </Alert>
                </div>
            )}

            <div className="min-h-screen w-full bg-[#F7F9F0] pb-10">
                <div className="max-w-3xl mx-auto w-full pt-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b border-[#D5E1C3] pb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3A2C] tracking-tight">
                                Edit Profil
                            </h1>
                            <p className="text-[#5C6F5C] mt-1 max-w-2xl">
                                Perbarui data fisik Anda agar kalkulasi nutrisi
                                harian menjadi lebih akurat.
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <Card className="p-6 md:p-8 rounded-2xl border border-[#D5E1C3] shadow-sm bg-white">
                        <form onSubmit={handleUpdate} className="space-y-6">
                            {/* NAMA */}
                            <div className="space-y-1">
                                <Label className={labelClass}>Nama</Label>
                                <div className="relative">
                                    <User className={iconClass} />
                                    <Input
                                        type="text"
                                        className={inputClass}
                                        placeholder="Masukkan nama"
                                        value={data?.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.name && (
                                    <span className="text-red-500 text-sm">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* TINGGI BADAN */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Tinggi Badan (cm)
                                    </Label>
                                    <div className="relative">
                                        <Ruler className={iconClass} />
                                        <Input
                                            type="number"
                                            className={inputClass}
                                            placeholder="Contoh: 170"
                                            value={data?.tinggi}
                                            onChange={(e) =>
                                                setData(
                                                    "tinggi",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {errors.tinggi && (
                                        <span className="text-red-500 text-sm">
                                            {errors.tinggi}
                                        </span>
                                    )}
                                </div>

                                {/* BERAT BADAN */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Berat Badan (kg)
                                    </Label>
                                    <div className="relative">
                                        <Weight className={iconClass} />
                                        <Input
                                            type="number"
                                            className={inputClass}
                                            placeholder="Contoh: 60"
                                            value={data?.berat}
                                            onChange={(e) =>
                                                setData("berat", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.berat && (
                                        <span className="text-red-500 text-sm">
                                            {errors.berat}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* UMUR */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Umur (Tahun)
                                    </Label>
                                    <div className="relative">
                                        <Cake className={iconClass} />
                                        <Input
                                            type="number"
                                            className={inputClass}
                                            placeholder="Contoh: 25"
                                            value={data?.umur}
                                            onChange={(e) =>
                                                setData("umur", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.umur && (
                                        <span className="text-red-500 text-sm">
                                            {errors.umur}
                                        </span>
                                    )}
                                </div>

                                {/* JENIS KELAMIN */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Jenis Kelamin
                                    </Label>
                                    <div className="relative">
                                        <MarsStroke className={iconClass} />
                                        <select
                                            className={selectClass} // Menggunakan kelas yang sudah didefinisikan
                                            value={data?.jenis_kelamin}
                                            onChange={(e) =>
                                                setData(
                                                    "jenis_kelamin",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" disabled>
                                                Pilih Jenis Kelamin
                                            </option>
                                            <option value="Laki-laki">
                                                Laki-laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </select>
                                    </div>
                                    {errors.jenis_kelamin && (
                                        <span className="text-red-500 text-sm">
                                            {errors.jenis_kelamin}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* TINGKAT AKTIVITAS (Baru) */}
                            <div className="space-y-1">
                                <Label className={labelClass}>
                                    Tingkat Aktivitas Fisik
                                </Label>
                                <div className="relative">
                                    <Bike className={iconClass} />
                                    <select
                                        className={selectClass}
                                        value={data?.aktivitas}
                                        onChange={(e) =>
                                            setData("aktivitas", e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Pilih Tingkat Aktivitas Harian
                                        </option>
                                        {aktivitasOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.tingkat_aktivitas && (
                                    <span className="text-red-500 text-sm">
                                        {errors.tingkat_aktivitas}
                                    </span>
                                )}
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex md:flex-row flex-col justify-end items-center gap-4 pt-4 border-t border-[#D5E1C3] mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-[#D5E1C3] text-[#5C6F5C] hover:bg-[#F2F5E8] hover:text-[#2C3A2C] w-full md:w-auto px-6 py-5 rounded-xl font-medium"
                                >
                                    <X size={18} className="mr-2" />
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white w-full md:w-auto px-8 py-5 rounded-xl font-semibold shadow-md shadow-[#4A624E]/20 transition-all"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2
                                                size={18}
                                                className="mr-2 animate-spin"
                                            />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} className="mr-2" />
                                            Simpan Perubahan
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
