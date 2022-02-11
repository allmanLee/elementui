<template>
  <div class="app-checkbox-group" ref="appCheckboxGroup">
    <slot></slot>
  </div>
</template>
 <script>
//1. event-bus: 현재 이 ref의 아이디를 같이보낸다. 자식에서 그 부모의 ref가 맞다면 구독을 한다.
export default {
  name: "app-checkbox-group",
  model: {
    prop: "modelValue",
  },
  props: {
    modelValue: {
      default: () => {
        return [];
      },
    },
  },
  computed: {
    modelValueSet() {
      return new Set(this.modelValue);
    },
    slotData() {
      return this.$slots.default;
    },
  },
  mounted() {
    this.groupCheckboxChange();
    console.log(this.$slots.default);
  },
  watch: {
    modelValueSet: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
        this.groupCheckboxChange();
      },
    },
    slotData: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
  methods: {
    groupCheckboxChange() {
      console.log("change checkbox");
      const children = this.$refs.appCheckboxGroup.children;
      Array.from(children).forEach((el) => {
        const elementLabel = el
          ?.getElementsByTagName("label")[0]
          ?.getElementsByTagName("span")[0].innerHTML;

        const elementInput = el?.getElementsByTagName("input")[0];
        for (let item of this.modelValue) {
          if (elementLabel === item) {
            elementInput.checked = true;
            break;
          } else {
            elementInput.checked = false;
          }
        }
      });
      console.log(this.slotData);
    },
  },
};
</script>