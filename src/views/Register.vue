<template>
  <div class="wh center">
    <div class="admin-form">
      <h2>后台管理系统注册</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input
            type="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码：" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份：" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { Register } from '@/api/login'
export default defineComponent({
  name: "register",
  // components: {
  //   // Item,
  //   // Button,
  // },
  setup() { return {}},
  data() {
    const checkIdentity = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.checkPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空！"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "user0",
        password: "123456",
        checkPass: "123456",
        identity: "",
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        identity: [{ validator: checkIdentity, trigger: "blur" }],
      },
      options: [  // 用户选择
        {
          value: 1,
          label: "管理员",
        },
        {
          value: 2,
          label: "用户",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Register(this.ruleForm)
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
});
</script>

<style lang="scss" scoped>
.center {
  @extend .flex-center, .justify-center;
  background: #c3f5a3;
  div > h2 {
    font-size: 20px;
    padding-bottom: 20rem;
  }
}
// 表单
.admin-form {
  border-radius: 10rem;
  padding: 30rem 60rem;
  background: #ffffff;
}
</style>
