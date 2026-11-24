import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, Code2, Eye } from 'lucide-react';

interface MermaidViewerProps {
  chart: string;
  id: string;
}

// Initialize mermaid with strict security and CSS token compatibility
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'strict',
  fontFamily: 'Fira Code, monospace',
  themeVariables: {
    darkMode: true,
    background: '#0d0d0d',
    mainBkg: '#141414',
    nodeBorder: '#ff4a17',
    lineColor: '#c7350a',
    textColor: '#f4f3f1',
    edgeLabelBackground: '#0d0d0d',
    clusterBkg: '#0d0d0d',
    clusterBorder: '#262626',
    primaryColor: '#ff4a17',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#ff4a17',
    secondaryColor: '#1a1a1a',
    tertiaryColor: '#141414',
  },
});

export const MermaidViewer: FC<MermaidViewerProps> = ({ chart, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      try {
        setError(null);
        // Generate unique container ID
        const uniqueId = `mermaid-${id.replace(/[^a-zA-Z0-9_-]/g, '_')}-${Math.random().toString(36).substring(2, 7)}`;
        const { svg } = await mermaid.render(uniqueId, chart.trim());
        if (isMounted) {
          setSvgHtml(svg);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error('[Mermaid Render Error]', err);
          setError(err instanceof Error ? err.message : 'Failed to render Mermaid diagram');
        }
      }
    };

    renderDiagram();
    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chart.trim());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-[var(--r-lg)] bg-[var(--card)] border border-[var(--line)] overflow-hidden shadow-xl">
      {/* Top Bar with actions */}
      <div className="px-4 py-2.5 bg-[var(--mute)] border-b border-[var(--line)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--slate)]">
          <span className="w-2 h-2 rounded-full bg-[var(--flame)]" />
          <span className="font-semibold text-[var(--ink)]">MERMAID ENGINE · FORMAL SPEC</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`px-2.5 py-1 rounded-[var(--r-sm)] text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
              showCode
                ? 'bg-[var(--flame)]/20 text-[var(--flame-ink)] border-[var(--flame)]/40'
                : 'bg-[var(--card)] text-[var(--slate)] border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            <span>{showCode ? 'View Diagram' : 'View Code'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-[var(--r-sm)] bg-[var(--card)] border border-[var(--line)] text-[var(--slate)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            title="Copy Mermaid Code"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-[var(--lime)]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Render Area */}
      <div className="p-4 sm:p-6 overflow-x-auto min-h-[280px] flex items-center justify-center bg-[var(--card)]">
        {showCode ? (
          <div className="w-full">
            <pre className="font-mono text-xs text-[var(--ink)] bg-[var(--mute)] p-4 rounded-[var(--r-md)] border border-[var(--line)] overflow-x-auto leading-relaxed">
              {chart.trim()}
            </pre>
          </div>
        ) : error ? (
          <div className="text-center p-6">
            <div className="text-[var(--flame-ink)] text-xs font-mono mb-2">Mermaid Rendering Issue</div>
            <pre className="text-[11px] font-mono text-[var(--slate)] max-w-md mx-auto overflow-x-auto bg-[var(--mute)] p-3 rounded-[var(--r-sm)]">
              {error}
            </pre>
            <div className="mt-3">
              <button
                onClick={() => setShowCode(true)}
                className="text-xs font-mono text-[var(--flame-ink)] underline hover:opacity-80"
              >
                Inspect Raw Mermaid Syntax
              </button>
            </div>
          </div>
        ) : svgHtml ? (
          <div 
            ref={containerRef}
            className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--slate)]">
            <span className="w-2 h-2 rounded-full bg-[var(--flame)]" />
            <span>Compiling Mermaid Vector Flow...</span>
          </div>
        )}
      </div>
    </div>
  );
};

