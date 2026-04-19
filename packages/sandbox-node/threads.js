// process.env.UV_THREADPOOL_SIZE = 5;
// console.log(process.env.UV_THREADPOOL_SIZE);
import crypto from "crypto";

const start = Date.now();

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log(Date.now() - start);
  });
}

doHash();
doHash();
doHash();
doHash();
doHash();
