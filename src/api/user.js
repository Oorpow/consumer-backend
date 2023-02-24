import { HTTP_METHOD } from '@/constants'
import http from '@/utils/request'

export const getUserListByPage = (pagenum, pagesize) => http({
    method: HTTP_METHOD.GET,
    url: `/user/getUser/${pagenum}/${pagesize}`
})

export const createUserByForm = (form) => http({
    method: HTTP_METHOD.POST,
    url: '/user/add',
    data: form
})

export const updateUserByForm = (form) => http({
    method: HTTP_METHOD.POST,    
    url: '/user/update',
    data: form
})

export const deleteUserByPhone = (phone) => http({
    method: HTTP_METHOD.DELETE,
    url: '/user/delete',
    data: {
        phone
    }
})