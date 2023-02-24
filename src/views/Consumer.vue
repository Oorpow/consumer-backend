<template>
	<div>
		<div>
			<div class="search">
				<el-date-picker
					v-model="timeRange"
					type="datetimerange"
					:picker-options="pickerOptions"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="handleTimePick"
					align="right"
				>
				</el-date-picker>
				<div class="right-block">
					<el-input />
					<el-button type="primary" style="margin-left: 10px"
						>搜索</el-button
					>
				</div>
			</div>
		</div>
		<custom-table
			:tableData="consumerList"
			:columnList="columnList"
			:showOperationColumn="false"
		></custom-table>
		<div class="pagination-container">
			<el-pagination
				background
				layout="total, sizes, prev, pager, next"
				:page-size="pageSize"
				:page-sizes="[5, 10]"
				:total="100"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomTable from '@/components/CustomTable/CustomTable.vue'

import { formatTimeStamp } from '@/utils/formatTimeStamp'

export default {
	name: 'Consumer',
	components: {
		CustomTable,
	},
	data() {
		return {
			timeRange: '',
			startTime: 0,
			endTime: 0,
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							)
							picker.$emit('pick', [start, end])
							console.log(123)
						},
					},
				],
			},
			columnList: [
				{ column: 'date', label: '日期' },
				{ column: 'name', label: '姓名' },
				{ column: 'address', label: '地址' },
			],
			pageSize: 5,
			pageNum: 1,
		}
	},
	mounted() {
		this.$store.dispatch('getConsumerList', {
			pageNum: this.pageNum,
			pageSize: this.pageSize,
			startTime: this.startTime,
			endTime: this.endTime,
		})
		console.log(this.$store.getters.consumerList)
	},
	computed: {
		...mapActions(['getConsumerList']),
		...mapGetters(['consumerList'])
	},
	methods: {
		handleEdit(row) {
			console.log(row)
		},
		handleTimePick() {
			const startTime = formatTimeStamp(this.timeRange[0])
			const endTime = formatTimeStamp(this.timeRange[1])
			this.startTime = startTime
			this.endTime = endTime
		},
		// 分页条数
		handleSizeChange(val) {
			this.pageSize = val
			this.$store.dispatch('getConsumerList', {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				startTime: this.startTime,
				endTime: this.endTime,
			})
		},
		// 页码切换
		handleCurrentChange(val) {
			this.pageNum = val
			this.$store.dispatch('getConsumerList', {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				startTime: this.startTime,
				endTime: this.endTime,
			})
		},
	},
}
</script>

<style lang="less" scoped>
.search {
	display: flex;
	justify-content: space-between;
	.right-block {
		display: flex;
	}
}
.pagination-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>
