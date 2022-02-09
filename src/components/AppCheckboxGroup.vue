<template>
  <div class="app-checkbox-group" ref="appCheckboxGroup">
    <slot v-bind:user="modelValue"></slot>
  </div>
</template>
<script>
export default {
  name: "app-checkbox-group",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    modelValue: {
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    this.groupCheckboxChange();
  },
  methods: {
    groupCheckboxChange: function () {
      const children = this.$refs.appCheckboxGroup.children;
      Array.from(children).forEach((el) => {
        const elementLabel = el
          .getElementsByTagName("label")[0]
          .getElementsByTagName("span")[0].innerHTML;

        const elementInput = el.getElementsByTagName("input")[0];

        for (let item of this.modelValue) {
          if (elementLabel === item) {
            elementInput.checked = true;
            break;
          } else {
            elementInput.checked = false;
          }
        }
      });
    },
  },
};
</script>