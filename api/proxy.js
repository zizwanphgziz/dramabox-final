/*
 * =============================================================
 * KOD "DAPUR" PROXY YANG PALING SIMPLE (LOGIK CODEPEN)
 * Namakan fail ini: api/proxy.js
 * =============================================================
 */
export default async function handler(request) {
  // 1. Dapatkan URL yang diminta oleh laman web kita.
  const url = new URL(request.url);

  // 2. Dapatkan URL API sasaran dari parameter `?url=...`
  const targetUrl = url.searchParams.get('url');

  // 3. Jika tiada URL sasaran, pulangkan ralat.
  if (!targetUrl) {
    return new Response('URL sasaran tidak diberikan.', { status: 400 });
  }

  // 4. Sediakan token dan header.
  const apiToken = '37ca7a709e85ca97c396394036dcf2458149acc963be20de25e82978fdbdcea0';
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiToken}`);
  headers.set('Origin', 'https://www.dramabox.com'); // Penting untuk elak sekatan

  try {
    // 5. Buat panggilan ke API Dramabox.
    const apiResponse = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
    });

    // 6. Cipta satu respons baru untuk dihantar semula ke laman web.
    const response = new Response(apiResponse.body, apiResponse);
    // 7. Tambah header CORS untuk benarkan pelayar terima data.
    response.headers.set('Access-Control-Allow-Origin', '*');
    
    return response;

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
