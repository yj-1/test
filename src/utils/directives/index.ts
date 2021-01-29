import { Directive, defineProps } from "vue"

type tsDirective = (fn: (...arg: any) => boolean) => Directive

export const permission: tsDirective = fn => {
  return {
    mounted(dom: HTMLBaseElement, dir) {
      console.log(dir.value, fn(dir.value))
      if (!fn(dir.value)) {
        dom.parentNode?.removeChild(dom)
      }
    }
  }
}