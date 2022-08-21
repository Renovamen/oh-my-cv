<template>
  <div hstack>
    <NavItem
      :text="data.curResumeName"
      icon="ic:outline-arrow-drop-down"
      :reverse="true"
    >
      <Dropdown :items="items" />
    </NavItem>
  </div>

  <SwitchResume v-if="isSwitchOpen" @close-switch="toggleSwitch(false)" />
  <RenameResume v-if="isRenameOpen" @close-rename="toggleRename(false)" />
</template>

<script lang="ts" setup>
import { deleteResume, newResume } from "~/utils";

const { t } = useI18n();
const { data } = useDataStore();

const items = computed(() => [
  {
    text: t("resume_name.rename"),
    icon: "bx:edit",
    function: () => toggleRename(true)
  },
  {
    text: t("resume_name.open"),
    icon: "material-symbols:folder-open-outline-rounded",
    function: () => toggleSwitch(true)
  },
  {
    text: t("resume_name.new"),
    icon: "material-symbols:note-add-outline-rounded",
    function: newResume
  },
  {
    text: t("resume_name.delete"),
    icon: "material-symbols:delete-outline-rounded",
    function: deleteResume
  }
]);

const isSwitchOpen = ref(false);
const isRenameOpen = ref(false);

const toggleSwitch = (to?: boolean): void => {
  isSwitchOpen.value = typeof to === "boolean" ? to : !isSwitchOpen.value;
};

const toggleRename = (to?: boolean): void => {
  isRenameOpen.value = typeof to === "boolean" ? to : !isRenameOpen.value;
};
</script>
