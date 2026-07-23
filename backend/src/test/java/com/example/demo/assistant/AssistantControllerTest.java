package com.example.demo.assistant;

import com.example.demo.ai.agents.*;
import com.example.demo.ai.router.AgentRouter;
import com.example.demo.assistant.controller.AssistantController;
import com.example.demo.assistant.dto.ChatRequest;
import com.example.demo.assistant.dto.ChatResponse;
import com.example.demo.assistant.entity.Conversation;
import com.example.demo.assistant.entity.ConversationMessage;
import com.example.demo.assistant.exception.AssistantExceptionHandler;
import com.example.demo.assistant.rag.service.KnowledgeService;
import com.example.demo.assistant.service.AssistantService;
import com.example.demo.assistant.service.ConversationService;
import com.example.demo.assistant.service.SessionManager;
import com.example.demo.model.Inventory;
import com.example.demo.model.PurchaseOrder;
import com.example.demo.model.SalesOrder;
import com.example.demo.model.Supplier;
import com.example.demo.model.product;
import com.example.demo.service.InventoryService;
import com.example.demo.service.PurchaseOrderService;
import com.example.demo.service.SalesOrderService;
import com.example.demo.service.SupplierService;
import com.example.demo.service.productService;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.output.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.net.ConnectException;
import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AssistantControllerTest {

    private MockMvc mockMvc;
    private ChatLanguageModel chatLanguageModel;
    private SessionManager sessionManager;
    private InventoryService inventoryService;
    private productService productService;
    private SupplierService supplierService;
    private SalesOrderService salesOrderService;
    private PurchaseOrderService purchaseOrderService;
    private ConversationService conversationService;
    private KnowledgeService knowledgeService;

    @BeforeEach
    void setUp() {
        chatLanguageModel = Mockito.mock(ChatLanguageModel.class);
        inventoryService = Mockito.mock(InventoryService.class);
        productService = Mockito.mock(productService.class);
        supplierService = Mockito.mock(SupplierService.class);
        salesOrderService = Mockito.mock(SalesOrderService.class);
        purchaseOrderService = Mockito.mock(PurchaseOrderService.class);
        conversationService = Mockito.mock(ConversationService.class);
        knowledgeService = Mockito.mock(KnowledgeService.class);

        when(conversationService.getOrCreateConversation(any(), any()))
                .thenAnswer(inv -> {
                    String sid = inv.getArgument(0);
                    if (sid == null || sid.trim().isEmpty()) sid = "test-session-123";
                    return new Conversation(sid, "Test Session Title");
                });
        when(conversationService.getMessages(anyString())).thenReturn(Collections.emptyList());
        when(knowledgeService.searchKnowledge(anyString(), anyInt())).thenReturn(Collections.emptyList());

        sessionManager = new SessionManager(conversationService);

        InventoryAgent inventoryAgent = new InventoryAgent(chatLanguageModel, sessionManager, inventoryService);
        ProductAgent productAgentBean = new ProductAgent(chatLanguageModel, sessionManager, productService);
        SupplierAgent supplierAgentBean = new SupplierAgent(chatLanguageModel, sessionManager, supplierService);
        AnalyticsAgent analyticsAgentBean = new AnalyticsAgent(chatLanguageModel, sessionManager, salesOrderService, productService, inventoryService);
        ReorderAgent reorderAgentBean = new ReorderAgent(chatLanguageModel, sessionManager, inventoryService, purchaseOrderService);
        GeneralAgent generalAgent = new GeneralAgent(chatLanguageModel, sessionManager);

        AgentRouter agentRouter = new AgentRouter(
                Arrays.asList(inventoryAgent, productAgentBean, supplierAgentBean, analyticsAgentBean, reorderAgentBean, generalAgent),
                generalAgent
        );

        AssistantService assistantService = new AssistantService(agentRouter, sessionManager, knowledgeService);

        AssistantController controller = new AssistantController(assistantService, conversationService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .setControllerAdvice(new AssistantExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("InventoryAgent Integration: Retrieves real inventory data from InventoryService")
    void testInventoryAgentWithService() throws Exception {
        Inventory inv = new Inventory();
        inv.setSku("ELEC-001");
        inv.setStoreId("STORE-01");
        inv.setAvailableStock(8);

        when(inventoryService.getLowStockItems(anyInt())).thenReturn(Collections.singletonList(inv));
        when(chatLanguageModel.generate(anyList()))
                .thenReturn(Response.from(AiMessage.from("Inventory Agent: SKU ELEC-001 has 8 units available.")));

        String jsonPayload = """
                {
                  "message": "Check low stock items in inventory"
                }
                """;

        mockMvc.perform(post("/api/assistant/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response", containsString("Inventory Agent: SKU ELEC-001 has 8 units available.")));
    }

    @Test
    @DisplayName("Conversation History REST API Test: GET /api/assistant/conversations")
    void testGetConversations() throws Exception {
        Conversation c1 = new Conversation("sess-1", "Low Stock Search");
        when(conversationService.getAllConversations()).thenReturn(Collections.singletonList(c1));

        mockMvc.perform(get("/api/assistant/conversations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].sessionId", is("sess-1")))
                .andExpect(jsonPath("$[0].title", is("Low Stock Search")));
    }

    @Test
    @DisplayName("Conversation History Messages REST API Test: GET /api/assistant/conversations/{sessionId}")
    void testGetConversationMessages() throws Exception {
        ConversationMessage m1 = new ConversationMessage("sess-1", "user", "What is low stock?");
        when(conversationService.getMessages("sess-1")).thenReturn(Collections.singletonList(m1));

        mockMvc.perform(get("/api/assistant/conversations/sess-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].role", is("user")))
                .andExpect(jsonPath("$[0].message", is("What is low stock?")));
    }

    @Test
    @DisplayName("Rename Conversation REST API Test: PUT /api/assistant/conversations/{sessionId}/title")
    void testRenameConversation() throws Exception {
        Conversation updated = new Conversation("sess-1", "Renamed Stock Query");
        when(conversationService.updateTitle("sess-1", "Renamed Stock Query")).thenReturn(updated);

        String jsonPayload = """
                {
                  "title": "Renamed Stock Query"
                }
                """;

        mockMvc.perform(put("/api/assistant/conversations/sess-1/title")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Renamed Stock Query")));
    }

    @Test
    @DisplayName("Delete Conversation REST API Test: DELETE /api/assistant/conversations/{sessionId}")
    void testDeleteConversation() throws Exception {
        mockMvc.perform(delete("/api/assistant/conversations/sess-1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Validation Error Test: Empty prompt (HTTP 400)")
    void testEmptyPromptValidation() throws Exception {
        String jsonPayload = """
                {
                  "message": ""
                }
                """;

        mockMvc.perform(post("/api/assistant/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.error", is("Bad Request")));
    }

    @Test
    @DisplayName("Ollama Connection Failure Test (HTTP 503)")
    void testOllamaConnectionFailure() throws Exception {
        when(chatLanguageModel.generate(anyList()))
                .thenThrow(new RuntimeException("Connection refused", new ConnectException("Connection refused")));

        String jsonPayload = """
                {
                  "message": "General warehouse query"
                }
                """;

        mockMvc.perform(post("/api/assistant/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.status", is(503)))
                .andExpect(jsonPath("$.error", is("Service Unavailable")));
    }
}
