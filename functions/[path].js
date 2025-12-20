export async function onRequest(context) {
    const {params} = context;

    const response = await context.next();

    if (response.status !== 404) {
        return response;
    }

    const path = params.path || "";
    const key = path.split("/")[0];

    try {
        const data = await import(`../links.json`);
        const links = data.default;

        const items = links
            .filter(l => l.name.toLowerCase().includes(key.toLowerCase()))
            .map(
                l => `<li><a href="${l.link}">${l.name.toLowerCase()}</a></li>`
            )
            .join("");


        if (items.length === 0) {
            return new Response(
                `
    <html>
      <head>
        <title>Site not found</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body style="margin:0">
        <iframe src="/404.html" width="100%" height="500" style="border:none"></iframe>
      </body>
    </html>
    `,
                {status: 404, headers: {"content-type": "text/html"}}
            );
        }

        return new Response(
            `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Results for ${key}</title>
      <link rel="stylesheet" href="style.css">
      <style>
        body {
          font-family: KanitRegular, "roboto", sans-serif;
          margin: auto;
          width: 50%;
        }
        li {
            text-align: center;
        }
        ul {
          list-style-type: none; 
          
          padding: 0;
        }
        a {
            color: white;
        }
      </style>
    </head>
    <body>
      <h2 style="text-align:center">
        Results for: <span style="color:aqua">${key}</span>
      </h2>
      <hr>
      <ul>
        ${items}
      </ul>
    </body>
  </html>
  `,
            {headers: {"content-type": "text/html"}}
        );
    } catch {
        return new Response("Not found", {status: 404});
    }
}
