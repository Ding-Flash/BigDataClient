import request from "@/plugin/axios"

export function getBigRootStraggler(data){
    return request({
        url: '/bigroot/getstraggler',
        method: 'GET',
        params: data
    })
}

export function getbTaskList() {
    return request({
        url: "/bigroot/gettasklist",
        method: 'GET'
    })
}