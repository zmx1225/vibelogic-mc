# 🧠 VibeLogic MCP

**为 Cursor 打造的确定性架构引擎与逻辑死锁协议**

当项目复杂度提升时，AI 编程往往会陷入“幻觉螺旋”。VibeLogic MCP 并不是另一个代码生成器，而是一个处于“人类意图”与“代码执行”之间的管控层。它强制 AI 在动刀改代码前，先通过可视化蓝图进行审计。

## ✨ 核心能力

- **可视化架构审计 (Visual Audit)**：强制 AI 提取项目拓扑，通过 Mermaid 蓝图对齐逻辑，确保 100% 意图确定性。
- **逻辑死锁协议 (Security Lock)**：独家封装的注意力劫持协议，强制 AI 在“图纸确认”前保持原地待命，阻断越权重构。
- **跨文件深度追踪**：自动识别多文件关联变更，生成结构化的施工清单 (Action Plan)。
- **资产化存档**：所有架构决策自动导出为 `.md` 文件，永久沉淀为项目的架构演进日志。

## 🚀 快速开始

##  1. 安装
确保你已安装 Node.js，然后在 Cursor 中直接运行：
```bash
npx vibelogic-mcp
```

## 2. 在 Cursor 中配置
打开 Cursor Settings -> Features -> MCP。
点击 + Add New MCP Server。
设置如下：

Name: VibeLogic
Type: command
Command: npx vibelogic-mcp

💡 常用咒语 (Prompts)
"帮我分析下这个功能的逻辑，我想看图。"
"我要重构登录模块的校验流程，先出图和施工单。"
"基于当前代码，审计一下新增 API 对现有架构的影响。"

🔒 隐私与安全
BYOK (自带 Key)：VibeLogic 运行在你的本地环境，不存储任何代码，完全复用你 Cursor 选定的模型能力。
拒绝复杂化：仅在涉及核心逻辑变动时激活，不干扰常规的 UI 调整和 Bug 修复。
