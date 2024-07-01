import { toast } from "vue-sonner";
import type { ChangedCase } from "@ohmycv/case-police";

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

  const correct = (msg?: ChangedCase[]) => {
    if (msg?.length) {
      const groups = msg.reduce<Record<string, number>>((acc, { from, to }) => {
        const key = `${from} → ${to}`;
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {});

      const description = Object.entries(groups)
        .map(([key, count]) => `${key}${count > 1 ? ` (x${count})` : ""}`)
        .join(", ");

      toast.success(nuxtApp.$i18n.t("notification.correct.yes", { num: msg.length }), {
        description
      });
    } else {
      toast.info(nuxtApp.$i18n.t("notification.correct.no"));
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
