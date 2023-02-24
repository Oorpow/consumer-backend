import { fetchConsumerListByPage } from '@/api/consumer'

export default {
	state: {
		consumerList: [],
	},
	mutations: {
		setConsumerList(state, list) {
			state.consumerList.length = 0
			list && state.consumerList.push(...list)
		},
	},
	actions: {
		async getConsumerList({ commit }, { pageNum, pageSize, startTime, endTime }) {
            const res = await fetchConsumerListByPage(pageNum, pageSize, startTime, endTime)
			commit('setConsumerList', res.data.data)
		},
	},
	getters: {
		consumerList(state) {
			return state.consumerList
		}
	}
}
