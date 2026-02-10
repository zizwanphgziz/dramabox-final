/* KOD BARU UNTUK DAPUR PROXY */
/* Namakan fail ini: api/[...path].js */

export default async function handler(request) {
  const url = new URL(request.url);

  // Laluan sebenar adalah semua selepas /api/
  const actualApiPath = url.pathname.replace('/api', '');
  
  // Bina semula URL API Dramabox yang lengkap
  const apiUrl = 'https://captain.sapimu.au' + actualApiPath + url.search;

  const apiToken = '37ca7a709e85ca97c396394036dcf2458149acc963be20de25e82978fdbdcea0';

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiToken}`);
  headers.set('Origin', 'https://www.dramabox.com');

  const apiResponse = await fetch(apiUrl, {
    method: request.method,
    headers: headers,
  });
  
  const response = new Response(apiResponse.body, apiResponse);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  return response;
}
