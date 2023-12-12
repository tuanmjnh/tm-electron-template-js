<script setup>
import stores from '@renderer/stores'
const storeSettings = stores.setting()
const onToggleDarkMode = () => {
  storeSettings.setDarkMode(!storeSettings.darkMode)
}
// import IconEpApple from '~icons/ep/apple'
</script>
<template>
  <el-header>
    <div class="el-space" />
    <el-button text @click="onToggleDarkMode">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    </el-button>
    <!-- <button>
    </button> -->
    <!-- <el-dropdown>
      <el-icon style="margin-right: 8px; margin-top: 1px">
        <i-ep-setting />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span> -->
  </el-header>
</template>
<style scoped></style>
