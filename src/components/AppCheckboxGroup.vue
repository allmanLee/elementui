<template>
  <div id="" class="app-checkbox-group" ref="appCheckboxGroup">
    <slot></slot>
  </div>
</template>
 <script>
import EventBus from "@/EventBus.js";

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
  },
  mounted() {
    this.groupCheckboxChange();
    const uid = this.createUniqueId();
    this.createComponentId(uid);
    const customThis = this;

    EventBus.$on(uid, function (val) {
      const newModel = [...customThis.modelValue];
      const keyName = Object.keys(val)[0];
      const isChecked = Object.values(val)[0];
      let keyIndexOfModel = newModel.indexOf(keyName);
      console.log(newModel);
      if (isChecked) {
        newModel.push(keyName);
      } else {
        console.log(newModel.indexOf(keyName));
        newModel.splice(keyIndexOfModel, 1);
        console.log(newModel);
      }

      customThis.$emit("input", newModel);
    });
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        //this.$emit("input", val);
        this.groupCheckboxChange();
      },
    },
  },
  methods: {
    createComponentId(uid) {
      this.$options.componentId = uid;
    },
    createUniqueId() {
      //group을 식별하기 위한 unique id 생성
      const newUID = `checkobox-group-${Math.floor(
        Math.random() * 100000000000
      )}`;
      return newUID;
    },
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
    },
    testMethod() {},
  },
};
</script>