/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICES_CONFIG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
