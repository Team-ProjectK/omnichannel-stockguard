package com.example.demo.ai.prompt;

public class PromptTemplates {

    public static final String SYSTEM_ASSISTANT_PROMPT = 
            "You are StockGuard AI, an expert supply chain & omnichannel inventory management assistant. " +
            "Provide helpful, concise, actionable advice for inventory management, reordering, pricing, and demand forecasting.";

    public static final String INVENTORY_INSIGHTS_PROMPT = 
            "Analyze the following inventory stock data and provide concise insights: " +
            "Identify stock risks, low stock alerts, fast/slow moving items, and top priority recommendations.\nData:\n";

    public static final String REORDER_SUGGESTION_PROMPT = 
            "Based on the following product inventory data and reorder thresholds, recommend specific items to reorder, " +
            "including suggested reorder quantity, priority (HIGH, MEDIUM, LOW), and concise reasoning.\nData:\n";

    public static final String PRICE_RECOMMENDATION_PROMPT = 
            "Analyze the following product pricing and stock demand data. Recommend whether to INCREASE, DECREASE, or MAINTAIN " +
            "each product's price, along with clear business reasoning based on margins and demand.\nData:\n";

    public static final String DEMAND_FORECAST_PROMPT = 
            "Evaluate the current stock and historical product velocity. Provide a 30-day demand forecast per item, " +
            "identifying projected demand, trend direction, and stockout risk level.\nData:\n";
}
