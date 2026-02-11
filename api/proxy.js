/*
 * =============================================================
 * KOD "DAPUR" PROXY PALING SELAMAT UNTUK VERSEL
 * Membetulkan ralat 'request.headers.get is not a function'
 * =============================================================
 */
export default async function handler(request, response) {
  // 1. Dapatkan URL sasaran dari parameter.
  const targetUrl = request.query.url;

  // 2. Jika tiada URL sasaran, pulangkan ralat.
  if (!targetUrl) {
    return response.status(400).send('URL sasaran tidak diberikan.');
  }

  // 3. Sediakan token API.
  const apiToken = '25da1ef4e11243397e7e038c3b8eef65646dd29329d917fbe060ede54318bb11';

  try {
    // 4. Buat panggilan ke API Dramabox menggunakan 'node-fetch' atau 'axios' (jika perlu)
    //    atau terus guna fetch jika persekitaran menyokongnya.
    const apiResponse = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Origin': 'https://www.dramabox.com'
      }
    });

    // 5. Dapatkan data sebagai JSON.
    const data = await apiResponse.json();
    
    // 6. Hantar semula data JSON dengan status yang betul.
    response.status(200).json(data);

  } catch (error) {
    console.error("Ralat Sebenar di Proksi:", error);
    response.status(500).json({ error: error.message });
  }
}
