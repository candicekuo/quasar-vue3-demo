<template>
  <div class="flex flex-center">
    <p>over view</p>
  </div>
  <p>test: {{ t('Lang') }}</p>
  <svg-icon name="file_icon" />
</template>

<script setup>
// import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
