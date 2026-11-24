import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const [toolName, rawArguments = "{}"] = process.argv.slice(2);
console.error(`Flow MCP driver port: ${process.env.FLOW_MCP_PORT ?? "default"}`);
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [new URL("./dist/index.js", import.meta.url).pathname],
  env: { ...process.env },
});
const client = new Client({ name: "littlemoments-studio", version: "0.1.0" }, { capabilities: {} });

await client.connect(transport);
const result = toolName === "--list"
  ? await client.listTools()
  : await client.callTool({ name: toolName, arguments: JSON.parse(rawArguments) });
console.log(JSON.stringify(result, null, 2));
await client.close();
