import { renderToString } from "react-dom/server";
import App from "./App";


export const render = (url) => {
    let validPaths = ["/"];
    if (!validPaths.includes(url)) return "";
    return {
        head: "",
        html: renderToString(
            <App />
        )
    };
};
