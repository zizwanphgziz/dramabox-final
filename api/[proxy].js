/*
 * KOD "DAPUR" PROXY YANG TELAH DIBETULKAN UNTUK VERSEL
 * Gantikan semua kod lama dalam api/[...path].js dengan kod ini.
 */
export default async function handler(request) {
  // 1. Dapatkan URL yang diminta oleh laman web kita.
  const requestUrl = new URL(request.url);

  // 2. Dapatkan laluan API sebenar. Contoh: '/dramabox/api/v1/new/1'
  //    requestUrl.searchParams.get('path') akan mengandungi semua selepas /api/
  const actualApiPath = requestUrl.searchParams.get('path');

  // 3. Pastikan laluan tidak kosong.
  if (!actualApiPath) {
    return new Response('Laluan API tidak ditemui.', { status: 400 });
  }

  // 4. Bina semula URL API Dramabox yang lengkap.
  const apiUrl = `https://captain.sapimu.au/${actualApiPath}${requestUrl.search.replace(`?path=${actualApiPath}`, '')}`;

  // 5. Sediakan token API rahsia.
  const apiToken = '37ca7a709e85ca97c396394036dcf2458149acc963be20de25e82978fdbdcea0';

  // 6. Sediakan headers untuk dihantar ke API Dramabox.
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiToken}`);
  headers.set('Origin', 'https://www.dramabox.com'); // Penting untuk elak sekatan

  try {
    // 7. Buat panggilan sebenar ke API Dramabox.
    const apiResponse = await fetch(apiUrl, {
      method: request.method,
      headers: headers,
    });

    // 8. Hantar semula respons dari API Dramabox terus ke laman web kita.
    return apiResponse;
    
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
