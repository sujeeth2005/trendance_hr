import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflowStore } from './store/workflowStore';
import { SidebarPanel } from './components/panels/SidebarPanel';
import { NodeFormPanel } from './components/panels/NodeFormPanel';
import { SandboxPanel } from './components/panels/SandboxPanel';
import { StartNode } from './components/nodes/StartNode';
import { TaskNode } from './components/nodes/TaskNode';
import { ApprovalNode } from './components/nodes/ApprovalNode';
import { AutomatedStepNode } from './components/nodes/AutomatedStepNode';
import { EndNode } from './components/nodes/EndNode';
import { NodeType, WorkflowNodeData } from './types/workflow';
import { Node } from 'reactflow';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
};

function getDefaultData(nodeType: NodeType): WorkflowNodeData {
  switch (nodeType) {
    case 'start':
      return { nodeType: 'start', label: 'Start Workflow', title: 'Start Workflow', metadata: [] };
    case 'task':
      return { nodeType: 'task', label: 'New Task', title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] };
    case 'approval':
      return { nodeType: 'approval', label: 'Approval Step', title: 'Approval Step', approverRole: 'Manager', autoApproveThreshold: 0 };
    case 'automated':
      return { nodeType: 'automated', label: 'Automated Step', title: 'Automated Step', actionId: '', actionParams: {} };
    case 'end':
      return { nodeType: 'end', label: 'Workflow Complete', endMessage: 'Workflow Complete', showSummary: false };
  }
}

function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    addNode,
  } = useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const rfInstanceRef = useRef<ReactFlowInstance | null>(null);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    rfInstanceRef.current = instance;
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const nodeType = e.dataTransfer.getData('application/reactflow-type') as NodeType;
      if (!nodeType || !rfInstanceRef.current || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = rfInstanceRef.current.project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      const newNode: Node<WorkflowNodeData> = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position,
        data: getDefaultData(nodeType),
      };

      addNode(newNode);
      selectNode(newNode.id);
    },
    [addNode, selectNode]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const { deleteSelected, selectedNodeId } = useWorkflowStore.getState();
        if (selectedNodeId) deleteSelected();
      }
    },
    []
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="flex-1 h-full"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={onPaneClick}
        onInit={onInit}
        fitView
        deleteKeyCode={null}
        snapToGrid
        snapGrid={[16, 16]}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.2}
          color="#e5e7eb"
        />
        <Controls
          className="!shadow-md !rounded-xl !border !border-gray-100"
          showInteractive={false}
        />
        <MiniMap
          className="!rounded-xl !border !border-gray-100 !shadow-md"
          nodeColor={(n) => {
            const t = (n.data as WorkflowNodeData)?.nodeType;
            const colors: Record<string, string> = {
              start: '#10b981',
              task: '#3b82f6',
              approval: '#f59e0b',
              automated: '#7c3aed',
              end: '#f43f5e',
            };
            return colors[t] || '#9ca3af';
          }}
        />
      </ReactFlow>

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl mb-3">⬡</div>
            <p className="text-sm font-semibold text-gray-400">
              Drag nodes from the sidebar to get started
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Connect nodes to build your HR workflow
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-52 border-r border-gray-100 bg-white flex-shrink-0 flex flex-col shadow-sm z-10">
          <SidebarPanel />
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-50">
          <WorkflowCanvas />
        </div>

        {/* Right Panel */}
        <div className="w-72 border-l border-gray-100 bg-white flex-shrink-0 flex flex-col shadow-sm z-10">
          <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Properties
            </h2>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
            <NodeFormPanel />
          </div>
          <SandboxPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
