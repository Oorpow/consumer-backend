import http from '@/utils/request'

export const fetchConsumerListByPage = (pagenum, pagesize, startTime, endTime) => http({
    url: `/consumerLog/getConsumer/${pagenum}/${pagesize}/${startTime}/${endTime}`
})