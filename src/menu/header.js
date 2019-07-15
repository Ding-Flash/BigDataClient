// 菜单 顶栏
export default [
    { path: '/index', title: 'Home', icon: 'home'},
    { path: '/history', title: '任务清单', icon: 'history'},
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
            {path: '/spark/task', title: '新建Spark分析任务', icon: 'tasks'},
            {path: '/spark/report', title: 'Straggler检测报告', icon: 'clock-o'},
        ]
    },
    {
        title: 'ASTracer',
        icon: 'database',
        children: [
            {path: '/hdfs/task', title: "新建任务", icon: 'tasks'},
            {path: '/hdfs/report', title: "性能分析", icon: 'bar-chart-o'},
        ]
    }
]
