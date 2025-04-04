import { access, cp, mkdir, readFile, writeFile } from "fs/promises";


const template = await readFile("./dist/client/index.html", "utf-8");
const { render } = await import("./dist/server/entry-server.js");
const rendered = await render();
const html = template
    .replaceAll("/assets", "./assets")
    .replace("<!--app-html-->", rendered.html);
if (await access("./dist/ssg").then(() => true).catch(() => false))
    await mkdir("./dist/ssg");
await cp("./dist/client/assets", "./dist/ssg/assets", { recursive: true });
await writeFile("./dist/ssg/index.html", html, "utf-8");
console.log("SSG done");
