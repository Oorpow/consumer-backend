<template>
	<div>
		<!-- 第一行 -->
		<el-card>
			<el-form
				:inline="true"
				:model="formPromotion"
				class="demo-form-inline"
			>
				<el-form-item label="充值金额">
					<el-input v-model="formPromotion.recharge"></el-input>
				</el-form-item>
				<el-form-item label="赠送金额">
					<el-input v-model="formPromotion.giftMoney"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleGiftMoney"
						>确定</el-button
					>
				</el-form-item>
			</el-form>
		</el-card>

		<!-- 第二行 -->
		<el-card style="margin: 20px 0">
			<el-form
				:inline="true"
				:model="formInline"
				class="demo-form-inline"
			>
				<el-form-item label="用户手机号">
					<el-input v-model="formInline.phone"></el-input>
				</el-form-item>
				<el-form-item label="充值金额">
					<el-input v-model="formInline.recharge"></el-input>
				</el-form-item>
				<el-form-item label="消费金额">
					<el-input v-model="formInline.consume"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :disabled="select" @click="handleRecharge"
						>充值</el-button
					>
					<el-button type="primary" :disabled="select" @click="handleConsume"
						>消费</el-button
					>
					<el-button type="primary" :disabled="select" @click="handleSearchConsumeRecord"
						>查询消费记录</el-button
					>
				</el-form-item>
			</el-form>
		</el-card>

		<!-- 消费记录 -->
		<custom-table :table-data="userConsumerList" :prop-list="propList">
			<template #date="{ rowData }">
				<span>{{ formatTimeToDate(rowData.consumerDate) }}</span>
			</template>
		</custom-table>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions, mapGetters } from 'vuex'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import { fetchPresentMoney } from '@/api/consumer'
import { formatTimeToDate } from '@/utils/formatTimeStamp'

export default {
	name: 'Operation',
	components: {
		CustomTable,
	},
	data() {
		return {
			propList: [
				{ prop: 'id', label: 'id' },
				{ prop: 'name', label: '姓名' },
				{ prop: 'phone', label: '联系方式' },
				{ prop: 'money', label: '消费金额' },
				{ prop: 'consumerDate', label: '消费日期', slotName: 'date' },
			],
			formPromotion: {
				recharge: '',
				giftMoney: '',
			},
			formInline: {
				phone: '',
				recharge: '',
				consume: '',
			},
			presentFill: 0,
			presentGive: 0
		}
	},
	computed: {
		...mapActions([
			'rechargeMoney',
			'consumeMoney',
			'getUserConsumerList',
			'rechargeMoneyAndGetGift',
		]),
		...mapGetters(['userConsumerListTotal', 'userConsumerList']),
		select() {
			return !(this.formInline.phone.length == 11)
		}
	},
	created() {
		this.queryPresentMoney()
	},
	methods: {
		// 充值
		handleRecharge() {
			this.$store.dispatch('rechargeMoney', this.formInline)
			this.formInline = {}
		},
		// 消费
		handleConsume() {
			this.$store.dispatch('consumeMoney', this.formInline)
		},
		// 查询个人消费记录
		handleSearchConsumeRecord() {
			this.$store.dispatch('getUserConsumerList', {
				phone: this.formInline.phone,
			})
		},
		// 充值赠送金额
		handleGiftMoney() {
			this.$store.dispatch('rechargeMoneyAndGetGift', this.formPromotion)
		},
		// 查询赠送的金额
		async queryPresentMoney() {
			const res = await fetchPresentMoney()
			this.formPromotion.recharge = res.data.data.presentFill
			this.formPromotion.giftMoney = res.data.data.presentGive
		},
		formatTimeToDate(date) {
			return dayjs(date).format('YYYY/MM/DD')
		}
	}
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
