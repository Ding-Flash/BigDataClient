import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/hdfs',
  name: 'hdfs',
  meta,
  redirect: { name: 'hdfs-hist' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'hist', name: `${pre}hist`, component: () => import('@/pages/hdfs/hist/index'), meta: { ...meta, title: '历史报告' } },
    { path: 'task', name: `${pre}task`, component: () => import('@/pages/hdfs/task/index'), meta: { ...meta, title: '新建任务' } },
    { path: 'report', name: `${pre}report`, component: () => import('@/pages/hdfs/report/index'), meta: { ...meta, title: 'performance analysis' } },
    { path: 'tree', name: `${pre}tree`, component: () => import('@/pages/hdfs/tree/index'), meta:{ ...meta, title:'函数调用关系'}}
  ])('hdfs-')
}
