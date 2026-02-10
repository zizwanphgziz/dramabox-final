/* KOD UNTUK diletak dalam api/proxy.js */
export default async function handler(request) {
  const url = new URL(request.url);
  const actualApiPath = url.pathname.replace('/api/proxy', '');
  const apiUrl = 'https://captain.sapimu.au' + actualApiPath + url.search;
  const apiToken = '37ca7a709e85ca97c396394036dcf2458149acc963be20de25e82978fdbdcea0';
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiToken}`);
  headers.set('Origin', 'https://www.dramabox.com');
  const apiResponse = await fetch(apiUrl, {
    method: request.method,
    headers: headers,
  });
  return apiResponse;
}
