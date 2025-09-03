export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // GET all products
    if (url.pathname === "/api/products" && request.method === "GET") {
      const { results } = await env.my_store_db
        .prepare("SELECT * FROM products;")
        .all();

      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // GET product by ID
    if (url.pathname.startsWith("/api/products/") && request.method === "GET") {
      const id = url.pathname.split("/").pop();

      const { results } = await env.my_store_db
        .prepare("SELECT * FROM products WHERE id = ?;")
        .bind(id)
        .all();

      if (results.length === 0) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(results[0]), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // POST new product
    if (url.pathname === "/api/products" && request.method === "POST") {
      const body = await request.json();
      const { name, price } = body;

      if (!name || !price) {
        return new Response(
          JSON.stringify({ error: "Name and price are required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      await env.my_store_db
        .prepare("INSERT INTO products (name, price) VALUES (?, ?);")
        .bind(name, price)
        .run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
