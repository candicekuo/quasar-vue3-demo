<template>
  <div class="flex flex-center">
    <div>
      <p>login ⌓ ‿ ⌓</p>
      <p>{{ t('success') }}</p>
      <template v-for="(data, index) in userData" :key="index">
        <q-input v-model="data.val" outlined :label="data.label" dense :type="data.type" />
      </template>
      <q-select
        v-model="lang"
        :options="langOptions"
        :label="t('Lang')"
        emit-value
        outlined
        dense
        @update:model-value="handleLangChange"
      />

      <q-btn color="primary" label="login" @click="login" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const router = useRouter();

const langOptions = reactive([
  { value: 'en-US', label: t('Lang EN') },
  { value: 'zh-TW', label: t('Lang ZH') },
]);
const defaultLang = reactive(langOptions.find((item) => item.value === locale.value));
const lang = ref(defaultLang);

const userData = reactive({
  id: {
    label: 'ID',
    val: null,
    type: 'text',
  },
  psw: {
    label: 'Password',
    val: null,
    type: 'password',
  },
});

const handleLangChange = (lang) => {
  locale.value = lang;
  localStorage.setItem('_locale', lang);
  // loginRef.value.resetValidation();
};

const login = () => {
  router.push({ name: 'overview' });
};
</script>
