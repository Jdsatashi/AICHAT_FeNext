export {};

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
    HSComboBox?: {
      getInstance: (element: HTMLElement, isNew?: boolean) => void;
    };
  }
}
