<template>
  <Pane
    class="h-56 w-full pc:w-96"
    :text="t('resume_name.open')"
    icon="material-symbols:folder-open-outline-rounded"
    @close="emit('closeSwitch')"
  >
    <ul
      class="flex-1 mx-4 mt-2 mb-3 overflow-y-scroll border-t border-c text-sm text-light-c"
    >
      <li
        v-for="(item, i) in resumeList"
        :key="`switch-${item}`"
        class="px-1.5 py-2 cursor-pointer hstack justify-between hover:bg-hover-c"
        :class="[data.curResumeId === item.id && 'bg-hover-c']"
        @click="switchResume(item.id)"
      >
        <div hstack flex-1 overflow-hidden>
          <span w-7>{{ i + 1 }}</span>
          <span truncate text-c>{{ item.name }}</span>
        </div>
        <div w-20 text-right>{{ getDateStr(item.id) }}</div>
      </li>
    </ul>
  </Pane>
</template>

<script lang="ts" setup>
import { getStorage, switchResume } from "~/utils";

const { t } = useI18n();
const { data } = useDataStore();

const emit = defineEmits<{
  (e: "closeSwitch"): void;
}>();

type Item = {
  id: string;
  name: string;
};

const resumeList = ref<Item[]>([]);

getStorage().then((storage) => {
  if (!storage) return;

  const list = Object.keys(storage).map((i) => ({
    id: i,
    name: storage[i].name
  }));

  list.sort((a: Item, b: Item) => b.id.localeCompare(a.id));
  resumeList.value = list;
});

const getDateStr = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp));

  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate();

  return y + "-" + m + "-" + d;
};
</script>
