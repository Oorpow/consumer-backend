import { fetchConsumerListByPage, fetchConsumerListOneWeek, fetchStatisticsData, fetchUserConsumerListByPage, fetchConsumerLists } from '@/api/consumer'
import Vue from 'vue'

export default {
	state: {
		consumerList: [],
		total: 0,
		userConsumerList: [],
		userConsumerListTotal: 0,
		chartData: {
			dateArr: [],
			moneyArr: [],
			countArr: []
		},
		totalRecord: {
			todaySum: 1,
		},
		consumerLists: [],
	},
	mutations: {
		setConsumerLists(state, list) {
			state.consumerLists.length = 0
			list && state.consumerLists.push(...list)
		},
		setConsumerList(state, { allCount, list}) {
			state.consumerList.length = 0
			state.total = allCount
			list && state.consumerList.push(...list)
		},
		// 个人消费记录
		setUserConsumerList(state, { allCount, list }) {
			state.userConsumerList.length = 0
			state.userConsumerListTotal = allCount
			list && state.userConsumerList.push(...list)
		},
		// 图表数据
		setChartData(state, payload) {
			const list = Object.entries(payload).sort()
			state.chartData.dateArr.length = 0
			state.chartData.moneyArr.length = 0
			state.chartData.countArr.length = 0

			list.forEach(item => {
				state.chartData.dateArr.push(item[0])
				state.chartData.moneyArr.push(item[1].money)
				state.chartData.countArr.push(item[1].count)
			})
		},
		setTotalRecord(state, payload) {
			Vue.set(state, 'totalRecord', payload)
		}
	},
	actions: {
		async getConsumerList({ commit }, { pageNum, pageSize, startTime, endTime }) {
            const res = await fetchConsumerListByPage(pageNum, pageSize, startTime, endTime)
			commit('setConsumerList', {
				allCount: res.data.allCount,
				list: res.data.data
			})
		},
		// 查询用户消费记录
		async getUserConsumerList({ commit }, {phone, pagenum = 1, pagesize = 5}) {
			const res = await fetchUserConsumerListByPage(phone, pagenum, pagesize)
			commit('setUserConsumerList', {
				allCount: res.data.allCount,
				list: res.data.data
			})
		},
		// 获取一周前的消费金额
		async getConsumerOneWeek({ commit }) {
			const res = await fetchConsumerListOneWeek()
			commit('setChartData', res.data.data)
		},
		// 获取统计记录
		async getStatisticsData({ commit }) {
			const res = await fetchStatisticsData()
			commit('setTotalRecord', res.data.data)
		},
		async getConsumerLists({ commit }) {
			const res = await fetchConsumerLists()
			commit('setConsumerLists', res.data.data)
		}
	},
	getters: {
		userConsumerList(state) {
			return state.userConsumerList
		},
		consumerList(state) {
			return state.consumerList
		},
		consumeListTotal(state) {
			return state.total
		},
		userConsumerListTotal: (state) => state.userConsumerListTotal,
		oneWeekData: (state) => state.chartData,
		totalRecordData: (state) => state.totalRecord,
		consumerLists(state) {
			return state.consumerLists
		}
	}
}
