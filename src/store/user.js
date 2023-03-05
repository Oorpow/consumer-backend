import { createUserByForm, deleteUserByPhone, getUserListByPage, updateUserByForm } from '@/api/user'
import { notifyMessage } from '@/utils/notifyMessage'
import { RES_STATUS, RES_CODE } from '@/constants'

export default {
    state: {
        total: 0,
        userList: []
    },
    mutations: {
        setUserList(state, { allCount, userList }) {
            state.total = allCount
            state.userList.length = 0
            userList && state.userList.push(...userList)
        }
    },
    actions: {
        async getUserList({ commit }, { pagenum = 1, pagesize = 5 }) {
            const res = await getUserListByPage(pagenum, pagesize)
            commit('setUserList',{
                allCount:  res.data.allCount,
                userList: res.data.data
            })
        },
        async createUser({ dispatch }, form) {
            console.log(form)
            const res = await createUserByForm(form)
            if (res.data.code === RES_CODE.OK) {
                dispatch('getUserList', {
                    pagenum: 1,
                    pagesize: 5
                })
                notifyMessage(RES_STATUS.SUCCESS, res.data.msg)
            } else {
                notifyMessage(RES_STATUS.ERROR, res.data.msg)
            }
        },
        async updateUser({ dispatch }, form) {
            const res = await updateUserByForm(form)
            if (res.data.code === RES_CODE.OK) {
                dispatch('getUserList', {
                    pagenum: 1,
                    pagesize: 5
                })
                notifyMessage(RES_STATUS.SUCCESS, res.data.data)
            } else {
                notifyMessage(RES_STATUS.ERROR, res.data.data)
            }
        },
        async deleteUser({ dispatch }, phone) {
            const res = await deleteUserByPhone(phone)
            if (res.data.code === RES_CODE.OK) {
                dispatch('getUserList', {
                    pagenum: 1,
                    pagesize: 5
                })
                notifyMessage(RES_STATUS.SUCCESS, res.data.msg)
            } else {
                notifyMessage(RES_STATUS.ERROR, res.data.msg)
            }
        }
    },
    getters: {
        userList(state) {
            return state.userList
        },
        getTotal(state) {
            return state.total
        }
    }
}