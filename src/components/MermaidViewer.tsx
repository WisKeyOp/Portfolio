import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, Code2, Eye } from 'lucide-react';

interface MermaidViewerProps {
  chart: string;
  id: string;
}

// Initialize mermaid once with dark tactical theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Fira Code, monospace',
  themeVariables: {
    darkMode: true,
    background: '#090C15',
    mainBkg: '#0E1322',
    nodeBorder: '#4F46E5',
    lineColor: '#818CF8',
    textColor: '#F1F5F9',
    edgeLabelBackground: '#0B0F19',
    clusterBkg: '#060810',
    clusterBorder: '#1E293B',
    primaryColor: '#4F46E5',
    primaryTextColor: '#FFFFFF',
    primaryBorderColor: '#6366F1',
    secondaryColor: '#1E1B4B',
    tertiaryColor: '#090D1A',
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
    <div className="rounded-xl bg-[#07090F] border border-slate-800 overflow-hidden shadow-xl">
      {/* Top Bar with actions */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="font-semibold text-slate-300">MERMAID ENGINE · FORMAL SPEC</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
              showCode
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            <span>{showCode ? 'View Diagram' : 'View Code'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Copy Mermaid Code"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Render Area */}
      <div className="p-4 sm:p-6 overflow-x-auto min-h-[280px] flex items-center justify-center bg-[#07090F]">
        {showCode ? (
          <div className="w-full">
            <pre className="font-mono text-xs text-indigo-300 bg-black/60 p-4 rounded-lg border border-slate-800 overflow-x-auto leading-relaxed">
              {chart.trim()}
            </pre>
          </div>
        ) : error ? (
          <div className="text-center p-6">
            <div className="text-rose-400 text-xs font-mono mb-2">Mermaid Rendering Issue</div>
            <pre className="text-[11px] font-mono text-slate-500 max-w-md mx-auto overflow-x-auto bg-black/40 p-3 rounded">
              {error}
            </pre>
            <div className="mt-3">
              <button
                onClick={() => setShowCode(true)}
                className="text-xs font-mono text-indigo-400 underline hover:text-indigo-300"
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
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span>Compiling Mermaid Vector Flow...</span>
          </div>
        )}
      </div>
    </div>
  );
};

