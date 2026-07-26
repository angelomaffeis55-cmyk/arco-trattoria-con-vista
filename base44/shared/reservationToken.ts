import { secrets } from 'base44:runtime';

function toB64url(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(id) {
  // Riutiliziamo la chiave Resend già configurata come segreto per firmare i link.
  const secret = secrets.get('RESEND_API_KEY') || 'arco-dev-fallback';
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(id));
  return toB64url(sig);
}

export async function signReservationId(id) {
  return await hmac(id);
}

export async function verifyReservationId(id, token) {
  if (!token) return false;
  const expected = await hmac(id);
  return token === expected;
}