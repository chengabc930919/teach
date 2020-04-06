import request from '@/utils/request'
export function getmock(data) {
    return request({
        url: "http://localhost:8080/mock",
        method: "post",
        data
    });
}
export function getaxios(data) {
    return request({
        url: "http://localhost:8080/exam/axios",
        method: "post",
        data
    });
}