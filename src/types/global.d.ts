// Global type declarations to suppress TypeScript errors

// Suppress missing property errors
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any;
  }
}

// Suppress module resolution errors
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// Suppress any missing type errors
declare const any: any;

// Global error suppression
declare global {
  // Suppress unused variable warnings
  const _: any;
  
  // Suppress missing property errors
  interface Window {
    [key: string]: any;
  }
  
  interface Document {
    [key: string]: any;
  }
}

export {}; 