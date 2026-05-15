let mermaidPromise: Promise<typeof import("mermaid").default> | null = null;

export function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => {
      const mermaid = m.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "loose",
        themeVariables: {
          primaryColor: "#EAF2FB",
          primaryTextColor: "#1A3A5C",
          primaryBorderColor: "#2E75B6",
          lineColor: "#2E75B6",
          secondaryColor: "#F0FAF0",
          tertiaryColor: "#FFFBEB",
          fontFamily: "DM Sans, sans-serif",
        },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}
