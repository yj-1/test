<template>
  <div class="p20 turnover">
    <div class="top">
      <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
    </div>

    <el-table :data="data.list" max-height="800" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column align="center" width="100" type="index" label="序号">
      </el-table-column>

      <!-- 收入 -->
      <el-table-column
        align="center"
        prop="cash"
        sortable
        label="收入"
        minWidth="120"
      >
        <template #default="scope">
          <span style="color: #10AF20;">{{ '+ ' + scope.row.cash }}</span>
        </template>
      </el-table-column>

      <!-- 支出 -->
      <el-table-column
        align="center"
        prop="expend"
        sortable
        label="支出"
        minWidth="120"
      >
        <template #default="scope">
          <span style="color: #f93210;">{{ '- ' + scope.row.expend }}</span>
        </template>
      </el-table-column>

      <!-- 账户现金 -->
      <el-table-column
        align="center"
        prop="expend"
        sortable
        label="账户现金"
        minWidth="120"
      >
        <template #default="scope">
          <span style="color: #298ff7;">{{ scope.row.income }}</span>
        </template>
      </el-table-column>

      <!-- 评论 -->
      <el-table-column align="center" prop="remark" label="评论" minWidth="200">
      </el-table-column>

      <!-- 备注 -->
      <el-table-column align="center" prop="type" label="备注" minWidth="150">
      </el-table-column>

      <!-- 日期 -->
      <el-table-column
        align="center"
        sortable
        prop="date"
        label="日期"
        minWidth="150"
      >
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            formatDate(scope.row.date)
          }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column align="center" fixed="right" label="操作" minWidth="150">
        <template #default="scope">
          <div class="handle">
            <el-button
              @click="handleEdit(scope.row, scope.$index)"
              type="warning"
              size="small"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDel(scope.row, scope.$index)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>

    <!-- 表单对话框 -->
    <el-dialog
      :title="data.id ? '修改' : '添加'"
      @close="cancel"
      v-model="formShow"
      center
    >
      <el-form :model="form" ref="test" :rules="rules">
        <el-form-item label="收入" label-width="100px" prop="cash">
          <el-input v-model="form.cash"></el-input>
        </el-form-item>

        <el-form-item label="支出" label-width="100px" prop="expend">
          <el-input v-model="form.expend"></el-input>
        </el-form-item>

        <el-form-item label="现金账户" label-width="100px" prop="income">
          <el-input v-model="form.income"></el-input>
        </el-form-item>

        <el-form-item label="评论" label-width="100px" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item label="备注" label-width="100px" prop="type">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onBeforeMount } from 'vue'
import { getProfiles, addProfile, delProfile, editProfile } from '@/api/login'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'FundManage',
  setup(props, ctx) {
    // 基础变量
    const page = reactive({
      current: 1,
      total: 300,
      size: 10,
      sizes: [10, 20, 30, 40]
    }) // 分页
    const AddToEdit = ref(false) // 添加修改转换
    const data = reactive({ list: [], id: null, index: null }) // 表格数据
    const show = ref(false) // 对话框显示
    const form = reactive({
      type: '测试',
      expend: '100',
      remark: '...',
      cash: '50',
      income: '50'
    }) //表单
    const validate = { required: true, message: '该选项为必填值！' } // 规则
    const rules = {
      cash: [validate],
      expend: [validate],
      remark: [validate],
      type: [validate],
      income: [validate]
    } // 效验规则
    // 方法
    const fns = {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      }, // 分页改变
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }, // 当前页改变
      formatDate(v) {
        return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
      }, // 格式化日期
      handleEdit(d, i) {
        form.type = d.type
        form.expend = d.expend
        form.remark = d.remark
        form.cash = d.cash
        form.income = d.income
        show.value = true
        data.id = d._id
        data.index = i
        console.log(d, i)
      }, // 编辑
      handleAdd() {
        show.value = true
      }, // 添加按钮
      handleDel(val, i) {
        delProfile(val._id).then(result => {
          data.list.splice(i, 1)
          console.log(data, '表格')
          console.log(result)
        })
        show.value = false
        console.log(val, i)
      } // 删除
    }
    const setData = val => {
      data.list = val
    } // 设置表格数据

    onBeforeMount(() => {
      getProfiles().then(result => {
        setData(result)
        // data.value.push(...result);
        console.log(data, 234)
      })
    })

    return {
      data,
      page,
      formShow: show,
      ...fns,
      form,
      rules,
      AddToEdit
    }
  },
  methods: {
    cancel() {
      this.$refs['test'].resetFields()
      this.data.index = this.data.id = null
      this.formShow = false
    }, // 关闭对话框
    addProfile() {
      this.$refs['test'].validate(valid => {
        console.log(valid)
        if (valid) {
          addProfile(this.form).then(data => {
            this.data.list.push(data)
            console.log(this.data, data, 'c')
            this.formShow = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, // 添加Profile
    editProfile() {
      if (this.data.id && this.form) {
        editProfile(this.data.id, this.form).then(data => {
          console.log(data)
          if (data) {
            Object.assign(this.data.list[this.data.index], this.form)
            this.data.id = this.data.index = null
            this.formShow = false
          }
        })
      }
    }, // 编辑Profile
    define() {
      console.log(2343)
      if (!this.AddToEdit) {
        this.addProfile()
      } else {
        this.editProfile()
      }
    } // 确认按钮
  }
})
</script>

<style lang="scss" scoped>
.p20 {
  padding: 20px;
}
.top {
  text-align: right;
  padding-bottom: 10px;
}
.pages {
  padding-top: 20rem;
  text-align: right;
}
.handle {
  @extend .flex, .justify-center, .flex-wrap;
  & > button {
    margin: 4px;
  }
}
::v-deep .el-pagination .el-input {
  line-height: normal;
}
::v-deep .el-overlay {
  @extend .center, .flex-column;
  .el-dialog {
    margin: 0 !important;
  }
}
</style>
