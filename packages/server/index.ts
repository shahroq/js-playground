import { bootstrap } from "./app";
import config from "./common/config/config";

const app = bootstrap();

app.listen(config.port, () => {
  console.log(
    `🚀 Server running in '${config.env}' mode on ${config.base_url}:${config.port} (PID: ${process.pid})`
  );
});
