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
			<el-form
				:inline="true"
				:model="formInline"
				class="demo-form-inline"
			>
				<el-form-item label="用户手机号">
					<el-input
						v-model="formInline.phone"
					></el-input>
				</el-form-item>
				<el-form-item label="充值金额">
					<el-input
						v-model="formInline.recharge"
					></el-input>
				</el-form-item>
				<el-form-item label="消费金额">
					<el-input
						v-model="formInline.consume"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleRecharge">充值</el-button>
					<el-button type="primary" @click="handleConsume">消费</el-button>
					<el-button type="primary" @click="handleSearchConsumeRecord">查询消费记录</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<!-- 消费记录 -->
		<custom-table :table-data="userConsumerList" :columnList="columnList" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomTable from '@/components/CustomTable/CustomTable.vue'

export default {
	name: 'Operation',
	components: {
		CustomTable,
	},
	data() {
		return {
			columnList: [
				{ column: 'id', label: 'id' },
				{ column: 'name', label: '姓名' },
				{ column: 'phone', label: '联系方式' },
				{ column: 'money', label: '消费金额' },
				{ column: 'consumerDate', label: '消费日期' },
			],
			formInline: {
				phone: '',
				recharge: '',
				consume: ''
			}
		}
	},
	computed: {
		...mapActions(['rechargeMoney', 'consumeMoney', 'getUserConsumerList']),
		...mapGetters(['userConsumerListTotal', 'userConsumerList'])
	},
	mounted() {
		console.log(this.$store.getters.userConsumerList);
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
				phone: this.formInline.phone
			})
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
