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
                <el-button type="success" @click="restFromDate">
                    重置
                </el-button>
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
            <el-table
                :data="tableData"
                style="width: 100%"
                height="90%"
                class="table"
                stripe
            >
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="birthday"
                    label="出生年月"
                ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handlerEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            @click="handlerDel(scope.row)"
                            type="danger"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagin">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, updateUser, delUser } from "@/api"

export default {
    data() {
        var phoneValid = function (rule, value, callback) {
            let re =
                /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
            if (!Number.isInteger(value) || !re.test(value)) {
                callback(new Error("手机格式不正确"));
            }
            callback();
        };

        return {
            dialogVisible: false,
            form: {
                name: "",
                phone: "",
                age: "",
                sex: "",
                brithday: "",
            },
            rules: {
                name: [{ required: true, message: "请输入姓名" }],
                phone: [
                    { required: true, message: "请输入手机号" },
                    { validator: phoneValid },
                ],
                sex: [{ required: true, message: "请选择性别" }],
            },
            tableData: [
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
                {
                    name: "张三",
                    phone: 15817245448,
                    age: 21,
                    sex: 1,
                    birthday: "2023-05-06",
                },
            ],
            modalType: 0, // 0表示新增, 1表示编辑
            seacher: "",
            total: 0,
        };
    },
    methods: {
        restFromDate() {
            // 清除表单数据
            this.form = {};
            this.$refs.form.resetFields();
            // this.$refs.form.clearValidate()
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // if (this.modalType === 0) {
                    //     // 新增
                    //     addUser(this.form).then((data) => {
                    //         // 重新获取数据
                    //         this.getList();
                    //     });
                    // } else if (this.modalType === 1) {
                    //     // 更新
                    //     updateUser(this.form).then((data) => {
                    //         // 重新获取数据
                    //         this.getList()
                    //     });
                    // }

                    // 校验成功
                    this.$message({
                        message: "操作成功",
                        type: "success",
                    });
                    // 清除表单数据
                    restFromDate();
                    // 模态框隐藏
                    this.dialogVisible = false;
                }
            });
        },
        getList() {
            // 获取列表数据
            // getUser().then((data) => {
            //     if (data.code === 200) {
            //         this.tableData = data.data
            //     }
            // })
            this.total = this.tableData.length;
        },
        handlerNew() {
            this.dialogVisible = true;
            this.modalType = 0;
        },
        handlerEdit(data) {
            this.modalType = 1;
            this.dialogVisible = true;
            this.form = JSON.parse(JSON.stringify(data));
        },
        handlerDel(data) {
            this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    // delUser(data.id).then((data) => {
                    //     this.$message({
                    //         type: "success",
                    //         message: "删除成功!",
                    //     });
                    //     // 重新获取列表接口
                    //     this.getList()
                    // });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
    mounted() {
        this.getList();
    },
};
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
</style>