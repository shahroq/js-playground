import { bootstrap } from "./common/app";
import { config } from "./common/container";

const app = bootstrap();

app.listen(config.port, () => {
  console.log(
    `🚀 Server running in '${config.env}' mode on ${config.base_url}:${config.port} (PID: ${process.pid})`
  );
});
