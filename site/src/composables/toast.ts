import { toast } from "vue-sonner";

export const useToast = () => {
  const nuxtApp = useNuxtApp();

  const save = () => {
    toast.success(nuxtApp.$i18n.t("notification.save"));
  };

  const onSwitch = (msg: string) => {
    toast.info(nuxtApp.$i18n.t("notification.switch", { msg }));
  };

  const onDelete = (msg: string) => {
    toast.error(nuxtApp.$i18n.t("notification.delete", { msg }));
  };

  const onNew = () => {
    toast.success(nuxtApp.$i18n.t("notification.new"));
  };

  const duplicate = (msg: string) => {
    toast.success(
      nuxtApp.$i18n.t("notification.duplicate", {
        old: msg,
        new: msg + " Copy"
      })
    );
  };

  const correct = (msg: true | number) => {
    if (msg === true) {
      toast.info(nuxtApp.$i18n.t("notification.correct.no"));
    } else {
      toast.success(nuxtApp.$i18n.t("notification.correct.yes", { num: msg }));
    }
  };

  const onImport = (msg: boolean) => {
    if (msg) {
      toast.success(nuxtApp.$i18n.t("notification.import.yes"));
    } else {
      toast.error(nuxtApp.$i18n.t("notification.import.no"));
    }
  };

  return {
    save,
    switch: onSwitch,
    delete: onDelete,
    new: onNew,
    duplicate,
    correct,
    import: onImport
  };
};
