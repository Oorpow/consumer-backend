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

// 充值赠送金额
export const fetchRechargeGiftMoney = (presentFill, presentGive) => http({
	method: HTTP_METHOD.POST,
	url: '/present/modify',
	data: {
		presentFill,
		presentGive
	}
})

// 获取一周前的消费金额
export const fetchConsumerListOneWeek = () => http.get('/consumerLog/getWeekDay')

// 获取统计记录
export const fetchStatisticsData = () => http.get('/consumerLog/statistics')

// 获取充值赠送金额
export const fetchPresentMoney = () => http.get('/present/money')