import request from "@/plugin/axios"

export function getTaskTimeline(data) {
    return request({
        url: '/spark/timeline',
        method: 'GET',
        params: data
    })
}

export function getStraggler(data) {
    return request({
        url: '/spark/straggler',
        method: 'GET',
        params: data
    })
}

export  function getCartTree(data) {
    return request({
        url: '/spark/cart_tree',
        method: 'GET',
        params: data
    })
}

export function getsTaskList() {
    return request({
        url: '/spark/gettasklist',
        method: 'GET'
    })
}

export function deleteSparkTask(data) {
    return request({
        url: "/spark/delete",
        method: 'GET',
        params: data
    })
}