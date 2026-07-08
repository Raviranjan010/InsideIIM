import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

// ==========================================
// 1. Define the Search Tool
// ==========================================
const searchFinanceTool = tool(
  async ({ query }) => {
    console.log(`[Tool Executed]: Searching stock data for: ${query}`);
    
    // Mocked live stock database response
    const queryLower = query.toLowerCase();
    if (queryLower.includes("tesla") || queryLower.includes("tsla")) {
      return JSON.stringify({
        ticker: "TSLA",
        price: "$210.50",
        earningsPerShare: "$3.10",
        peRatio: "67.9",
        newsSummary: "Tesla reports strong vehicle deliveries in Q2 2026, beating analyst consensus."
      });
    }
    return JSON.stringify({
      ticker: "UNKNOWN",
      error: "No stock data found for query."
    });
  },
  {
    name: "financeSearch",
    description: "Search for live financial reports and stock statistics.",
    schema: z.object({
      query: z.string().describe("The company ticker or search phrase.")
    })
  }
);

// ==========================================
// 2. Define the Graph State Schema
// ==========================================
const StateAnnotation = Annotation.Root({
  query: Annotation<string>,
  rawResearch: Annotation<string>,
  analysisMetrics: Annotation<string>,
  finalDecision: Annotation<any>
});

// ==========================================
// 3. Define the Nodes
// ==========================================

// NODE 1: Research (Runs the search tool)
const researchNode = async (state: typeof StateAnnotation.State) => {
  console.log("--- NODE 1: RESEARCH ---");
  const toolResult = await searchFinanceTool.invoke({ query: state.query });
  return { rawResearch: toolResult };
};

// NODE 2: Analyze (Calculates valuation metrics)
const analyzeNode = async (state: typeof StateAnnotation.State) => {
  console.log("--- NODE 2: ANALYZE ---");
  const data = JSON.parse(state.rawResearch);
  
  if (data.error) {
    return { analysisMetrics: `Analysis aborted: ${data.error}` };
  }

  // Basic calculation: P/E > 30 is classified as premium growth valuation
  const pe = parseFloat(data.peRatio);
  const valuation = pe > 30 ? "Growth Valuation (High Premium)" : "Value Valuation";
  
  const metrics = `Analyzed ${data.ticker}: Price=${data.price}, P/E=${data.peRatio} (${valuation}). News: ${data.newsSummary}`;
  return { analysisMetrics: metrics };
};

// NODE 3: Decide (Calls the LLM to get structured JSON output)
const decideNode = async (state: typeof StateAnnotation.State) => {
  console.log("--- NODE 3: DECIDE ---");

  const decisionSchema = z.object({
    recommendation: z.enum(["BUY", "HOLD", "SELL"]),
    rationale: z.string().describe("The core reasoning behind the advice."),
    riskFactor: z.string().describe("The primary risk warning.")
  });

  let decisionJson;

  if (process.env.OPENAI_API_KEY) {
    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0
    });

    const structuredModel = model.withStructuredOutput(decisionSchema);

    decisionJson = await structuredModel.invoke(
      `Analyze these metrics and make a decision: ${state.analysisMetrics}`
    );
  } else {
    console.log("[Notice]: No OPENAI_API_KEY detected in env. Running mock fallback.");
    decisionJson = {
      recommendation: "HOLD",
      rationale: "Simulation Mode: P/E ratio is high ($67.9), suggesting cautious hold.",
      riskFactor: "Valuation multiple expansion risk."
    };
  }

  return { finalDecision: decisionJson };
};

// ==========================================
// 4. Construct and Compile the Graph
// ==========================================
const workflow = new StateGraph(StateAnnotation)
  .addNode("research", researchNode)
  .addNode("analyze", analyzeNode)
  .addNode("decide", decideNode)
  
  .addEdge(START, "research")
  .addEdge("research", "analyze")
  .addEdge("analyze", "decide")
  .addEdge("decide", END);

// Compile the graph
export const app = workflow.compile();

// ==========================================
// 5. Execution Runner
// ==========================================
async function run() {
  console.log("Starting Graph Execution with input: 'Tesla stock metrics'...");
  const initialState = { query: "Tesla stock metrics" };
  const finalState = await app.invoke(initialState);
  
  console.log("\n=================== WORKFLOW COMPLETED ===================");
  console.log("Final State JSON Output:");
  console.log(JSON.stringify(finalState.finalDecision, null, 2));
}

// Run if executed directly
if (require.main === module) {
  run();
}
