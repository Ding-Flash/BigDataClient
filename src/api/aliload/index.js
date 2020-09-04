import request from "@/plugin/axios"

export function getAliLoadStatus(data){
    return request({
        url: '/aliload/getstatus',
        method: 'GET',
        params: data
    })
}

export function getaTaskList() {
    return request({
        url: "/aliload/gettasklist",
        method: 'GET',
    })
}

export function deleteAliloadTask(data) {
    return request({
        url: "/aliload/delete",
        method: 'GET',
        params: data
    })
}