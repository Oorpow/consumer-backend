import { HTTP_METHOD } from '@/constants'
import http from '@/utils/request'

export const fetchRechargeMoney = (phone, money) => http({
    method: HTTP_METHOD.POST,
    url: '/user/fillMoney',
    data: {
        phone,
        money
    }
})

export const fetchConsumeMoney = (phone, money) => http({
    method: HTTP_METHOD.POST,
    url: '/user/consumer',
    data: {
        phone,
        money
    }
})