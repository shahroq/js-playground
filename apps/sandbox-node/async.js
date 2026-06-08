import https from "https";

const start = Date.now();

function doRequest() {
  https
    .request("https://www.zarebin.ir", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest();
