import request from "@/plugin/axios"

export function getCallTree(data) {
    return request({
        url: '/hdfs/getcalltree',
        method: 'GET',
        params: data
    })
}

export function getFuncFeature(data) {
    return request({
        url: '/hdfs/getfuncfeature',
        method: 'GET',
        params: data
    })
}

export function getTimeLine(data) {
    return request({
        url: '/hdfs/gettimeline',
        method: 'GET',
        params: data
    })
}

export function createTask(data) {
    return request({
        url: '/hdfs/createtask',
        method: 'GET',
        params: data
    })
}

export function getTaskList() {
    return request({
        url:"/hdfs/gettasklist",
        method: "GET"
    })
}

export function refreshBenchStatus(data) {
    return request({
        url: "/hdfs/refresh",
        method: "GET",
        params: data
    })
}

export function deleteTask(data) {
    return request({
        url: "/hdfs/delete",
        method: "GET",
        params: data
    })
}

export function getTraceDetail(data) {
    return request({
        url: "/hdfs/gettracedetail",
        method: "GET",
        params: data
    })
}