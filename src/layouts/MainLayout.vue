<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="column justify-between">
      <q-list>
        <q-item-label header class="text-white">
          <!-- <q-toolbar>
            <q-avatar class="bg-indigo-4">
              {{ userName.substr(0, 1) }}
            </q-avatar>
            <q-toolbar-title>
              <p class="q-ma-none q-py-sm">{{ userName }}</p>
            </q-toolbar-title>
          </q-toolbar>
          <q-separator color="grey" class="q-mt-md" /> -->
        </q-item-label>
        <MenuList />
      </q-list>
      <div class="flex flex-center q-my-sm text-grey-6">{{ version }}</div>
    </q-drawer>

    <q-page-container>
      <q-page class="q-ma-lg">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import MenuList from 'components/MenuList.vue';
import * as pkg from 'app/package';

const { version } = pkg;

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style lang="scss" scoped></style>
