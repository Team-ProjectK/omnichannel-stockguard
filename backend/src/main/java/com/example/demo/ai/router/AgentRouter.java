package com.example.demo.ai.router;

import com.example.demo.ai.agents.AIAgent;
import com.example.demo.ai.agents.GeneralAgent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AgentRouter {

    private static final Logger log = LoggerFactory.getLogger(AgentRouter.class);

    private final List<AIAgent> agents;
    private final GeneralAgent generalAgent;

    public AgentRouter(List<AIAgent> agents, GeneralAgent generalAgent) {
        this.agents = agents;
        this.generalAgent = generalAgent;
    }

    public String routeAndProcess(String sessionId, String message) {
        long startTime = System.currentTimeMillis();

        AIAgent selectedAgent = agents.stream()
                .filter(agent -> !(agent instanceof GeneralAgent))
                .filter(agent -> agent.supports(message))
                .findFirst()
                .orElse(generalAgent);

        String agentName = selectedAgent.getClass().getSimpleName();
        log.info("AgentRouter intent classification -> Selected Agent: [{}] [sessionId: {}]", agentName, sessionId);

        try {
            String responseText = selectedAgent.process(sessionId, message);
            long executionTime = System.currentTimeMillis() - startTime;

            log.info("Agent [{}] generated response [sessionId: {}, executionTime: {} ms, responseLength: {} chars]",
                    agentName, sessionId, executionTime, responseText != null ? responseText.length() : 0);

            return responseText;
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Agent [{}] execution failed [sessionId: {}, executionTime: {} ms]. Error: {}",
                    agentName, sessionId, executionTime, e.getMessage());
            throw e;
        }
    }
}
