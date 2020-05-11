import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import Html from "../src/Html";
import App from "../src/App";
import store from "../src/redux/store";

const port = process.env.PORT || 8080;

const app = express();

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }

    const initialState = { test: "data" };
    const appMarkup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const html = ReactDOMServer.renderToStaticMarkup(
      <Html children={appMarkup} initialState={initialState} />
    );

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(port, () => {
  console.log(`App launched on ${port}`);
});
