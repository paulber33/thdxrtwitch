/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_STAGE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}