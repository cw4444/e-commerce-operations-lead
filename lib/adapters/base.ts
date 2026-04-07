import type { Connector, ConnectorSnapshot } from "@/lib/connectors";

type AdapterConfig = {
  key: string;
  name: string;
  source: string;
  fallback: ConnectorSnapshot;
  envVar?: string;
};

export function createAdapter(config: AdapterConfig): Connector {
  return {
    key: config.key,
    name: config.name,
    read() {
      const enabled = config.envVar ? process.env[config.envVar] === "true" : false;
      if (enabled) {
        return {
          ...config.fallback,
          mode: "mcp",
          source: config.source
        };
      }

      return config.fallback;
    }
  };
}
