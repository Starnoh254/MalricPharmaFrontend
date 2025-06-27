// src/config/env.ts
// Environment configuration with type safety and validation

interface EnvironmentConfig {
  // API Configuration
  apiBaseUrl: string;
  appName: string;
  appVersion: string;

  // Development Settings
  enableDebug: boolean;
  logLevel: "debug" | "info" | "warn" | "error";

  // Payment Configuration
  mpesaSandbox: boolean;
  mpesaConsumerKey: string;
  mpesaConsumerSecret: string;

  // Feature Flags
  enableAnalytics: boolean;
  enableChatSupport: boolean;

  // Computed Properties
  isDevelopment: boolean;
  isProduction: boolean;
}

// Validate required environment variables
const validateEnvVar = (key: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Convert string to boolean with proper validation
const parseBooleanEnv = (
  value: string | undefined,
  defaultValue: boolean = false
): boolean => {
  if (!value) {
    return defaultValue;
  }
  return value.toLowerCase() === "true";
};

// Environment configuration object
export const env: EnvironmentConfig = {
  // API Configuration
  apiBaseUrl: validateEnvVar(
    "VITE_API_BASE_URL",
    import.meta.env.VITE_API_BASE_URL
  ),
  appName: import.meta.env.VITE_APP_NAME || "MalricPharma",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",

  // Development Settings
  enableDebug: parseBooleanEnv(import.meta.env.VITE_ENABLE_DEBUG, false),
  logLevel:
    (import.meta.env.VITE_LOG_LEVEL as "debug" | "info" | "warn" | "error") ||
    "info",

  // Payment Configuration
  mpesaSandbox: parseBooleanEnv(import.meta.env.VITE_MPESA_SANDBOX, true),
  mpesaConsumerKey: import.meta.env.VITE_MPESA_CONSUMER_KEY || "",
  mpesaConsumerSecret: import.meta.env.VITE_MPESA_CONSUMER_SECRET || "",

  // Feature Flags
  enableAnalytics: parseBooleanEnv(
    import.meta.env.VITE_ENABLE_ANALYTICS,
    false
  ),
  enableChatSupport: parseBooleanEnv(
    import.meta.env.VITE_ENABLE_CHAT_SUPPORT,
    false
  ),

  // Computed Properties
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validation function to ensure all required variables are present
export const validateEnvironment = (): void => {
  const requiredVars = ["VITE_API_BASE_URL"];

  const missingVars = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please check your .env files and ensure all required variables are set."
    );
  }

  // Log configuration in development
  if (env.isDevelopment && env.enableDebug) {
    console.group("🌍 Environment Configuration");
    console.log("Environment:", import.meta.env.MODE);
    console.log("API Base URL:", env.apiBaseUrl);
    console.log("Debug Mode:", env.enableDebug);
    console.log("Log Level:", env.logLevel);
    console.log("M-Pesa Sandbox:", env.mpesaSandbox);
    console.log("Analytics Enabled:", env.enableAnalytics);
    console.log("Chat Support Enabled:", env.enableChatSupport);
    console.groupEnd();
  }
};

// Call validation on module load
validateEnvironment();
