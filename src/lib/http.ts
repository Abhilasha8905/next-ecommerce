import 'server-only';

const respond = (request: Request) => {
  return new Response(`${request.method}: ${request.url}`);
};

export async function GET(request: Request) {
  return respond(request);
}

export async function HEAD(request: Request) {
  return respond(request);
}

export async function POST(request: Request) {
  return respond(request);
}

export async function PUT(request: Request) {
  return respond(request);
}

export async function DELETE(request: Request) {
  return respond(request);
}

export async function PATCH(request: Request) {
  return respond(request);
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
  return respond(request);
}
