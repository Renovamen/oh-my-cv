import { i18n } from "~/plugins/i18n";

const { t } = i18n.global;

export const useToast = () => {
  const { $toast } = useNuxtApp();

  const save = () => {
    $toast.value.create({
      description: t("notification.save"),
      type: "success"
    });
  };

  const switchResume = (msg: string) => {
    $toast.value.create({
      description: t("notification.switch", { msg }),
      type: "info"
    });
  };

  const deleteResume = (msg: string) => {
    $toast.value.create({
      description: t("notification.delete", { msg }),
      type: "error"
    });
  };

  const newResume = () => {
    $toast.value.create({
      description: t("notification.new"),
      type: "success"
    });
  };

  const duplicate = (msg: string) => {
    $toast.value.create({
      description: t("notification.duplicate", {
        old: msg,
        new: msg + " Copy"
      }),
      type: "success"
    });
  };

  const correct = (msg: true | number) => {
    if (msg === true) {
      $toast.value.create({
        description: t("notification.correct.no"),
        type: "info"
      });
    } else {
      $toast.value.create({
        description: t("notification.correct.yes", { num: msg }),
        type: "success"
      });
    }
  };

  const importResume = (msg: boolean) => {
    if (msg) {
      $toast.value.create({
        description: t("notification.import.yes"),
        type: "success"
      });
    } else {
      $toast.value.create({
        description: t("notification.import.no"),
        type: "error"
      });
    }
  };

  return {
    save,
    switch: switchResume,
    delete: deleteResume,
    new: newResume,
    duplicate,
    correct,
    import: importResume
  };
};
