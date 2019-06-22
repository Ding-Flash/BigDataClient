// 菜单 顶栏
export default [
    {path: '/index', title: 'Home', icon: 'home'},
    {
        title: 'BigRoots',
        icon: 'flask',
        children: [
            {path: '', title: '新建任务', icon: 'tasks'},
            {path: '', title: '历史报告', icon: 'clock-o'},
        ]
    },
    {
        title: 'Spark',
        icon: 'bolt',
        children: [
            {path: '', title: '新建任务', icon: 'tasks'},
            {path: '', title: '历史报告', icon: 'clock-o'},
        ]
    },
    {
        title: 'HDFS',
        icon: 'database',
        children: [
            {path: '/hdfs/task', title: 'new task', icon: 'tasks'},
            {path: '/hdfs/hist', title: 'report history', icon: 'clock-o'},
            {path: '/hdfs/report', title: 'performance analysis', icon: 'bar-chart-o'},
            {path: '/hdfs/tree', title: 'call tree', icon: 'tree'}
        ]
    }
]
