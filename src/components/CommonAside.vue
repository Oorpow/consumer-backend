<template>
    <el-menu
        :default-active="$route.name"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="selectMenu"
    >
        <h3>{{ !isCollapse ? '通用后台管理系统' : '后台' }}</h3>
        <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" :route="subItem.path">
                <el-menu-item :index="subItem.name">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        selectMenu(index) {
            this.$store.commit('selectTag', index)
        }
    },
    computed: {
        menuData() {
            return store.state.tab.menuData
        },
        // 没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children )
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
    }
};
</script>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: none;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>