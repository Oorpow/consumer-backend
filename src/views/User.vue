<template>
	<div class="manage">
		<el-dialog
			:title="`${modalType === 0 ? '新增' : '更新'}用户`"
			:visible.sync="dialogVisible"
			width="40%"
		>
			<el-form
				:model="form"
				:rules="rules"
				ref="userForm"
				label-width="100px"
			>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="phone">
					<el-input v-model.number="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="form.sex" placeholder="请选择性别">
						<el-option
							v-for="item in sexList"
							:key="item.id"
							:value="item.id"
							:label="item.label"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="form.age"></el-input>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<el-input v-model="form.birthday"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm"
						>{{ modalType === 0 ? '立即创建' : '完成编辑' }}</el-button
					>
					<el-button @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
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
				<template #sex="{ rowData }">
					<!-- 性别插槽 -->
					<span>{{ rowData.sex === 1 ? '男' : '女' }}</span>
				</template>
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
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import { formatTimeToDate } from '@/utils/formatTimeStamp'

export default {
	components: { CustomTable },
	data() {
		let phoneValid = function (rule, value, callback) {
			let reg =
				/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
			if (!value) {
				callback(new Error('手机号不能为空'))
			} else {
				if (!reg.test(value)) {
					callback(new Error('手机格式不正确'))
				}
			}
			callback()
		}
		return {
			dialogVisible: false,
			form: {
				name: '',
				phone: '',
				age: '',
				sex: 0,
				birthday: '',
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
					slotName: 'sex',
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
					slotName: 'date',
				},
			],
			sexList: [
				{ id: 1, label: '男' },
				{ id: 2, label: '女' },
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
			this.$store.dispatch('getUserList', {
				pagenum: this.pageNum,
				pagesize: this.pageSize
			})
		},
		// 新增
		handlerNew() {
			this.dialogVisible = true
			this.modalType = 0
			// 清空验证
			this.$nextTick().then(() => {
				this.$refs.userForm.clearValidate()
			})
			// 清空表单
			this.form = Object.assign({}, this.form, {
				name: '',
				phone: '',
				age: '',
				sex: '',
				birthday: '',
			})
		},
		// 编辑
		handleEdit(row) {
			this.dialogVisible = true
			this.modalType = 1
			this.form = Object.assign({}, this.form, row)
			// 删除金额字段
			this.$delete(this.form, 'money')
		},
		handleDelete({ phone }) {
			this.$store.dispatch('deleteUser', phone)
		},
		// 提交
		submitForm() {
			this.$refs.userForm.validate((valid) => {
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
				} else {
					return false
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
		},
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
