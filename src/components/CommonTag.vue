<template>
    <div class="tags">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.name"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="selectMenu(item)"
            @close="closeMenu(item, index)"
            size="small"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            tags: (state) => state.tab.tabList,
        }),
    },
    mounted() {
        
    },
    methods: {
        selectMenu(item) {
            this.$router.push({name: item.name})
        },
        closeMenu(item, index) {
            if(item.name == this.$route.name) {
                this.$router.push({name: this.tags[index - 1].name})
            }
            this.$store.commit('closeMenu', index)
        }
    }
};
</script>

<style lang="less" scoped>
.tags{
    display: flex;
    margin-bottom: 20px;
    .el-tag {
        cursor: pointer;
        margin-right: 10px;
    }

}
</style>