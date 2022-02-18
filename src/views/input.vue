<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>Input</h1>

        <ul class="input-list">
          <li>
            <h3>Basic usage</h3>
            <p>{{ text1 }}</p>
            <app-input
              v-model="text1"
              @blur="eventBlur"
              @focus="eventFocus"
              @input="eventInput"
              placeholder="Please input"
            ></app-input>
          </li>
        </ul>

        <ul class="input-list">
          <li>
            <h3>Disabled</h3>
            <app-input :disabled="true" placeholder="Please input"></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Clearable</h3>
            <p>{{ text2 }}</p>
            <app-input
              v-model="text2"
              :clearable="true"
              placeholder="Please input"
            ></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Show password</h3>
            <p>{{ text3 }}</p>
            <app-input
              v-model="text3"
              :showPassword="true"
              placeholder="Please input"
            ></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Icon input right/input</h3>

            <p>slot과 바인딩으로 둘다 추가 가능한 아이콘 추가 기능입니다.</p>

            <app-input
              v-model="text4"
              placeholder="Please input"
              suffix-icon="fa-regular fa-face-grin-tongue-wink"
            ></app-input>
            <app-input
              v-model="text4"
              placeholder="Please input"
              prefix-icon="fa-regular fa-face-kiss-beam"
            ></app-input>
            <app-input placeholder="이메일 (test@gmail.com)">
              <fa-icon slot="suffix" icon="fa-regular fa-envelope"></fa-icon
            ></app-input>
            <app-input placeholder="카드번호 (0000-00000-0000)">
              <fa-icon slot="prefix" icon="fa-regular fa-credit-card"></fa-icon>
            </app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Textarea / Resize</h3>
            <app-input
              type="textarea"
              :rows="1"
              resize="horizontal"
              placeholder="Please input"
            ></app-input>
            <app-input
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="Please input"
            ></app-input>
            <app-input
              type="textarea"
              :rows="6"
              resize="vertical"
              placeholder="Please input"
            ></app-input>
            <app-input
              type="textarea"
              :rows="6"
              resize="both"
              placeholder="Please input"
            ></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Size</h3>
            <app-input placeholder="Please input"></app-input>
            <app-input size="medium" placeholder="Please input"></app-input>
            <app-input size="small" placeholder="Please input"></app-input>
            <app-input size="mini" placeholder="Please input"></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Max/min length</h3>
            <app-input
              :type="'textarea'"
              :minlength="3"
              :maxlength="6"
              v-model="limit1"
              placeholder="Please input"
              :showWordLimit="true"
            ></app-input>
          </li>
          <li style="display: block">
            <h3>Max/min length</h3>
            <app-input
              :minlength="3"
              :maxlength="3"
              v-model="limit2"
              placeholder="Please input"
              :showWordLimit="true"
            ></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Slot prepend</h3>
            <app-input placeholder="검색주소" :type="'text'"
              ><template v-slot:prepend>http://</template></app-input
            >
          </li>
          <li style="display: block">
            <h3>Slot append</h3>
            <app-input placeholder="키워드" :type="'text'">
              <template v-slot:append>추가</template>
            </app-input>
          </li>
          <li style="display: block">
            <h3>Button append</h3>
            <app-input placeholder="키워드" :type="'text'">
              <app-button slot="append">추가</app-button>
            </app-input>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";

export default {
  components: { AppInput, AppButton },
  name: "ui-page-checkbox",
  data() {
    return {
      text1: "기본 인풋!",
      text2: "text test",
      text3: "",
      text4: "아이콘 인풋",
      limit1: "",
      limit2: "",
    };
  },
  methods: {
    eventBlur: function () {
      console.log("blur");
    },
    eventInput: function () {
      console.log("input");
    },
    eventFocus: function () {
      console.log("focus");
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 32px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 8px;
}
h3 {
  font-size: 20px;
  font-weight: 400;
  margin-top: 60px;
  margin-bottom: 8px;
}
p {
  margin-bottom: 32px;
}

.ui-container {
  ul.ui-list {
    padding-left: 0px;
    li.ui-list-item {
      list-style: none;
      list-style-type: none;
    }
    .input-list {
      margin-top: 40px;
      li {
        display: inline-block;
      }
    }
  }
}
</style>
