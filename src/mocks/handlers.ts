import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/automations', () => {
    return HttpResponse.json([
      { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
      {
        id: 'generate_doc',
        label: 'Generate Document',
        params: ['template', 'recipient'],
      },
      {
        id: 'notify_slack',
        label: 'Notify Slack',
        params: ['channel', 'message'],
      },
      {
        id: 'update_hris',
        label: 'Update HRIS Record',
        params: ['employee_id', 'field', 'value'],
      },
      {
        id: 'schedule_meeting',
        label: 'Schedule Meeting',
        params: ['attendees', 'duration_mins'],
      },
    ]);
  }),

  http.post('/simulate', async ({ request }) => {
    const body = (await request.json()) as any;
    const { nodes, edges } = body;
    const errors: string[] = [];

    const startNodes = nodes.filter((n: any) => n.data?.nodeType === 'start');
    const endNodes = nodes.filter((n: any) => n.data?.nodeType === 'end');
    if (startNodes.length === 0) errors.push('Workflow must have a Start node');
    if (endNodes.length === 0) errors.push('Workflow must have an End node');
    if (startNodes.length > 1) errors.push('Only one Start node allowed');

    if (nodes.length > 1) {
      const connectedIds = new Set<string>();
      edges.forEach((e: any) => {
        connectedIds.add(e.source);
        connectedIds.add(e.target);
      });
      const disconnected = nodes.filter((n: any) => !connectedIds.has(n.id));
      if (disconnected.length > 0) {
        errors.push(
          'Disconnected nodes: ' +
            disconnected
              .map((n: any) => n.data?.label || n.id)
              .join(', ')
        );
      }
    }
    const hasCycle = detectCycle(nodes, edges);
    if (hasCycle) errors.push('Workflow contains a cycle (circular dependency detected)');

    const steps = nodes.map((n: any, i: number) => ({
      step: i + 1,
      nodeId: n.id,
      label: n.data?.label || n.data?.title || 'Node ' + (i + 1),
      status: 'completed',
      message: getMsg(n.data),
    }));

    await new Promise((r) => setTimeout(r, 700));

    return HttpResponse.json({
      success: errors.length === 0,
      steps,
      errors: errors.length > 0 ? errors : undefined,
    });
  }),
];

function detectCycle(nodes: any[], edges: any[]): boolean {
  const adj: Record<string, string[]> = {};
  nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => {
    if (adj[e.source]) adj[e.source].push(e.target);
  });

  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(id: string): boolean {
    visited.add(id);
    inStack.add(id);
    for (const neighbor of adj[id] ?? []) {
      if (!visited.has(neighbor) && dfs(neighbor)) return true;
      if (inStack.has(neighbor)) return true;
    }
    inStack.delete(id);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && dfs(node.id)) return true;
  }
  return false;
}

function getMsg(data: any): string {
  if (!data) return 'Node executed';
  switch (data.nodeType) {
    case 'start':
      return `Workflow initiated — "${data.title || 'Untitled'}"`;
    case 'task':
      return `Task "${data.title || 'Untitled'}" assigned to ${data.assignee || 'unassigned'}`;
    case 'approval':
      return `Approval request sent to ${data.approverRole || 'unknown role'}`;
    case 'automated':
      return `Action "${data.actionId || 'none'}" dispatched`;
    case 'end':
      return `Workflow completed — "${data.endMessage || 'Done'}"`;
    default:
      return 'Node executed successfully';
  }
}
