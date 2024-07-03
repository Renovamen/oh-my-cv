import type { ValidVersion } from "~/composables/constant";
import type { StorageJsonData, DbResumeEmpty } from "./db";

export type StorageJsonDataV0 = {
  [id: string]: DbResumeEmpty & {
    update?: string;
  };
};

export type ValidStorageJsonData = StorageJsonDataV0 | StorageJsonData;

export type MigrateReturn = {
  from: ValidVersion;
  to: ValidVersion;
  data: StorageJsonData;
};

export class MigrateService {
  private _from: ValidVersion;
  private _to: ValidVersion;

  constructor(fromVersion?: ValidVersion | null) {
    const { VERSION } = useConstant();

    this._from = fromVersion ?? VERSION.EMPTY_FALLBACK;
    this._to = VERSION.CURRENT;
  }

  private _return = (data: StorageJsonData): MigrateReturn => ({
    from: this._from,
    to: this._to,
    data
  });

  public async migrate(storage: ValidStorageJsonData): Promise<MigrateReturn> {
    switch (this._from) {
      case this._to:
        return this._return(storage as StorageJsonData);
      case "v0":
        return this.fromV0(storage as StorageJsonDataV0);
      default:
        throw new Error(`Migration from version ${this._from} is not supported`);
    }
  }

  public async fromV0(storage: StorageJsonDataV0): Promise<MigrateReturn> {
    const newStorage: StorageJsonData = {};

    const _migrateCss = (css: string) =>
      css
        // Citations
        .replace(
          /#vue-smart-pages-preview\s+ul\.crossref-list\s*{/g,
          `#resume-preview [data-scope="cross-ref"][data-part="definitions"] {`
        )
        .replace(
          /#vue-smart-pages-preview\s+li\.crossref-item\s+p\s*{/g,
          `#resume-preview [data-scope="cross-ref"][data-part="definition"] p {`
        )
        .replace(
          /(#vue-smart-pages-preview\s+li\.crossref-item::marker\s*{[^}]*})/g,
          (match) =>
            match.replace(
              /content:\s*attr\(\s*data-caption\s*\)\s*;/g,
              "content: attr(data-label);"
            )
        )
        .replace(
          /#vue-smart-pages-preview\s+li\.crossref-item::marker\s*{/g,
          `#resume-preview [data-scope="cross-ref"][data-part="definition"]::marker {`
        )
        .replace(
          /#vue-smart-pages-preview\s+sup\.crossref-ref\s*{/g,
          `#resume-preview [data-scope="cross-ref"][data-part="reference"] {`
        )
        // Dark mode
        .replace(
          /\.dark\s+#vue-smart-pages-preview\s*{\s*background-color:\s*#334155\s*;\s*color:\s*#e5e7eb\s*;\s*}/,
          `.dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(213, 12%, 15%);
  color: hsl(216, 12%, 84%);
}`
        )
        .replace(/\s+\.dark\s+#vue-smart-pages-preview\s+a\s*{[^}]*}/g, "")
        // Basic
        .replace(
          /#vue-smart-pages-preview\s*{/g,
          `#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {`
        )
        .replace(/#vue-smart-pages-preview/g, "#resume-preview");

    Object.entries(storage).forEach(([id, data]) => {
      const { update, ...rest } = data;

      newStorage[id] = {
        ...rest,
        created_at: id,
        updated_at: update ?? id
      };

      const newCss = _migrateCss(newStorage[id].css);

      if (newCss !== newStorage[id].css) {
        console.log(`Migration: CSS updated for resume ${id}.`);
        newStorage[id].css = newCss;
      }
    });

    return this._return(newStorage);
  }
}
