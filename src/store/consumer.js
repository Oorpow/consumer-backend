import { fetchConsumerListByPage } from '@/api/consumer'

export default {
	state: {
		consumerList: [],
	},
	mutations: {
		setConsumerList(state, payload) {
			state.consumerList = payload
		},
	},
	actions: {
		async getConsumerList({ commit }, { pageNum, pageSize, startTime, endTime }) {
            const res = await fetchConsumerListByPage(pageNum, pageSize, startTime, endTime)
            console.log(pageNum, pageSize, startTime, endTime)
		},
	},
}
