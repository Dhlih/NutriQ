<?php

namespace App\Http\Controllers;

use App\Models\KebutuhanHarian;
use App\Models\Makanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // 1. Ambil data Kebutuhan Harian (Target)
        $kebutuhan = KebutuhanHarian::where('user_id', $user->id)->first();

        // 2. Ambil tanggal untuk tampilan hari ini (tetap diperlukan untuk DashboardCard)
        // Default ke hari ini
        $tanggalHariIni = $request->input('tanggal', now()->toDateString());

        // 3. Ambil total makanan untuk HARI INI
        $makananHariIni = Makanan::where('user_id', $user->id)
            ->whereDate('tanggal', $tanggalHariIni)
            ->selectRaw('
                SUM(total_kalori) as kalori,
                SUM(total_protein) as protein,
                SUM(total_karbohidrat) as karbohidrat,
                SUM(total_lemak) as lemak,
                SUM(total_serat) as serat,
                SUM(total_natrium) as natrium,
                SUM(total_gula_tambahan) as gula_tambahan
            ')
            ->first();

        // 4. Ambil data makanan untuk RENTANG TANGGAL (untuk EventsChart)
        // Logika default: 7 hari ke belakang (atau bisa disesuaikan)
        $endDate = $request->input('chart_end_date', now()->toDateString());
        $startDate = $request->input('chart_start_date', now()->subDays(6)->toDateString()); // 7 hari total

        $makananRentangTanggal = Makanan::where('user_id', $user->id)
            ->whereBetween('tanggal', [$startDate, $endDate])
            ->groupBy('tanggal')
            ->orderBy('tanggal')
            ->selectRaw('
                DATE(tanggal) as date,
                SUM(total_kalori) as Kalori,
                SUM(total_protein) as Protein,
                SUM(total_karbohidrat) as Karbohidrat,
                SUM(total_lemak) as Lemak,
                SUM(total_serat) as Serat,
                SUM(total_natrium) as Natrium,
                SUM(total_gula_tambahan) as Gula_tambahan
            ')
            ->get();

        // Mengubah format key agar lebih sesuai dengan chart config (huruf besar di awal)
        $makananRentangTanggalFormatted = $makananRentangTanggal->map(function ($item) {
            $newItem = [];
            foreach ($item->toArray() as $key => $value) {
                if ($key !== 'date') {
                    // Hanya format key nutrisi
                    $newItem[ucfirst($key)] = (int) $value; // Pastikan berupa integer
                } else {
                    $newItem[$key] = $value;
                }
            }
            return $newItem;
        })->toArray();

        return Inertia::render('Dashboard', [
            'user' => $user,
            'kebutuhan' => $kebutuhan,
            'makananHariIni' => $makananHariIni,
            'tanggal' => $tanggalHariIni, // Tanggal untuk bagian 'Hari Ini'
            'makananRentangTanggal' => $makananRentangTanggalFormatted, // Data untuk Chart
            'chartDates' => ['startDate' => $startDate, 'endDate' => $endDate], // Rentang Tanggal Chart
        ]);
    }
}
