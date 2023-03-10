/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
