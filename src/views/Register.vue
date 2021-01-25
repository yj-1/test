<template>
  <div class="wh center">
    <div>
      <h2>后台管理系统注册</h2>
      <form class="admin-form">

        <div class="form-item flex align-center">
          <span><i class="asterisk">*</i>用户名：</span>
          <div class="item-input">
            <input type="text" placeholder="请输入用户名！">
          </div>
        </div>

        <div class="form-item flex align-center">
          <span>密码：</span>
          <div class="item-input">
            <input type="text" placeholder="请输入用户名！">
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "register",
})
</script>

<style lang="scss" scope>
.center {
  @extend .flex-center, .justify-center;
  background: #c3f5a3;
  div > h2 {
    font-size: 20px;
    padding: 10rem 0;
  }
}
// 表单
.admin-form {
  border-radius: 10rem;
  padding: 30rem 60rem 30rem 30rem;
  background: #ffffff;
  // 字段
  .form-item {
    justify-content: space-between;
    padding: 0 0 20rem;
    span {
      flex-grow: 1;
      padding-right: 10px;
      text-align: right;
      font-size: 16px;
    }
    .item-input {
      width: 160px;
      display: flex;
      align-items: center;
      border-radius: 10rem;
      border: 1px solid#222;
      padding: 10px 0rem 10px 10px;
      input {
        @extend .wh;
      }
    }
    padding-bottom: 20px;
  }
}
.asterisk {
  display: inline-block;
  padding-right: 10rem;
  margin-bottom: -10rem;
  color: #ff0000;
}
</style>