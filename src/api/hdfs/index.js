import request from "@/plugin/axios"

export function getCallTree(data) {
    return request({
        url: '/getcalltree',
        method: 'GET',
        params: data
    })
}

export function getFuncFeature(data) {
    return request({
        url: '/getfuncfeature',
        method: 'GET',
        params: data
    })
}

export function getTimeLine(data) {
    return request({
        url: '/gettimeline',
        method: 'GET',
        params: data
    })
}