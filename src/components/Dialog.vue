<template>
  <x-dialog
    v-model="dialogOptions.show"
    hide-on-blur
    :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}"
  >
    <div class="dialog-view">
      <img class="dialog-icon" src="../assets/img/icon_delete2@2x.png">
      <div class="dialog-title">{{dialogOptions.title}}</div>
      <div class="dialog-body">{{dialogOptions.text}}</div>
      <div class="dialog-line"></div>
      <div class="dialog-btns fl fl-jc-btn fl-ai-ctr">
        <div @click="dialogOptions.onOk()" class="dialog-sure dialog-btn">确定</div>
        <div @click="dialogOptions.onCancel()" class="dialog-btn">取消</div>
      </div>
    </div>
  </x-dialog>
</template>
<script>
import { XDialog } from "vux";
export default {
  components: {
    XDialog
  },
  data() {
    return {
      showDialogStyle: false
    };
  },
  props: {
    dialogOptions:Object,
  },
  methods: {
    methods1() {}
  }
};
</script>
<style lang="less" scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.dialog-view {
  width: 5.08rem;
  height: 3.7rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.05rem;
  text-align: center;
  position: relative;
}
.dialog-icon {
  width: 1rem;
  height: 1rem;
  margin: 0.34rem auto 0;
}
.dialog-title {
  color: #353535;
  font-size: 0.28rem;
  margin-bottom: 0.18rem;
  font-weight: Bold;
}
.dialog-body {
  color: #353535;
  font-size: 0.24rem;
  margin-bottom: 0.22rem;
}
.dialog-btn {
  width: 2.54rem;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #353535;
  font-size: 0.28rem;
}
.dialog-btns {
  position: absolute;
  bottom: 0;
  border-top: 0.02rem solid rgba(0, 0, 0, 0.12);
}
.dialog-sure {
  border-right: 0.02rem solid rgba(0, 0, 0, 0.12);
}
</style>
