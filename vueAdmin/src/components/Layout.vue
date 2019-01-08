<template>
  <div class="app-wrapper">
    <navleft></navleft>
    <div
      class="main-container"
      v-bind:class="[isCollapse ? containerShow : containerHide ]"
    >
      <hea-der></hea-der>
      <maincon></maincon>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Navleft, Maincon, HeaDer } from "../views/container";
export default {
  name: "Layout",
  data() {
    return {
      containerShow: "main-container-show",
      containerHide: "main-container-hide"
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  components: { Navleft, Maincon, HeaDer },
  methods: {}
};
</script>
<style lang="less" scoped>
.app-wrappe {
  height: 100%;
  position: relative;
  width: 100%;
}
.main-container {
  -webkit-transition: margin-left 0.28s;
  margin-left: 63px;
  min-height: 100%;
  position: relative;
  transition: margin-left 0.28s;
  background: white;
}
.main-container-show {
  margin-left: 64px;
}
.main-container-hide {
  margin-left: 200px;
}
</style>
