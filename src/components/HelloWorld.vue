<script setup lang="ts">
import { ref } from 'vue'

interface HelloWorldProps {
  msg: string
}

const props = withDefaults(defineProps<HelloWorldProps>(), {
  msg: '666',
})

const emit = defineEmits<{ (event: 'changeCount', count: number): void }>()

console.log(props.msg)

const count = ref(0)

const addCount = () => {
  count.value++
  emit('changeCount', count.value)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <slot name="detail"></slot>

  <div class="card">
    <button type="button" @click="addCount">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Vetur仅支持Vue2，请安装
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
  </p>
  <p class="read-the-docs">Click on the Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
