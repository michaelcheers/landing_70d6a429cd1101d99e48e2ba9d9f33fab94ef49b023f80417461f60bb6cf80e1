const NextResponse = {
  json: (data, init) => new Response(JSON.stringify(data), init),
  redirect: (url) => {
    try {
      location.href = String(url);
    } catch {
    }
    return new Response("", { status: 302 });
  },
  rewrite: () => new Response("", { status: 200 }),
  next: () => new Response("", { status: 200 })
};
class NextRequest extends Request {
}
export {
  NextRequest,
  NextResponse
};
