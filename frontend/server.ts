import { serve } from "bun";
import { join } from "path";

const distPath = join(import.meta.dir, "dist");

serve({
  port: 8080,
  
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle API routes
    if (path.startsWith("/game")) {
      return new Response(JSON.stringify({ message: "API endpoint" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Serve static files or fallback to index.html
    const filePath = join(distPath, path);
    const file = Bun.file(filePath);
    
    if (await file.exists()) {
      return new Response(file);
    }

    // Fallback to index.html for client-side routing
    const indexFile = Bun.file(join(distPath, "index.html"));
    return new Response(indexFile, {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log("Server running on http://localhost:3000");