<template>
  <div class="homePage">
    <van-pull-refresh
      v-model="loading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="conBox">111</div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/pinia/user';
const userStore = useUserStore();
const loading = ref(false);
const { params } = useRoute();
const router = useRouter();

//下拉刷新
function onRefresh() {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}

onMounted(() => {});
</script>
<style lang="scss" scoped>
.homePage {
  background: #f7f7f7;
  .conBox {
    padding: 12px 16px;
    background: #fff;
    height: 1000px;
  }
}
</style>
