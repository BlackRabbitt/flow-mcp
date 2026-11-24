import { LocalCore } from "./dist/core.js";

const [method, rawArguments = "{}"] = process.argv.slice(2);
if (!method || typeof new LocalCore()[method] !== "function") {
  throw new Error("Pass a flow-mcp LocalCore method name and JSON arguments.");
}
const core = new LocalCore();
const result = await core[method](JSON.parse(rawArguments));
console.log(JSON.stringify(result, null, 2));
