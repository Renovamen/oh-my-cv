export const REQUIRED_DATA_TYPES = {
  v0: [
    {
      fields: ["name", "markdown", "css", "styles.paper", "styles.themeColor"],
      types: "string"
    },
    {
      fields: ["update"],
      types: ["string", "undefined"]
    },
    {
      fields: [
        "styles.fontSize",
        "styles.lineHeight",
        "styles.marginH",
        "styles.marginV",
        "styles.paragraphSpace"
      ],
      types: "number"
    }
  ],
  v1: [
    {
      fields: [
        "name",
        "markdown",
        "css",
        "updated_at",
        "created_at",
        "styles.paper",
        "styles.themeColor"
      ],
      types: "string"
    },
    {
      fields: [
        "styles.fontSize",
        "styles.lineHeight",
        "styles.marginH",
        "styles.marginV",
        "styles.paragraphSpace"
      ],
      types: "number"
    }
  ]
};

export const VALID_VERSIONS = Object.keys(REQUIRED_DATA_TYPES);

export type ValidVersion = keyof typeof REQUIRED_DATA_TYPES;

export const CURRENT_VERSION: ValidVersion = "v1";
export const EMPTY_VERSION_FALLBACK: ValidVersion = "v0";

export const VERSION_STORAGE_KEY = "ohmycv_version";
