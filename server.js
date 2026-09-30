const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function setSecurityHeaders(res) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-Frame-Options", "DENY");
}

function sendFile(res, filePath, method) {
  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      setSecurityHeaders(res);
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      if (method !== "HEAD") res.end("Not found");
      else res.end();
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    setSecurityHeaders(res);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stat.size,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
    });

    if (method === "HEAD") {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      if (!res.headersSent) {
        setSecurityHeaders(res);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      }
      res.end("Server error");
    });
    stream.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const method = req.method || "GET";

  if (method !== "GET" && method !== "HEAD") {
    setSecurityHeaders(res);
    res.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      Allow: "GET, HEAD"
    });
    res.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = new URL(req.url, "http://localhost").pathname;
  } catch {
    setSecurityHeaders(res);
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  if (pathname === "/") pathname = "/index.html";

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    setSecurityHeaders(res);
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  const requestedPath = path.resolve(publicDir, "." + decodedPath);
  if (!requestedPath.startsWith(publicDir + path.sep) && requestedPath !== publicDir) {
    setSecurityHeaders(res);
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(res, requestedPath, method);
});

server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.keepAliveTimeout = 5000;

server.listen(port, "0.0.0.0", () => {
  console.log(`PraxisNow staging server listening on port ${port}`);
});
