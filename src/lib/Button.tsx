import { defineComponent } from "vue";
import './lib.scss'

export default defineComponent({
  name: "Button",
  props: {
    click: {
      type: Function,
    }
  },
  render() {
    return (
      <button type="button" class="btn" onClick={() => this.$props.click&&this.$props.click()}>
        按钮
      </button>
    );
  },
});
