<template>
  <div class="wh center">
    <div class="admin-form">
      <h2>后台管理系统登陆</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="pass">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item style="padding-top:10px">
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
import { Login } from "@/api/login"
export default defineComponent({
  name: "register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
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
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Login(this.ruleForm)
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

<style lang="scss" scope>
.center {
  @extend .flex-center, .justify-center;
  background: #c3f5a3;
  div > h2 {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
// 表单
.admin-form {
  border-radius: 10rem;
  padding: 30rem 60rem;
  background: #ffffff;
}
</style>
