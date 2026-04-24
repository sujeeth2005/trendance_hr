import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { useSimulate } from '../../hooks/useSimulate';
import { SimulationStep } from '../../types/workflow';

export function SandboxPanel() {
  const { nodes, edges, exportWorkflow, importWorkflow } = useWorkflowStore();
  const { simulate, result, loading } = useSimulate();
  const [tab, setTab] = useState<'simulate' | 'json'>('simulate');
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleSimulate = () => {
    simulate(nodes, edges);
  };

  const handleExport = () => {
    const json = exportWorkflow();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
  };

  const handleImport = () => {
    importWorkflow(importText);
    setShowImport(false);
    setImportText('');
  };

  return (
    <div className="flex flex-col border-t border-gray-100" style={{ height: '380px' }}>
      {/* Tabs */}
      <div className="flex border-b border-gray-100 flex-shrink-0">
        <button
          onClick={() => setTab('simulate')}
          className={`flex-1 text-xs font-semibold py-2.5 transition-colors ${
            tab === 'simulate'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Sandbox
        </button>
        <button
          onClick={() => setTab('json')}
          className={`flex-1 text-xs font-semibold py-2.5 transition-colors ${
            tab === 'json'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          JSON
        </button>
      </div>

      {tab === 'simulate' && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="px-3 pt-3 pb-2 flex-shrink-0">
            <button
              onClick={handleSimulate}
              disabled={loading || nodes.length === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running...
                </>
              ) : (
                <>▶ Run Simulation</>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-3">
            {!result && !loading && (
              <div className="text-center py-6">
                <p className="text-xs text-gray-400">
                  {nodes.length === 0
                    ? 'Add nodes to the canvas first'
                    : 'Click Run Simulation to test your workflow'}
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-2">
                {/* Status banner */}
                <div
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    result.success
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {result.success ? '✅ Workflow valid' : '❌ Validation failed'}
                </div>

                {/* Errors */}
                {result.errors?.map((err, i) => (
                  <div
                    key={i}
                    className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-600"
                  >
                    ⚠ {err}
                  </div>
                ))}

                {/* Steps */}
                {result.steps.map((step: SimulationStep) => (
                  <div
                    key={step.nodeId}
                    className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-gray-400 w-5">
                        {step.step}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          step.status === 'completed'
                            ? 'text-emerald-600'
                            : 'text-red-600'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">{step.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'json' && (
        <div className="flex flex-col flex-1 overflow-hidden p-3 gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-colors"
            >
              ↓ Export
            </button>
            <button
              onClick={() => setShowImport(!showImport)}
              className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-colors"
            >
              ↑ Import
            </button>
          </div>

          {showImport && (
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full border border-gray-200 rounded-lg p-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                rows={5}
                placeholder="Paste workflow JSON here..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
              <button
                onClick={handleImport}
                className="w-full text-xs bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Import Workflow
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <pre className="text-xs font-mono text-gray-500 bg-gray-50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
              {nodes.length === 0
                ? '// Add nodes to see workflow JSON'
                : exportWorkflow()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
