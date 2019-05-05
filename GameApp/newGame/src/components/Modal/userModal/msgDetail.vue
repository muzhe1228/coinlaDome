<template>
  <comModal @close="close" :titleName="Detail.title">
    <p v-html="Detail.content" class="msgContent"></p>
  </comModal>
</template>

<script>
import comModal from "../newComm";
export default {
  props: {
    Detail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  components: {
    comModal
  },
  methods: {
    show() {
      this.$refs.comm.show();
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="stylus">
.msgContent {
  line-height: 0.359551rem;
  padding:0.179775rem;
  text-align: left;
}
</style>
