import Anthropic from "@anthropic-ai/sdk";
import type { GearItem } from "@/types/gear";

const client = new Anthropic();

export type RecommendationInput = {
  mountainName: string;
  month: number; // 1-12
  nights: number; // 0 = 日帰り
  userGear: GearItem[];
};

export type RecommendationResult = {
  recommended_items: Array<{
    name: string;
    category: string;
    reason: string;
    from_user_gear: boolean;
    gear_id?: string;
  }>;
  missing_items: Array<{
    name: string;
    category: string;
    priority: "必須" | "推奨" | "あると便利";
    reason: string;
  }>;
  warnings: string[];
  total_weight_estimate_g: number;
  reasoning: string;
};

// AI推奨を取得する（Server Actionから呼び出す）
export async function getGearRecommendation(
  input: RecommendationInput
): Promise<RecommendationResult> {
  const systemPrompt = `あなたは日本の登山の専門家です。
登山者の所持装備リストと登山計画を元に、その山に最適な装備パッケージを推奨してください。

## 出力ルール
- ユーザーの所持装備から使えるものを優先的に選ぶ
- 不足している必須装備は明記する
- 安全に関わる装備（レインウェア、ヘッドライト、防寒着など）は必ず確認する
- 日本の登山文化・コースに合わせた実用的なアドバイスをする`;

  const userMessage = `
## 登山計画
- 山名: ${input.mountainName}
- 時期: ${input.month}月
- 泊数: ${input.nights === 0 ? "日帰り" : `${input.nights}泊${input.nights + 1}日`}

## 私の所持装備
${input.userGear.map((g) => `- [${g.id}] ${g.name} (${g.category_id}) ${g.weight_g ? `${g.weight_g}g` : ""}`).join("\n")}

上記の計画と装備リストを元に、最適な装備パッケージを推奨してください。`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: systemPrompt,
    tools: [
      {
        name: "recommend_gear_package",
        description: "登山装備パッケージの推奨結果を返す",
        input_schema: {
          type: "object",
          properties: {
            recommended_items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  category: { type: "string" },
                  reason: { type: "string" },
                  from_user_gear: { type: "boolean" },
                  gear_id: { type: "string" },
                },
                required: ["name", "category", "reason", "from_user_gear"],
              },
            },
            missing_items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  category: { type: "string" },
                  priority: {
                    type: "string",
                    enum: ["必須", "推奨", "あると便利"],
                  },
                  reason: { type: "string" },
                },
                required: ["name", "category", "priority", "reason"],
              },
            },
            warnings: { type: "array", items: { type: "string" } },
            total_weight_estimate_g: { type: "number" },
            reasoning: { type: "string" },
          },
          required: [
            "recommended_items",
            "missing_items",
            "warnings",
            "total_weight_estimate_g",
            "reasoning",
          ],
        },
      },
    ],
    tool_choice: { type: "tool", name: "recommend_gear_package" },
    messages: [{ role: "user", content: userMessage }],
  });

  const toolUse = response.content.find((c) => c.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("AI推奨の取得に失敗しました");
  }

  return toolUse.input as RecommendationResult;
}
