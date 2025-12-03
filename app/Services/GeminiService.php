<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    public function hitungKebutuhan($user)
{
    $apiKey = env('GEMINI_API_KEY');
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

    $prompt = "
        Bertindak sebagai Ahli Gizi Klinis.
        Hitung kebutuhan nutrisi harian berdasarkan Mifflin-St Jeor.

        Jika gagal menghitung karena input tidak jelas, balas:
        {\"error\": \"gagal_menghitung\"}

        Data Pasien:
        Umur: {$user->umur}
        Jenis Kelamin: {$user->jenis_kelamin}
        Tinggi: {$user->tinggi}
        Berat: {$user->berat}
        Aktivitas: {$user->aktivitas}

        ATURAN MAKRO:
        Protein 15%
        Lemak 25%
        Karbo 60%

        Keluarkan JSON VALID SAJA:
        {
          \"kalori\": number,
          \"protein\": number,
          \"lemak\": number,
          \"karbohidrat\": number,
          \"serat\": number,
          \"natrium\": number,
          \"gula_tambahan\": number
        }
    ";

    try {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
        ])->post($url, [
            "contents" => [
                ["parts" => [["text" => $prompt]]]
            ],
            "generationConfig" => [
                "temperature" => 0,
                "topK" => 1,
                "topP" => 1,
                "maxOutputTokens" => 2000,
            ]
        ]);

        if ($response->failed()) {
            return ['error' => 'api_gagal'];
        }

        $data = $response->json();
        $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (!$text) {
            return ['error' => 'respon_kosong'];
        }

        preg_match('/\{(?:[^{}]|(?R))*\}/', $text, $match);

        if (!isset($match[0])) {
            return ['error' => 'json_tidak_valid'];
        }

        $json = json_decode($match[0], true);

        if (!$json) {
            return ['error' => 'json_gagal_parse'];
        }

        if (isset($json['error'])) {
            return ['error' => $json['error']];
        }

        return $json;

    } catch (\Exception $e) {
        return ['error' => 'server_error'];
    }
}


    public function generateMakanan($imageFile)
    {
        $apiKey = env('GEMINI_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $imageData = base64_encode(file_get_contents($imageFile->getRealPath()));
        $mimeType = $imageFile->getMimeType();

        $prompt = "
            Kamu adalah Ahli Gizi. Analisis gambar ini.
            Pastikan ini adalah makanan. Jika bukan makanan, balas dengan:

            {\"error\": \"bukan_makanan\"}

            Jika makanan, hasilkan JSON VALID saja tanpa teks lain:

            {
                \"nama\": string,
                \"tanggal\": string,
                \"jam\": string,
                \"foto\": null,
                \"detail\": [
                    {
                        \"nama\": string,
                        \"kalori\": number,
                        \"protein\": number,
                        \"karbohidrat\": number,
                        \"lemak\": number,
                        \"serat\": number,
                        \"natrium\": number,
                        \"gula_tambahan\": number
                    }
                ],
                \"total\": {
                    \"total_kalori\": number,
                    \"total_protein\": number,
                    \"total_karbohidrat\": number,
                    \"total_lemak\": number,
                    \"total_serat\": number,
                    \"total_natrium\": number,
                    \"total_gula_tambahan\": number
                }
            }
        ";

        try {
            $response = Http::withHeaders([
                "Content-Type" => "application/json",
            ])->post($url, [
                "contents" => [[
                    "parts" => [
                        ["text" => $prompt],
                        ["inline_data" => [
                            "mime_type" => $mimeType,
                            "data" => $imageData
                        ]]
                    ]
                ]],
                "generationConfig" => [
                    "temperature" => 0.1,
                    "maxOutputTokens" => 8192,
                ]
            ]);

            if ($response->failed()) {
                return ['error' => 'api_gagal'];
            }

            $data = $response->json();
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$text) {
                return ['error' => 'respon_kosong'];
            }

            // Buang format block ```json
            $text = preg_replace('/^```json\s*|\s*```$/', '', $text);

            // Tarik JSON valid
            preg_match('/\{(?:[^{}]|(?R))*\}/', $text, $match);

            if (!isset($match[0])) {
                return ['error' => 'json_tidak_valid'];
            }

            $json = json_decode($match[0], true);

            if (!$json) {
                return ['error' => 'json_tidak_bisa_parse'];
            }

            // Jika model bilang "bukan makanan"
            if (isset($json['error']) && $json['error'] === 'bukan_makanan') {
                return ['error' => 'bukan_makanan'];
            }

            // Validasi wajib field makanan
            if (!isset($json['nama']) || !isset($json['detail']) || !isset($json['total'])) {
                return ['error' => 'struktur_tidak_lengkap'];
            }

            return $json;

        } catch (\Exception $e) {
            return ['error' => 'server_error', 'detail' => $e->getMessage()];
        }
    }

}