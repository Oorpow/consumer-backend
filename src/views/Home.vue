<template>
	<div>
		<el-row>
			<el-col :span="8">
				<el-card class="box-card">
					<div class="user">
						<img src="@/assets/logo.png" alt="" />
						<div class="user-info">
							<p class="name">Admin</p>
							<p class="access">超级管理员</p>
						</div>
					</div>
					<div class="login-info">
						<p>上次登录时间: <span>2021-07-09</span></p>
						<p>上次登录地点: <span>广东</span></p>
					</div>
				</el-card>

				<el-card style="margin-top: 20px; padding-left: 10px">
					<el-table
						:data="tableData"
						style="width: 100%"
						height="265"
						class="table"
					>
						<el-table-column
							v-for="(val, key) in tableLabel"
							:key="key"
							:prop="key"
							:label="val"
						>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="16">
				<div class="num">
					<el-card
						v-for="item in countData"
						:key="item.name"
						:body-style="{ display: 'flex', padding: 0 }"
					>
						<i
							class="icon"
							:class="`el-icon-${item.icon}`"
							:style="{ backgroundColor: item.color }"
						></i>
						<div class="detail">
							<p class="price">{{ item.value }}</p>
							<p class="desc">{{ item.name }}</p>
						</div>
					</el-card>
				</div>
				<div></div>
			</el-col>
			<el-col :span="16">
				<v-chart class="chart" :option="option" />
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { fetchStatisticsData } from '@/api/consumer'

use([
	CanvasRenderer,
	BarChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
])

export default {
	name: 'Home',
	components: {
		VChart,
	},
	data() {
		return {
			tableData: [
				{
					name: 'oppo',
					phone: 12345678910,
					money: 300,
					consumerDate: 800,
				},
				{
					name: '小米',
					phone: 100,
					money: 300,
					consumerDate: 800,
				},
				{
					name: '华为',
					phone: 100,
					money: 300,
					consumerDate: 800,
				},
				{
					name: 'vivo',
					phone: 100,
					money: 300,
					consumerDate: 800,
				},
				{
					name: '苹果',
					phone: 100,
					money: 300,
					consumerDate: 800,
				},
			],
			tableLabel: {
				name: '姓名',
				phone: '手机号码',
				money: '金额',
				consumerDate: '消费时间',
			},
			countData: [
				{
					name: '今日消费数量',
					value: undefined,
					icon: 'success',
					color: '#2ec7c9',
					label: 'todaySum'
				},
				{
					name: '今月消费数量',
					value: this.$store.getters.totalRecordData.monthSum,
					icon: 'star-on',
					color: '#2ec7c9',
					label: 'monthSum'
				},
				{
					name: '今年消费数量',
					value: this.$store.getters.totalRecordData.yearSum,
					icon: 's-goods',
					color: '#2ec7c9',
					label: 'yearSum'
				},
				{
					name: '今日消费金额',
					value: this.$store.getters.totalRecordData.todayMoney,
					icon: 'success',
					color: '#2ec7c9',
					label: 'todayMoney'
				},
				{
					name: '今月消费金额',
					value: this.$store.getters.totalRecordData.monthMoney,
					icon: 'star-on',
					color: '#2ec7c9',
					label: 'monthMoney'
				},
				{
					name: '今年消费金额',
					value: this.$store.getters.totalRecordData.yearMoney,
					icon: 's-goods',
					color: '#2ec7c9',
					label: 'yearMoney'
				},
			],
			// 图表配置项
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: this.$store.getters.oneWeekData.dateArr,
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: '金额',
						type: 'bar',
						emphasis: {
							focus: 'series',
						},
						data: this.$store.getters.oneWeekData.moneyArr,
					},
					{
						name: '销量',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series',
						},
						data: this.$store.getters.oneWeekData.countArr,
					},
				],
			},
		}
	},
	computed: {
		...mapActions(['getConsumerOneWeek']),
		...mapGetters(['oneWeekData', 'totalRecordData']),
	},
	created() {
		this.$store.dispatch('getConsumerOneWeek')
		this.getRecordData()
	},
	methods: {
		async getRecordData() {
			const res = await fetchStatisticsData()
			this.countData.forEach((item) => {
				item.value = res.data.data[item.label]
			})
			console.log(this.countData)
			// this.$set(this, 'recordData', res.data.data)
			// console.log(this.recordData)
		}
	}
}
</script>

<style lang="less" scoped>
.user {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: #999 1px solid;
	img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		margin-right: 25px;
	}
	.user-info {
		.name {
			font-size: 32px;
			margin-bottom: 10px;
		}
		.access {
			color: #999;
		}
	}
}
.login-info {
	margin-top: 10px;
	p {
		line-height: 28px;
		font-size: 14px;
		color: #999;
		span {
			margin-left: 60px;
			color: #666;
		}
	}
}

.table {
	/deep/ .el-table__body-wrapper::-webkit-scrollbar {
		width: 5px; /*滚动条宽度*/
	}
	/*定义滚动条轨道 内阴影+圆角*/
	/deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
		// box-shadow: 0px 1px 3px #fff inset; /*滚动条的背景区域的内阴影*/
		border-radius: 10px; /*滚动条的背景区域的圆角*/
		background-color: #fff; /*滚动条的背景颜色*/
	}
	/*定义滑块 内阴影+圆角*/
	/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
		// box-shadow: 0px 1px 3px #ccc inset; /*滚动条的内阴影*/
		border-radius: 10px; /*滚动条的圆角*/
		background-color: #ccc; /*滚动条的背景颜色*/
	}
}

.num {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.icon {
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 30px;
		color: #fff;
	}
	.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 15px;
		.price {
			font-size: 30px;
			margin-bottom: 10px;
			line-height: 30px;
			height: 30px;
		}
		.desc {
			font-size: 14px;
			text-align: center;
			color: #999;
		}
	}
	.el-card {
		width: 32%;
		margin-bottom: 20px;
	}
}

.chart {
	height: 400px;
}
</style>
