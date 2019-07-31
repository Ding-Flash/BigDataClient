import request from "@/plugin/axios"

export function getBigRootStraggler(data){
    return request({
        url: '/bigroot/getstraggler',
        method: 'GET',
        params: data
    })
}

export function getbTaskList(data) {
    return request({
        url: "/bigroot/gettasklist",
        method: 'GET',
        params: data
    })
}