import request from "@/plugin/axios"

export function getTaskOptStatus(data){
    return request({
        url: '/taskopt/getstatus',
        method: 'GET',
        params: data
    })
}

export function gettTaskOptList() {
    return request({
        url: "/taskopt/gettasklist",
        method: 'GET',
    })
}

export function deleteTaskOpt(data) {
    return request({
        url: "/taskopt/delete",
        method: 'GET',
        params: data
    })
}