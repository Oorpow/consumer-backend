import http from '@/utils/request'
import { HTTP_METHOD } from '@/constants/index'

const startTimeIsNotNull = (start, end) => start !== 0 && end !== 0

export const fetchConsumerListByPage = (
	pagenum,
	pagesize,
	startTime,
	endTime
) =>
	http({
        method: HTTP_METHOD.POST,
		url: startTimeIsNotNull(startTime, endTime)
			? `/consumerLog/getConsumer/${pagenum}/${pagesize}/${startTime}/${endTime}`
			: `/consumerLog/getConsumer/${pagenum}/${pagesize}`,
        data: {}
	})

export const fetchUserConsumerListByPage = (phone, pagenum, pagesize) => http({
	method: HTTP_METHOD.POST,
	url: `/consumerLog/getConsumer/${pagenum}/${pagesize}`,
	data: {
		phone
	}
})
