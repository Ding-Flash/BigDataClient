// 菜单 顶栏
export default [
    { path: '/index', title: 'Home', icon: 'home'},
    { path: '/history', title: '任务清单', icon: 'history'},
    {
        title: 'BigRoots',
        icon: 'flask',
        children: [
            // {path: '/bigroot/task', title: '新建任务', icon: 'tasks'},
            {path: '/bigroot/report', title: 'BigRoot检测报告', icon: 'clock-o'},
        ]
    },
    {
        title: 'Spark',
        icon: 'bolt',
        children: [
            // {path: '/spark/task', title: '新建Spark分析任务', icon: 'tasks'},
            {path: '/spark/report', title: 'Spark检测报告', icon: 'clock-o'},
        ]
    },
    {
        title: 'ASTracer',
        icon: 'database',
        children: [
            // {path: '/hdfs/task', title: "新建任务", icon: 'tasks'},
            {path: '/hdfs/report', title: "ASTracer检测报告", icon: 'bar-chart-o'},
        ]
    },
    { path: '/aliload', title: '负载生成', icon: 'spinner'}
]
