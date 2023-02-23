<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="less">
html, body, h3, p {
  margin: 0;
  padding: 0;     
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
  @scroll-bar-thumb();
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
  @scroll-bar-track();
}
</style>
