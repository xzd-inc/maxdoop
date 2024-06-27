<template>
  <el-tag :type="props.status === '1' ? 'success' : 'danger'">{{ filterEnum(props.status, dict) }}</el-tag>
</template>

<script setup lang="ts" name="Status">
import { Status } from "@/api/interface";
import { status as dict } from "@/utils/dict";
import { filterEnum } from "@/utils";

interface Props {
  status?: Status;
}
const props = defineProps<Props>();
</script>
