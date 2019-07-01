import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/spark',
  name: 'spark',
  meta,
  redirect: { name: 'spark-task' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'task', name: `${pre}task`, component: () => import('@/pages/spark/task/index'), meta: { ...meta, title: '新建Spark分析任务' } },
    { path: 'report', name: `${pre}report`, component: () => import('@/pages/spark/report/index'), meta: { ...meta, title: 'Straggler检测报告' } },
  ])('spark-')
}
