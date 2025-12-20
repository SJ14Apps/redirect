export async function onRequest({ params, request }) {
    const path = params.path || "";
    const key = path.split("/")[0]; // "jsonlist"

    try {
        // Load JSON dynamically based on path
        const data = await import(`../links.json`);
        const links = data.default;

        const items = links
            .map(
                item =>
                    `<li><a href="${item.link}" target="_blank">${item.name}</a></li>`
            )
            .join("");

        return new Response(
            `
      <html>
        <body>
          <h1>${key}</h1>
          <ul>${items}</ul>
        </body>
      </html>
      `,
            { headers: { "content-type": "text/html" } }
        );
    } catch (e) {
        return new Response("Not found", { status: 404 });
    }
}
