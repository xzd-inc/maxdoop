<template>
  <app v-if="env === '场景应用'" />
  <bsp v-if="env === '运维中心'" />
  <dmp v-if="env === '物联平台'" />
</template>

<script setup lang="ts">
import app from './app/index.vue';
import bsp from './bsp/index.vue';
import dmp from './dmp/index.vue';

const env = localStorage.getItem('env')

</script>