import { useToast } from "vue-toastification";

export const watchToast = () => {
  const toast = useToast();
  const { t } = useI18n();
  const { toastFlag, closeToastFlag } = useToastStore();

  watch(
    () => toastFlag.switch,
    () => {
      if (toastFlag.switch) {
        toast.info(t("notification.switch", { msg: toastFlag.switch }));
        closeToastFlag("switch");
      }
    }
  );

  watch(
    () => toastFlag.delete,
    () => {
      if (toastFlag.delete) {
        toast.error(t("notification.delete", { msg: toastFlag.delete }));
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

  watch(
    () => toastFlag.duplicate,
    () => {
      if (toastFlag.duplicate) {
        toast.success(
          t("notification.duplicate", {
            old: toastFlag.duplicate,
            new: toastFlag.duplicate + " Copy"
          })
        );
        closeToastFlag("duplicate");
      }
    }
  );
};
