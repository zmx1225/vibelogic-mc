import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { TOOL_DESCRIPTION, MERMAID_VISUAL_PROTOCOL, LOGIC_CHANGE_SOP } from "./prompts.js";

// 1. 初始化 Server
const server = new Server(
  { name: "vibelogic-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2. 注册唯一工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_logic_blueprint",
        description: TOOL_DESCRIPTION,
        inputSchema: {
          type: "object",
          properties: {
            intent: {
              type: "string",
              enum: ["view", "modify"],
              description: "用户意图：'view' 表示仅查看架构图或项目逻辑，'modify' 表示项目逻辑变动或重构。"
            },
            requirement: {
              type: "string",
              description: "用户的原始需求描述。"
            },
            files_context: {
              type: "string",
              description: "相关文件的路径及关键代码摘要。"
            }
          },
          required: ["intent", "requirement", "files_context"]
        }
      }
    ]
  };
});

// 3. 工具执行与意图路由逻辑
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "get_logic_blueprint") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const args = request.params.arguments;
  const intent = args?.intent as "view" | "modify";
  const requirement = args?.requirement as string;
  const files_context = args?.files_context as string;

  if (!intent || !requirement || !files_context) {
    throw new Error("Missing required arguments.");
  }

  const now = new Date();
  const pad = (value: number) => value.toString().padStart(2, "0");
  const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const target_file = `vibelogic-plans/arch-${timestamp}.md`;

  let finalPrompt = `
你现在的任务是：将审计结果导出为文件。

【目标文件】
${target_file}

【原始需求】
${requirement}

【代码上下文】
${files_context}

【出图规范】
${MERMAID_VISUAL_PROTOCOL}
`;

  if (intent === "modify" || intent === "view") {
    finalPrompt += LOGIC_CHANGE_SOP.replace("${target_file}", target_file);
  }

  return {
    content: [
      {
        type: "text",
        text: finalPrompt
      }
    ]
  };
});

// 4. 启动 Server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("VibeLogic MCP Server running on stdio");
}

run().catch(console.error);
