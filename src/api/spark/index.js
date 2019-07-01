import request from "@/plugin/axios"

export function getTaskTimeline(data) {
    return request({
        url: '/spark/timeline',
        method: 'GET',
        params: data
    })
}
