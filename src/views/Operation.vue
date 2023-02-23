<template>
	<div>
		<!-- 第一行 -->
		<el-card>
			<el-row type="flex" justify="space-between">
				<el-col :span="5">
					<div class="input-block">
						<span>充值金额</span>
						<el-input style="width: 100px" />
					</div>
				</el-col>
				<el-col :span="5">
					<div class="input-block">
						<span>赠送金额</span>
						<el-input style="width: 100px" />
					</div>
				</el-col>
				<el-col :span="1">
					<el-button>操作</el-button>
				</el-col>
			</el-row>
		</el-card>

		<!-- 第二行 -->
		<el-card style="margin: 20px 0">
			<el-row type="flex">
				<el-col>
					<span>用户名: xx</span>
				</el-col>
				<el-col>
					<div class="input-block">
						<span>用户充值</span>
						<el-input style="width: 100px" />
					</div>
				</el-col>
				<el-col>
					<div class="input-block">
						<span>用户消费</span>
						<el-input style="width: 100px" />
					</div>
				</el-col>
				<el-col :span="1">
					<el-button>操作</el-button>
				</el-col>
			</el-row>
		</el-card>

		<!-- 消费记录 -->
		<custom-table :table-data="tableData" :columnList="columnList" />
	</div>
</template>

<script>
import CustomTable from '@/components/CustomTable/CustomTable.vue'
export default {
	name: 'Operation',
	components: {
		CustomTable
	},
	data() {
		return {
			tableData: [
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
			],
			columnList: [
				{ column: 'date', label: '日期' },
				{ column: 'name', label: '姓名' },
				{ column: 'address', label: '地址' },
			]
		}
	},
}
</script>

<style lang="less" scoped>
.input-block {
	@rowFlex();
	span {
		margin-right: 5px;
	}
}
</style>
