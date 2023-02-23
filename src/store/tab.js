import { handlerData }  from '@/utils/handle'

export default {
    state: {
        isCollapse: false,  // 控制侧边栏菜单的展开和收起
        tabList: [  // 标签
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        menuData: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: "UserManage/UserManage",
            },
            {
                path: "/consumer",
                name: "consumer",
                label: "消费",
                icon: "video-play",
                url: "Consumer/Consumer",
            },
            {
                path: "/operation",
                name: "operation",
                label: "操作",
                icon: "video-play",
                url: "Operation/Operation",
            },
        ],
    },
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 修改标签页数据
        selectTag(state, val) {
            const index = state.tabList.findIndex(item => item.name == val)
            // 如果不存在
            if (index === -1) {
                const i = handlerData(state.menuData, val)
                if (val == 'home') {
                    state.tabList.unshift(i)
                } else {
                    state.tabList.push(i)
                }
            }
        },
        // 关闭标签
        closeMenu(state, index) {
            state.tabList.splice(index, 1)
        }
    }
}