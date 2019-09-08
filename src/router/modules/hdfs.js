import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/hdfs',
  name: 'hdfs',
  meta,
  redirect: { name: 'hdfs-task' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'task', name: `${pre}task`, component: () => import('@/pages/hdfs/task/index'), meta: { ...meta, title: '新建任务' } },
    { path: 'report', name: `${pre}report`, component: () => import('@/pages/hdfs/report/index'), meta: { ...meta, title: 'ASTracer检测报告' } },
  ])('hdfs-')
}
