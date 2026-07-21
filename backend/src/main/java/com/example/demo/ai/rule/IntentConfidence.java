package com.example.demo.ai.rule;

public class IntentConfidence implements Comparable<IntentConfidence> {
    private final IntentType intentType;
    private final double score;

    public IntentConfidence(IntentType intentType, double score) {
        this.intentType = intentType;
        this.score = score;
    }

    public IntentType getIntentType() {
        return intentType;
    }

    public double getScore() {
        return score;
    }

    @Override
    public int compareTo(IntentConfidence other) {
        return Double.compare(other.score, this.score);
    }
}
