export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API route
    if (url.pathname === "/api/products") {
      const { results } = await env.my_store_db
        .prepare("SELECT * FROM products")
        .all();
      return Response.json(results);
    }

    // Serve static UI if available
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    // Default fallback
    return new Response("Welcome to My Store API", { status: 200 });
  },
};
