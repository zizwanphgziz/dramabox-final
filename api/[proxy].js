/*
 * =============================================================
 * KOD "DAPUR" PROXY YANG BETUL UNTUK VERSEL
 * Gantikan semua kod lama dalam api/[...path].js dengan kod ini.
 * =============================================================
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // 1. Dapatkan URL asal. Contoh: /api/dramabox/api/v1/new/1?lang=in
  const url = new URL(request.url);

  // 2. Buang '/api' dari permulaan untuk dapatkan laluan sebenar.
  const actualPath = url.pathname.replace('/api', '');

  // 3. Dapatkan semua parameter carian. Contoh: ?lang=in
  const searchParams = url.search;

  // 4. Bina semula URL API Dramabox yang lengkap.
  const apiUrl = `https://captain.sapimu.au${actualPath}${searchParams}`;

  // 5. Sediakan token dan header.
  const apiToken = '37ca7a709e85ca97c396394036dcf2458149acc963be20de25e82978fdbdcea0';
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiToken}`);
  headers.set('Origin', 'https://www.dramabox.com');

  try {
    // 6. Buat panggilan ke API Dramabox.
    const apiResponse = await fetch(apiUrl, {
      method: request.method,
      headers: headers,
    });

    // 7. Hantar semula jawapan terus ke laman web kita.
    return apiResponse;

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
