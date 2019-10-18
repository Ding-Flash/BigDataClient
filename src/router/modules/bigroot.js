import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/bigroot',
  name: 'bigroot',
  meta,
  redirect: { name: 'bigroot-task' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'report', name: `${pre}report`, component: () => import('@/pages/bigroot/report/index'), meta: { ...meta, title: 'BigRoot检测报告' } },
  ])('bigroot-')
}
