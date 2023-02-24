import { fetchRechargeMoney } from "@/api/recharge"

export default {
    state: {},
    mutations: {},
    actions: {
        async rechargeMoney({ commit }, { phone, recharge }) {
            const res = await fetchRechargeMoney(phone, recharge)
            console.log(res)
        }
    }
}