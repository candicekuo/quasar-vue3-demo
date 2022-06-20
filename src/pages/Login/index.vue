<template>
  <div class="flex flex-center">
    <p>login ⌓ ‿ ⌓</p>
  </div>
  <p>{{ t('success') }}</p>
  <div class="row">
    <q-select
      v-model="lang"
      :options="langOptions"
      :label="t('Lang')"
      emit-value
      class="col-3"
      @update:model-value="handleLangChange"
    />
  </div>
  <q-btn color="primary" label="login" @click="login" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const router = useRouter();

const lang = ref({ value: 'en-US', label: t('Lang EN') });

const langOptions = reactive([
  { value: 'en-US', label: t('Lang EN') },
  { value: 'zh-TW', label: t('Lang ZH') },
]);

const handleLangChange = (lang) => {
  locale.value = lang;
  localStorage.setItem('_locale', lang);
  // loginRef.value.resetValidation();
};

const login = () => {
  router.push({ name: 'overview' });
};
</script>
