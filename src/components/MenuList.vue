<template>
  <template v-for="menu in menuList" :key="menu.meta.title">
    <q-expansion-item
      v-if="!menu.meta.hide && !menu.meta.hideChildren && hasPermission(menu.meta.permissions)"
      :label="menu.meta.title"
      :icon="menu.meta.icon"
      :default-opened="openItem(menu.children)"
      class="text-blue-grey-6"
    >
      <template v-for="sub in menu.children" :key="sub.meta.title">
        <q-item
          v-if="sub.meta.leftMenu"
          v-ripple
          clickable
          :active="routeActive(sub)"
          active-class="text-blue-grey-10"
          @click="handleChangePage(sub)"
        >
          <q-item-section avatar>
            <q-icon :name="sub.meta.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ sub.meta.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-item
      v-else-if="!menu.meta.hide && hasPermission(menu.meta.permissions)"
      clickable
      :active="routeActive(menu)"
      active-class="text-blue-grey-10"
      class="text-white"
      @click="handleChangePage(menu)"
    >
      <q-item-section avatar>
        <q-icon :name="menu.meta.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ menu.meta.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
</template>

<script setup>
// import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

// const store = useStore();
const route = useRoute();
const router = useRouter();
const menuList = route.matched[0].children;

const handleChangePage = (item) => {
  if (item?.children) {
    router.push({ name: item.children[0].name });
  } else {
    router.push({ name: item.name });
  }
};
const openItem = (items) => {
  let isOpen = false;
  items?.forEach((item) => {
    if (item?.children) {
      isOpen = item.children.some((child) => {
        return child.name === route.name;
      });
    }
    if (item.name === route.name) {
      isOpen = item?.meta?.leftMenu || item.name === route.name;
    }
  });
  return isOpen;
};
const routeActive = (item) => {
  const { name } = route;
  if (item?.children) {
    return item.name === name
      ? item.name === name
      : item.children.some((child) => {
          return child.name === name;
        });
  }
  if (item?.name) {
    return name === item.name;
  }
  return false;
};
const hasPermission = (props) => {
  return true;
  // const permissions = store.getters['app/getAuthMeta']?.permissions || [];
  // return permissions.length ? permissions.indexOf(props) !== -1 : false;
};
</script>
