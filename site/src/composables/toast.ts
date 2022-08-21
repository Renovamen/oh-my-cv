import { useToast } from "vue-toastification";

export const watchToast = () => {
  const toast = useToast();
  const { t } = useI18n();
  const { toastFlag, closeToastFlag } = useToastStore();
  const { data } = useDataStore();

  watch(
    () => toastFlag.switch,
    () => {
      if (toastFlag.switch) {
        toast.info(`${t("notification.switch")} "${data.curResumeName}"`);
        closeToastFlag("switch");
      }
    }
  );

  watch(
    () => toastFlag.delete,
    () => {
      if (toastFlag.delete) {
        toast.error(t("notification.delete"));
        closeToastFlag("delete");
      }
    }
  );

  watch(
    () => toastFlag.new,
    () => {
      if (toastFlag.new) {
        toast.success(t("notification.new"));
        closeToastFlag("new");
      }
    }
  );

  watch(
    () => toastFlag.save,
    () => {
      if (toastFlag.save) {
        toast.success(t("notification.save"));
        closeToastFlag("save");
      }
    }
  );
};
