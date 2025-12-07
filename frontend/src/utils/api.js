const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export async function authFetch(path, method='GET', body=null, token=null) {
  const finalToken = token || sessionStorage.getItem("sessionToken");

  const headers = { 'Content-Type': 'application/json' };

  if (finalToken) {
    headers['Authorization'] = `Bearer ${finalToken}`;
  }

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const json = await res.json().catch(()=>null);
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

