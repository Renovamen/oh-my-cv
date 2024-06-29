import { downloadFile } from "@renovamen/utils";
import { LocalForageDbService } from "./localForage";
import { setResume, IsValid } from "./utils";
import type { DbService, ExportedStorageJson, DbResumeUpdate, DbResumeEmpty } from "./db";

const AVAILABLE_SERVICES: Record<string, DbService> = {
  localForage: new LocalForageDbService()
  // TODO: Support PGlite: https://github.com/electric-sql/pglite
};

export class StorageService {
  private _db: DbService;

  constructor(service: keyof typeof AVAILABLE_SERVICES) {
    this._db = AVAILABLE_SERVICES[service];
  }

  private _createEmptyResume(): DbResumeEmpty {
    const { DEFAULT } = useConstant();

    return {
      name: DEFAULT.RESUME_NAME,
      markdown: DEFAULT.MD_CONTENT,
      css: DEFAULT.CSS_CONTENT,
      styles: DEFAULT.STYLES
    };
  }

  public async getResumes() {
    const { data, error } = await this._db.queryAll();

    if (error) {
      // TODO: Use toast to show error message
      console.error("Get resumes error:", error.message);
    }

    return data ?? [];
  }

  public async updateResume(data: DbResumeUpdate, newUpdateTime = true) {
    const { data: updatedData, error } = await this._db.update(data, newUpdateTime);

    if (error) {
      // TODO: Use toast to show error message
      console.error("Update error:", error.message);
    } else {
      const toast = useToast();
      toast.save();
    }

    return updatedData;
  }

  public async createResume() {
    const { data, error } = await this._db.create(this._createEmptyResume());

    if (error) {
      // TODO: Use toast to show error message
      console.error("Create error:", error.message);
    } else {
      const toast = useToast();
      toast.new();
    }

    return data;
  }

  public async deleteResume(id: number) {
    const { data, error } = await this._db.delete(id);

    if (error) {
      // TODO: Use toast to show error message
      console.error("Delete error:", error.message);
    } else {
      const toast = useToast();
      toast.delete(data!.name);
    }

    return data;
  }

  public async switchToResume(id: number) {
    const { setData } = useDataStore();

    setData("loaded", false);

    const { data, error } = await this._db.queryById(id);

    if (error) {
      // TODO: Use toast to show error message
      console.error("Switch error:", error.message);
    } else if (!data) {
      // TODO: Use toast to show error message
      console.error(`Switch error: Resume ${id} not found.`);
    } else {
      await setResume(data!);

      const toast = useToast();
      toast.switch(data!.name);

      setData("loaded", true);
    }

    return data;
  }

  public async duplicateResume(id: number) {
    const { data, error } = await this._db.queryById(id);

    if (error) {
      // TODO: Use toast to show error message
      console.error("Duplicate error:", error.message);
    } else if (!data) {
      // TODO: Use toast to show error message
      console.error(`Switch error: Resume ${id} not found.`);
    } else {
      const { id, updated_at, created_at, ...duplicated } = data!;

      const { data: duplicatedData, error: createError } = await this._db.create({
        ...duplicated,
        name: duplicated.name + " Copy"
      });

      if (createError) {
        // TODO: Use toast to show error message
        console.error("Duplicate error:", createError.message);
      } else {
        const toast = useToast();
        toast.duplicate(duplicatedData!.name);
      }
    }
  }

  public async exportToJSON() {
    const data = await this.getResumes();

    const json = data.reduce((acc, { id, ...resume }) => {
      acc[id] = resume;
      return acc;
    }, {} as ExportedStorageJson);

    downloadFile("ohmycv_data.json", JSON.stringify(json));
  }

  /**
   * Check the validity of and import JSON data
   *
   * @param content JSON string
   */
  public async importFromJson(content: string) {
    const toast = useToast();

    const data = (() => {
      try {
        return JSON.parse(content);
      } catch (error) {
        return false;
      }
    })();

    if (!IsValid.importedJson(data)) {
      console.error("Import error: Invalid data.");
      toast.import(false);
      return;
    }

    for (const [_id, resume] of Object.entries(data as ExportedStorageJson)) {
      const id = Number(_id);
      const { data, error } = await this._db.queryById(id);

      if (error) {
        console.error("Import error: Storage error.");
        break;
      }

      if (data) {
        await this._db.update({ id, ...resume }, false);
      } else {
        await this._db.create({ id, ...resume });
      }
    }

    toast.import(true);
  }
}

export const storageService = new StorageService("localForage");

export * from "./db";
export { IsValid } from "./utils";
