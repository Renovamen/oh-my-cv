<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton
        class="relative bg-neutral-800 hover:(bg-neutral-800/90 ring-neutral-800/40) dark:(bg-secondary hover:bg-background hover:ring-secondary/40)"
        @click="onOpen"
      >
        <span i-mdi:github size-4 mr-1 />
        {{ $t("dashboard.github_sync") }}
        <span
          v-if="isConnected"
          class="size-2 rounded-full bg-emerald-500 absolute top-1 right-1"
          title="GitHub Sync Connected"
        />
      </UiButton>
    </UiDialogTrigger>

    <UiDialogContent class="sm:max-w-120">
      <UiDialogHeader>
        <UiDialogTitle class="hstack gap-x-2 text-lg">
          <span i-mdi:github text-xl />
          GitHub Cloud Sync
        </UiDialogTitle>
        <UiDialogDescription>
          Store your resumes in a private GitHub Gist so you can access, edit, and restore them on any device.
        </UiDialogDescription>
      </UiDialogHeader>

      <div class="space-y-4 py-2 text-sm">
        <!-- Connected Account Card -->
        <div
          v-if="profile"
          class="hstack justify-between p-3 rounded-lg border bg-muted/40"
        >
          <div class="hstack gap-x-3">
            <img
              :src="profile.avatar_url"
              :alt="profile.login"
              class="size-9 rounded-full border"
            />
            <div>
              <div class="font-medium text-foreground">
                {{ profile.name || profile.login }}
              </div>
              <div class="text-xs text-muted-foreground">@{{ profile.login }}</div>
            </div>
          </div>
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            @click="disconnect"
          >
            Disconnect
          </UiButton>
        </div>

        <!-- Token Input Section (if not connected) -->
        <div v-else class="space-y-2">
          <label class="block font-medium text-xs text-foreground">
            Personal Access Token (Classic)
          </label>
          <div class="flex gap-x-2">
            <UiInput
              v-model="inputToken"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              class="font-mono text-xs"
              @keyup.enter="connect"
            />
            <UiButton
              :disabled="!inputToken.trim() || connecting"
              class="shrink-0"
              @click="connect"
            >
              <span v-if="connecting" i-line-md:loading-loop mr-1 />
              Connect
            </UiButton>
          </div>

          <p class="text-xs text-muted-foreground leading-relaxed">
            Need a token?
            <a
              href="https://github.com/settings/tokens/new?description=Oh+My+CV+Cloud+Sync&scopes=gist"
              target="_blank"
              rel="noopener noreferrer"
              class="underline text-primary hover:text-primary/80 font-medium inline-flex items-center gap-0.5"
            >
              Generate token with 'gist' scope
              <span i-lucide:external-link class="size-3" />
            </a>
            (only requires the <code>gist</code> permission).
          </p>
        </div>

        <!-- Sync Actions (Available when connected) -->
        <div v-if="isConnected" class="space-y-3 pt-2">
          <div class="grid grid-cols-2 gap-2.5">
            <UiButton
              class="w-full gap-1.5"
              :disabled="syncing"
              @click="push"
            >
              <span v-if="syncing && currentAction === 'push'" i-line-md:loading-loop />
              <span v-else i-lucide:cloud-upload text-base />
              Push to GitHub
            </UiButton>

            <UiButton
              variant="secondary"
              class="w-full gap-1.5"
              :disabled="syncing"
              @click="pull"
            >
              <span v-if="syncing && currentAction === 'pull'" i-line-md:loading-loop />
              <span v-else i-lucide:cloud-download text-base />
              Pull from GitHub
            </UiButton>
          </div>

          <!-- Auto-Sync Toggle -->
          <div class="hstack justify-between pt-2 border-t text-xs text-muted-foreground">
            <label for="auto-sync" class="cursor-pointer select-none">
              Auto-sync to GitHub when saving resumes (<kbd>⌘S</kbd>)
            </label>
            <input
              id="auto-sync"
              type="checkbox"
              v-model="autoSync"
              class="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
              @change="toggleAutoSync"
            />
          </div>

          <div v-if="lastSyncTime" class="text-[11px] text-muted-foreground text-center">
            Last synced: {{ lastSyncTime }}
          </div>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { gistService, type GithubUserProfile, storageService } from "~/utils/storage";

const emit = defineEmits<{
  (e: "update"): void;
}>();

const isOpen = ref(false);
const inputToken = ref("");
const isConnected = ref(false);
const connecting = ref(false);
const syncing = ref(false);
const currentAction = ref<"push" | "pull" | null>(null);
const profile = ref<GithubUserProfile | null>(null);
const autoSync = ref(gistService.isAutoSyncEnabled());
const lastSyncTime = ref<string>("");

const checkConnection = async () => {
  if (!gistService.hasToken()) {
    isConnected.value = false;
    profile.value = null;
    return;
  }

  try {
    const user = await gistService.verifyUser();
    profile.value = user;
    isConnected.value = true;
  } catch {
    isConnected.value = false;
    profile.value = null;
  }
};

const onOpen = async () => {
  autoSync.value = gistService.isAutoSyncEnabled();
  await checkConnection();
};

const connect = async () => {
  if (!inputToken.value.trim()) return;
  connecting.value = true;

  try {
    gistService.setToken(inputToken.value.trim());
    const user = await gistService.verifyUser();
    profile.value = user;
    isConnected.value = true;
    inputToken.value = "";
    toast.success(`Connected to GitHub as @${user.login}`);
  } catch (err: any) {
    gistService.clearToken();
    isConnected.value = false;
    profile.value = null;
    toast.error(err.message || "Failed to verify GitHub token.");
  } finally {
    connecting.value = false;
  }
};

const disconnect = () => {
  gistService.clearToken();
  isConnected.value = false;
  profile.value = null;
  inputToken.value = "";
  toast.info("Disconnected from GitHub.");
};

const push = async () => {
  syncing.value = true;
  currentAction.value = "push";

  try {
    const result = await storageService.syncToGithub();
    lastSyncTime.value = new Date(result.updated_at).toLocaleTimeString();
    toast.success("Successfully pushed resumes to your GitHub Gist!");
  } catch (err: any) {
    toast.error(err.message || "Failed to push to GitHub.");
  } finally {
    syncing.value = false;
    currentAction.value = null;
  }
};

const pull = async () => {
  syncing.value = true;
  currentAction.value = "pull";

  try {
    await storageService.syncFromGithub();
    lastSyncTime.value = new Date().toLocaleTimeString();
    emit("update");
    toast.success("Successfully restored resumes from GitHub Gist!");
    isOpen.value = false;
  } catch (err: any) {
    toast.error(err.message || "Failed to pull from GitHub.");
  } finally {
    syncing.value = false;
    currentAction.value = null;
  }
};

const toggleAutoSync = () => {
  gistService.setAutoSync(autoSync.value);
};

onMounted(() => {
  checkConnection();
});
</script>
