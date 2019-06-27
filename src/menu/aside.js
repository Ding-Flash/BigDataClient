// 菜单 侧边栏
export default [
  { path: '/index', title: 'Home', icon: 'home' },
  {
    title: 'BigRoots',
    icon: 'flask',
    children: [
      { path: '', title: '新建任务', icon: 'tasks'},
      { path: '', title: '历史报告', icon: 'clock-o' },
    ]
  },
  {
    title: 'Spark',
    icon: 'bolt',
    children: [
      { path: '', title: '新建任务', icon: 'tasks'},
      { path: '', title: '历史报告', icon: 'clock-o' },
    ]
  },
  {
    title: 'HDFS',
    icon: 'database',
    children: [
      { path: '/hdfs/task', title: "新建任务", icon: 'tasks'},
      { path: '/hdfs/report', title: "性能分析", icon: 'bar-chart-o'},
    ]
  }
]
