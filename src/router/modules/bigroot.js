import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/bigroot',
  name: 'bigroot',
  meta,
  redirect: { name: 'bigroot-task' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'task', name: `${pre}task`, component: () => import('@/pages/bigroot/task/index'), meta: { ...meta, title: '新建任务' } },
    { path: 'report', name: `${pre}report`, component: () => import('@/pages/bigroot/report/index'), meta: { ...meta, title: '任务报告' } },
  ])('bigroot-')
}
