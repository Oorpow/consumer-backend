import { fetchConsumerListByPage, fetchUserConsumerListByPage } from '@/api/consumer'

export default {
	state: {
		consumerList: [],
		total: 0,
		userConsumerList: [],
		userConsumerListTotal: 0
	},
	mutations: {
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
		userConsumerListTotal: (state) => state.userConsumerListTotal
	}
}
