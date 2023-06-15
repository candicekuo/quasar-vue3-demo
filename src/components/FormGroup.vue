<template>
  <div class="row q-col-gutter-md">
    <template v-for="data in props.formData" :key="data.label">
      <div :class="data.col" :style="data.style">
        <div :class="props.isSingle ? 'single-box' : ''">
          <template v-if="props.isTitle">
            <p
              :class="[
                props.isSingle ? 'q-pt-sm q-pr-md' : '',
                'text-bold',
                'q-mb-sm',
                'col-12',
                'text-grey-8',
              ]"
            >
              <span v-if="data.required" class="text-deep-orange-5">＊</span>
              <q-icon
                v-else-if="data.icon"
                :name="data.icon"
                color="main-color q-mr-sm q-mb-xs"
                size="xs"
              />
              {{ data.title || data.label }}
            </p>
          </template>

          <q-input
            v-if="data.kind === 'input'"
            v-model.trim="data.val"
            :label="data.label"
            :class="data.classes"
            :rules="data.rules"
            :lazy-rules="data.lazyRules"
            :color="props.isColor"
            :disable="data.disable"
            :bg-color="data.bgColor"
            :type="data.type"
            :name="data.name"
            outlined
            bottom-slots
            dense
            clearable
            @keydown.enter="
              (value) => (data.isEvent ? handleUpdate({ value, ...data }) : '')
            "
          >
            <template v-if="data.isSearch" #append>
              <q-icon
                name="search"
                class="cursor-pointer"
                @click="data.isEvent ? handleUpdate({ value, ...data }) : ''"
              />
            </template>
            <template v-else-if="data.isPassword" #append>
              <q-icon
                v-if="data.type === 'password'"
                name="eva-eye-off-2-outline"
                class="main-color cursor-pointer"
                @click="handlePswType('text', data)"
              />
              <q-icon
                v-else
                name="eva-eye-outline"
                class="main-color cursor-pointer"
                @click="handlePswType('password', data)"
              />
            </template>
            <template #prepend>
              <slot name="inputPrepend" />
            </template>
          </q-input>

          <q-select
            v-else-if="data.kind === 'select'"
            v-model="data.val"
            :options="data.options"
            :label="data.label"
            :class="data.classes"
            :rules="data.rules"
            :lazy-rules="data.lazyRules"
            :color="props.isColor"
            :disable="data.disable"
            :bg-color="data.bgColor"
            :multiple="data.isMultiple"
            dropdown-icon="eva-chevron-down-outline"
            clearable
            outlined
            dense
            @update:model-value="(value) => handleUpdate({ value, ...data })"
          />

          <q-select
            v-else-if="data.kind === 'autocomplete'"
            v-model.trim="data.val"
            class="col-4 q-mr-sm"
            dropdown-icon="eva-chevron-down-outline"
            :options="data.options"
            :label="data.label"
            :class="data.classes"
            :rules="data.rules"
            :lazy-rules="data.lazyRules"
            :color="props.isColor"
            :disable="data.disable"
            use-input
            outlined
            dense
            clearable
            @filter="(val, update) => filterOptions(val, update, data)"
          />

          <q-input
            v-else-if="data.kind === 'date'"
            v-model="data.val"
            :label="data.label"
            :placeholder="data.dateFormat"
            :class="data.classes"
            :rules="data.rules"
            :lazy-rules="data.lazyRules"
            :color="props.isColor"
            :disable="data.disable"
            dense
            outlined
            clearable
          >
            <template #prepend>
              <q-icon name="event" color="grey-6" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="data.val" :mask="data.dateFormat" minimal>
                    <q-btn
                      v-close-popup
                      label="Close"
                      :color="props.isColor"
                      flat
                    />
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-if="data.needTime" #append>
              <q-icon name="access_time" color="grey-6" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="data.val" :mask="data.dateFormat" format24h>
                    <q-btn
                      v-close-popup
                      label="Close"
                      :color="props.isColor"
                      flat
                    />
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <template v-else-if="data.kind === 'radio'">
            <q-radio
              v-for="item in data.options"
              :key="item.label"
              v-model="data.val"
              :label="item.label"
              :val="item.value"
              :class="data.classes"
              :rules="data.rules"
              :lazy-rules="data.lazyRules"
              :color="data.isColor || props.isColor"
              :disable="data.disable"
            />
          </template>

          <template v-else-if="data.kind === 'checkbox'">
            <q-checkbox
              v-if="!data.options"
              v-model="data.val"
              :label="data.label"
              :class="data.classes"
              :color="data.isColor || props.isColor"
              :disable="data.disable"
            />

            <q-checkbox
              v-for="item in data.options"
              v-else
              :key="item.label"
              v-model="data.val"
              :val="item.value"
              :label="item.label"
              :class="data.classes"
              :color="data.isColor || props.isColor"
              :disable="data.disable"
            />
          </template>

          <template v-else-if="data.kind === 'toggle'">
            <q-toggle
              v-model="data.val"
              :color="data.isColor || props.isColor"
              :label="data.label"
            />
          </template>

          <q-file
            v-else-if="data.kind === 'file'"
            v-model="data.val"
            :label="data.label"
            :class="data.classes"
            :rules="data.rules"
            :lazy-rules="data.lazyRules"
            :disable="data.disable"
            outlined
            dense
            clearable
            @update:model-value="
              (val) => {
                if (data.updated) data.updated(val, data);
              }
            "
          >
            <template #prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    default: () => {},
  },
  isTitle: {
    type: Boolean,
    default: true,
  },
  isSingle: {
    type: Boolean,
    default: false,
  },
  isColor: {
    type: String,
    default: 'amber-5',
  },
});

const emits = defineEmits(['handleUpdate']);

const handleUpdate = (props) => {
  emits('handleUpdate', props);
};

const filterOptions = (val, update, data) => {
  if (val === '' || !val) {
    update(() => {
      data.options = data.originalOptions;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    data.options = data.originalOptions.filter((v) => {
      return v.label.toLowerCase().indexOf(needle) > -1;
    });
  });
};

const handlePswType = (val, data) => {
  data.type = val;
};
</script>

<style lang="scss" scoped>
.single-box {
  display: flex;
  > :last-child {
    flex: 1 1 100%;
  }
}
</style>
