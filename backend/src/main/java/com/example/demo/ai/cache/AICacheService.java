package com.example.demo.ai.cache;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AICacheService {

    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    private static final long DEFAULT_TTL_SECONDS = 300; // 5 minutes cache

    public Object get(String key) {
        CacheEntry entry = cache.get(key);
        if (entry == null) {
            return null;
        }
        if (Instant.now().isAfter(entry.expiryTime)) {
            cache.remove(key);
            return null;
        }
        return entry.data;
    }

    public void put(String key, Object data) {
        put(key, data, DEFAULT_TTL_SECONDS);
    }

    public void put(String key, Object data, long ttlSeconds) {
        cache.put(key, new CacheEntry(data, Instant.now().plusSeconds(ttlSeconds)));
    }

    public void clear() {
        cache.clear();
    }

    private static class CacheEntry {
        final Object data;
        final Instant expiryTime;

        CacheEntry(Object data, Instant expiryTime) {
            this.data = data;
            this.expiryTime = expiryTime;
        }
    }
}
