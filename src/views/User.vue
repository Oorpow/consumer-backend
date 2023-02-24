<template>
	<div class="manage">
		<el-dialog
			:title="`${modalType === 0 ? '新增' : '更新'}用户`"
			:visible.sync="dialogVisible"
			width="40%"
		>
			<!-- 用户的表单信息 -->
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-row>
					<el-col :span="20">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20">
						<el-form-item label="年龄" prop="age">
							<el-input v-model.number="form.age"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20">
						<el-form-item label="手机号码" prop="phone">
							<el-input v-model.number="form.phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20">
						<el-form-item label="性别" prop="age">
							<el-select
								v-model="form.sex"
								placeholder="请选择性别"
							>
								<el-option label="男" :value="1"></el-option>
								<el-option label="女" :value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20">
						<el-form-item label="出生日期" prop="birthday">
							<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="form.birthday"
								style="width: 100%"
								value-format="yyyy-MM-dd"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="btn">
				<el-button type="success" @click="resetForm"> 重置 </el-button>
				<div>
					<el-button type="primary" @click="onSubmit">确定</el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</div>
			</div>
		</el-dialog>

		<div class="manage-header">
			<el-button @click="handlerNew" type="primary"> + 新增 </el-button>
			<div class="search">
				<el-input ref="seacher" v-model="seacher"></el-input>
				<el-button type="primary">搜索</el-button>
			</div>
		</div>

		<div class="common-tabel">
			<CustomTable
				:table-data="userList"
				:prop-list="propList"
				:show-operation-column="true"
			>
				<template #date="{ rowData }">
					<span>{{ formatTimeToDate(rowData.registerDate) }}</span>
				</template>
				<template #operation="{ rowData }">
					<el-button size="mini" @click="handleEdit(rowData)"
						>编辑</el-button
					>
					<el-popconfirm
						title="确定删除吗？"
						@confirm="handleDelete(rowData)"
					>
						<el-button slot="reference" size="mini" type="danger"
							>删除</el-button
						>
					</el-popconfirm>
				</template>
			</CustomTable>
		</div>

		<div class="pagination-container">
			<el-pagination
				background
				layout="total, sizes, prev, pager, next"
				:page-size="pageSize"
				:page-sizes="[5, 10]"
				:total="getTotal"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import { mapActions, mapGetters } from 'vuex'
import { formatTimeToDate } from '@/utils/formatTimeStamp'
import dayjs from 'dayjs'

export default {
	components: { CustomTable },
	data() {
		let phoneValid = function (rule, value, callback) {
			let re =
				/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
			if (!Number.isInteger(value) || !re.test(value)) {
				callback(new Error('手机格式不正确'))
			}
			callback()
		}
		return {
			dialogVisible: false,
			form: {
				name: '',
				phone: '',
				age: '',
				sex: '',
				brithday: '',
			},
			rules: {
				name: [{ required: true, message: '请输入姓名' }],
				phone: [
					{ required: true, message: '请输入手机号' },
					{ validator: phoneValid },
				],
				sex: [{ required: true, message: '请选择性别' }],
			},
			propList: [
				{
					prop: 'id',
					label: 'id',
				},
				{
					prop: 'name',
					label: '姓名',
				},
				{
					prop: 'phone',
					label: '联系方式',
				},
				{
					prop: 'sex',
					label: '性别',
				},
				{
					prop: 'age',
					label: '年龄',
				},
				{
					prop: 'birthday',
					label: '生日',
				},
				{
					prop: 'money',
					label: '金额',
				},
				{
					prop: 'registerDate',
					label: '注册日期',
					slotName: 'date'
				},
			],
			modalType: 0,
			seacher: '',
			pageSize: 5,
			pageNum: 1,
		}
	},
	mounted() {
		this.getList()
	},
	computed: {
		...mapActions([
			'getUserList',
			'createUser',
			'updateUser',
			'deleteUser',
		]),
		...mapGetters(['userList', 'getTotal']),
	},
	methods: {
		getList() {
			this.$store.dispatch('getUserList')
		},
		// 新增
		handlerNew() {
			this.dialogVisible = true
			this.modalType = 0
		},
		// 编辑
		handleEdit(row) {
			this.dialogVisible = true
			this.modalType = 1
			this.form = Object.assign({}, this.form, row)
		},
		handleDelete({ phone }) {
			this.$store.dispatch('deleteUser', phone)
		},
		// 提交
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					if (this.modalType === 0) {
						// 新增
						this.$store.dispatch('createUser', this.form)
					} else {
						this.$store.dispatch('updateUser', this.form)
					}
					// 清除表单数据
					this.resetForm()
					this.dialogVisible = false
				}
			})
		},
		resetForm() {
			this.form = {}
		},
		// 分页条数
		handleSizeChange(val) {
			this.pageSize = val
			this.$store.dispatch('getUserList', this.pageNum, this.pageSize)
		},
		// 页码切换
		handleCurrentChange(val) {
			this.pageNum = val
			this.$store.dispatch('getUserList', this.pageNum, this.pageSize)
		},
		formatTimeToDate(date) {
			return dayjs(date).format('YYYY/MM/DD')
		}
	},
}
</script>

<style lang="less" scoped>
.manage {
	height: 90%;
	.btn {
		display: flex;
		justify-content: space-between;
	}
	.manage-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		.search {
			display: flex;
			.el-input {
				padding-right: 10px;
			}
		}
	}
	.common-tabel {
		position: relative;
		height: calc(100% - 62px);
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
		.pagin {
			position: absolute;
			bottom: 0px;
			right: 20px;
		}
	}
}
.pagination-container {
	display: flex;
	justify-content: center;
}
</style>
