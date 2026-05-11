// next/server stub — code paths that used this should have been deleted,
// but provide a stub so partial leftovers don't break the bundle.
export const NextResponse = {
  json: (data, init) => new Response(JSON.stringify(data), init),
  redirect: (url) => { try { location.href = String(url); } catch {} return new Response('', { status: 302 }); },
  rewrite: () => new Response('', { status: 200 }),
  next: () => new Response('', { status: 200 }),
};
export class NextRequest extends Request {}
