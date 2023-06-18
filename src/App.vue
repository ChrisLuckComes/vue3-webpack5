<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'

const onChangeCount = (value: number) => {
  console.log('count: ', value)
}
</script>

<template>
  <div>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld
    @change-count="onChangeCount"
    msg="Vue3 + TypeScript + Webpack5的工程脚手架"
  >
    <template v-slot:detail>
      <div>
        该脚手架已配置好babel,eslint,stylelint,sass,postcss 支持script
        setup语法，开箱即用
      </div>
    </template>
  </HelloWorld>
</template>

<style lang="scss">
@import './app';
</style>
