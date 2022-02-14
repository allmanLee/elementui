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
    componentId() {
      return `checkbox-group-${Math.floor(Math.random() * 100000000000)}`;
    },
  },
  created() {
    this.createComponentId(this.componentId);
  },
  mounted() {
    //mounted 시 체크박스 이벤트 버스 구독
    EventBus.$on(this.$options.componentId, (val) => {
      this.$emit("input", val);
    });

    this.groupCheckboxChange();
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.groupCheckboxChange();
      },
    },
  },
  methods: {
    createComponentId(uid) {
      this.$options.componentId = uid;
    },

    groupCheckboxChange() {
      EventBus.$emit(this.$options.componentId, this.modelValue);
    },
  },
};
</script>
