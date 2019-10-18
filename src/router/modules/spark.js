import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/spark',
  name: 'spark',
  meta,
  redirect: { name: 'spark-task' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'report', name: `${pre}report`, component: () => import('@/pages/spark/report/index'), meta: { ...meta, title: 'Spark检测报告' } },
  ])('spark-')
}
