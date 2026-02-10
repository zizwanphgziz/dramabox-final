/*
 * =============================================================
 * KOD "DAPUR" DENGAN PENGAWAL KESELAMATAN (BLOCK DESKTOP)
 * Gantikan kod lama dalam api/proxy.js dengan kod ini.
 * =============================================================
 */
export default async function handler(request) {
  // --- BAHAGIAN PENGAWAL KESELAMATAN BARU ---
  // 1. Dapatkan "ID Kad" (User-Agent) dari pelawat.
  const userAgent = request.headers.get('user-agent') || '';

  // 2. Periksa sama ada ID Kad mengandungi perkataan yang berkaitan dengan mudah alih.
  //    /mobile|android|iphone|ipad|ipod/i  bermaksud: cari 'mobile' ATAU 'android' ATAU 'iphone', dll.
  //    'i' di hujung bermaksud tidak kira huruf besar atau kecil.
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  // 3. Jika BUKAN peranti mudah alih, halang akses.
  if (!isMobile) {
    // Hantar mesej "Dilarang" dan hentikan proses.
    return new Response('Akses hanya dibenarkan untuk peranti mudah alih.', { status: 403 });
  }
  // --- AKHIR BAHAGIAN PENGAWAL KESELAMATAN ---


  // (Kod proksi yang lain berjalan seperti biasa jika melepasi sekatan)
  const url = new URL(request.url, `https://${request.headers.get('host')}`);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response('URL sasaran tidak diberikan.', { status: 400 });
  }

  const apiToken = '37ca7a709e85ca97c396394036dcf2458149acc963be20de25e82978fdbdcea0';
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiToken}`);
  headers.set('Origin', 'https://www.dramabox.com');

  try {
    const apiResponse = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
    });
    
    const response = new Response(apiResponse.body, apiResponse);
    response.headers.set('Access-Control-Allow-Origin', '*');
    
    return response;

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
