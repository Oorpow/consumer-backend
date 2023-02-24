import { fetchRechargeGiftMoney } from "@/api/consumer"
import { fetchConsumeMoney, fetchRechargeMoney } from "@/api/recharge"
import { RES_CODE, RES_STATUS } from "@/constants"
import { notifyMessage } from "@/utils/notifyMessage"

export default {
    state: {},
    mutations: {},
    actions: {
        async rechargeMoney({ commit }, { phone, recharge }) {
            const res = await fetchRechargeMoney(phone, recharge)
            if (res.data.code === RES_CODE.OK) {
                notifyMessage(RES_STATUS.SUCCESS, res.data.data)
            } else {
                notifyMessage(RES_STATUS.ERROR, res.data.data)
            }
        },
        async consumeMoney({ commit }, { phone, consume }) {
            const res = await fetchConsumeMoney(phone, consume)
            if (res.data.code === RES_CODE.OK) {
                notifyMessage(RES_STATUS.SUCCESS, res.data.data)
            } else {
                notifyMessage(RES_STATUS.ERROR, res.data.data)
            }
        },
        // 充值赠送
        async rechargeMoneyAndGetGift({ commit }, { recharge, giftMoney }) {
            const res = await fetchRechargeGiftMoney(recharge, giftMoney)

            if (res.data.code === RES_CODE.OK) {
                notifyMessage(RES_STATUS.SUCCESS, res.data.data)
            } else {
                notifyMessage(RES_STATUS.ERROR, res.data.data)
            }
        }
    }
}