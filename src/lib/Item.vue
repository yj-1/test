<template>
  <div class="form-item flex align-center">
    <span><i class="asterisk" v-if="required">*</i>{{ text }}</span>
    <div class="item-input">
      <slot name="input">
        <input
          :type="type"
          :required="required"
          :placeholder="placeholder"
          :value="modelValue"
          :modelValue="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          @blur="blur && blur()"
          @change="change && change()"
        />
        <span v-if="err">{{msg}}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Item",
  props: {
    required: {
      type: Boolean,
    },
    text: {
      type: String,
      default: () => "用户：",
    },
    type: {
      type: String,
      default: () => "text",
    },
    placeholder: {
      type: String,
    },
    blur: {
      type: Function,
    },
    change: {
      type: Function,
    },
    // value: {
    //   type: String || Number || Boolean,
    // },
    modelValue: {
      type: String
    },
    err: {
      type: Boolean
    },
    msg: {
      type: String,
      default: () => ''
    }
  },
});
</script>

<style lang="scss" scope>
.item-input {
  width: 160px;
  display: flex;
  align-items: center;
  position: relative;
  input {
    @extend .wh;
    border-radius: 10rem;
    border: 1px solid #dcdfe6;
    padding: 10px 0rem 10px 10px;
    transition: border 0.4s ease-in;
    &:focus {
      border-color: #409eff;
    }
  }
  span {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-size:14px;
    color: #ff0000;
  }
}
.item-err {
  color: #f56c6c;
  input {
    border-color: #f56c6c;
  }
}
</style>
