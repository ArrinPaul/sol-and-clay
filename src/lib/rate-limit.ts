/**
 * Simple in-memory rate limiter for server actions.
 * For production, consider using Redis or a dedicated rate limiting service.
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

// Store rate limit data in memory (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically (every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.firstRequest > windowMs) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Number of remaining requests in the current window */
  remaining: number;
  /** Milliseconds until the rate limit resets */
  resetInMs: number;
}

/**
 * Check if a request should be rate limited.
 * 
 * @param identifier - Unique identifier for the rate limit (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 * 
 * @example
 * ```ts
 * const result = checkRateLimit('user-123', { maxRequests: 10, windowMs: 60000 });
 * if (!result.allowed) {
 *   return { error: `Too many requests. Try again in ${Math.ceil(result.resetInMs / 1000)} seconds.` };
 * }
 * ```
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs } = config;
  const now = Date.now();
  
  // Clean up old entries
  cleanup(windowMs);
  
  const entry = rateLimitStore.get(identifier);
  
  if (!entry) {
    // First request from this identifier
    rateLimitStore.set(identifier, { count: 1, firstRequest: now });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInMs: windowMs,
    };
  }
  
  const timeSinceFirst = now - entry.firstRequest;
  
  if (timeSinceFirst > windowMs) {
    // Window has expired, reset
    rateLimitStore.set(identifier, { count: 1, firstRequest: now });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInMs: windowMs,
    };
  }
  
  // Within the window
  if (entry.count >= maxRequests) {
    // Rate limited
    return {
      allowed: false,
      remaining: 0,
      resetInMs: windowMs - timeSinceFirst,
    };
  }
  
  // Increment count
  entry.count++;
  rateLimitStore.set(identifier, entry);
  
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetInMs: windowMs - timeSinceFirst,
  };
}

/**
 * Pre-configured rate limiters for common use cases.
 */
export const RateLimiters = {
  /** Standard API rate limit: 100 requests per minute */
  standard: { maxRequests: 100, windowMs: 60 * 1000 },
  
  /** Strict rate limit for sensitive operations: 10 requests per minute */
  strict: { maxRequests: 10, windowMs: 60 * 1000 },
  
  /** Very strict rate limit: 5 requests per 5 minutes (for things like password reset) */
  veryStrict: { maxRequests: 5, windowMs: 5 * 60 * 1000 },
  
  /** Form submission rate limit: 3 requests per minute */
  formSubmission: { maxRequests: 3, windowMs: 60 * 1000 },
  
  /** Checkout rate limit: 5 requests per minute */
  checkout: { maxRequests: 5, windowMs: 60 * 1000 },
} as const;

/**
 * Get a rate limit identifier from request headers.
 * Uses various headers to try to identify the client.
 */
export function getClientIdentifier(headers: Headers): string {
  // Try various headers that might contain the client IP
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a hash of various headers as identifier
  const userAgent = headers.get('user-agent') || 'unknown';
  const acceptLanguage = headers.get('accept-language') || 'unknown';
  
  // Simple hash function
  const str = `${userAgent}-${acceptLanguage}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return `fallback-${hash}`;
}
