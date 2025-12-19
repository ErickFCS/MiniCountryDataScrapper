import { access, cp, mkdir, readFile, writeFile } from "fs/promises";


const template = await readFile("./dist/client/index.html", "utf-8");
const { render } = await import("./dist/server/entry-server.js");
const rendered = render("/");
const html = template
    .replace("<!--app-html-->", rendered.html)
    .replace("<!--app-head-->", rendered.head);
await access("./dist/ssg").catch(async () => {
    await mkdir("./dist/ssg");
});
await cp("./dist/client/assets", "./dist/ssg/assets", { recursive: true });
await writeFile("./dist/ssg/index.html", html, "utf-8");
console.log("SSR Generation is done");
