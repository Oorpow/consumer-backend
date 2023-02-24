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