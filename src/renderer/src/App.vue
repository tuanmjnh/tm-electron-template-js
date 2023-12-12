<script setup>
import { defineAsyncComponent, computed } from 'vue'
// import { useStoreSettings } from '@/stores'
// import stores from './stores'
// const storeSetting = stores.setting()
//init setting
// storeSetting.initialize()
const component = computed(() => {
  if (true) {//if ($store.state.auth.user) {
    return defineAsyncComponent(() => import(`./layouts/index.vue`))
  } else {
    return defineAsyncComponent(() => import('./layouts/fake-layout.vue'))
  }
})
// const { ipcRenderer } = require('electron')
// ipcRenderer.on('window-size', function (evt, message) {
//   setTimeout(() => {
//     // console.log(document.getElementsByClassName('app-container')[0])
//     document.getElementsByClassName('app-container')[0].style = `width:${message.width - 39}px;height:${message.height - 55}px`
//   }, 500)
// })
</script>

<template>
  <component :is="component">
    <router-view />
  </component>
</template>

<style scoped></style>
