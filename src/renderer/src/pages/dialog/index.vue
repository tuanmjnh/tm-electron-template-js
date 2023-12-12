<script setup>
import { ref } from 'vue'
const { ipcRenderer } = require('electron')
const openWindow = () => {
  window.open("https://github.com", "_blank", "top=500,left=200,frame=false,nodeIntegration=no")
  // childWindow.document.write('<h1>Hello</h1>')
}
const input = ref(null)
const onDialogOpenFile = (message) => {
  // Send information to the main process
  // if a listener has been set, then the main process
  // will react to the request !
  ipcRenderer.invoke('dialogOpenFile', { sync: true }).then(x => {
    input.value = x
  })
}
const onDialogOpenFolder = (message) => {
  // Send information to the main process
  // if a listener has been set, then the main process
  // will react to the request !
  ipcRenderer.invoke('dialogOpenFolder', { sync: true }).then(x => {
    input.value = x
  })
}
const onDialogSaveFile = (message) => {
  // Send information to the main process
  // if a listener has been set, then the main process
  // will react to the request !
  ipcRenderer.invoke('dialogSaveFile', { sync: true }).then(x => {
    input.value = x
  })
}
</script>
<template>
  <el-row class="mb-4">
    <el-button type="primary" @click="onDialogOpenFile">Open File Dialog</el-button>
    <el-button type="success" @click="onDialogOpenFolder">Open Folder Dialog</el-button>
    <el-button type="info" @click="onDialogSaveFile">Save File Dialog</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <el-row class="mb-4">
    <el-input v-model="input" disabled placeholder="Please input" />
  </el-row>
</template>
<style scoped></style>
