import * as localForage from "localforage";
import { isClient } from "@vueuse/core";
import { copy } from "@renovamen/utils";
import type {
  DbService,
  ExportedStorageJson,
  DbResume,
  DbResumeEmpty,
  DbResumeUpdate
} from "./db";

type LocalForageOldStorage = {
  [id: string]: DbResumeEmpty & {
    update?: string;
    updated_at?: string;
    created_at?: string;
  };
};

export class LocalForageDbService implements DbService {
  private _key = "ohmycv_data";

  private _storageError = () => ({
    data: null,
    error: {
      message: "Error occurred while accessing local storage."
    }
  });

  private _notFoundError = (id: number) => ({
    data: null,
    error: {
      message: `Resume ${id} not found.`
    }
  });

  private _success = <T>(data: T) => ({
    data,
    error: null
  });

  private _currentTime = () => new Date().getTime().toString();

  /**
   * Get the storage object. Note that this method will return an empty object
   * instead of null if the storage is empty. While a null return value indicates
   * an error occurred while accessing the storage.
   *
   * @returns Storage object or null if an error occurred
   */
  private async _storage(): Promise<ExportedStorageJson | null> {
    if (!isClient) return {}; // Server-side rendering

    try {
      const storage = await localForage.getItem<LocalForageOldStorage>(this._key);
      return storage ? await this._migrate(storage) : {};
    } catch (error) {
      return null;
    }
  }

  private async _setItems(storage: ExportedStorageJson) {
    await localForage.setItem(this._key, storage);
  }

  /**
   * Check if the resume exists in the storage
   *
   * @param id
   * @param allowNotExist If true, will not return error if the resume does not exist
   *
   * @returns Error if the storage is not available or the resume does not exist,
   *         otherwise the whole storage object
   */
  private async _getStorageIfIdExists(id: number, allowNotExist: boolean = false) {
    const storage = await this._storage();

    // Check storage
    if (!storage) return this._storageError();
    // Check if resume exists
    if (!storage[id])
      return allowNotExist ? this._success(null) : this._notFoundError(id);

    return this._success(storage);
  }

  private async _migrate(storage: LocalForageOldStorage): Promise<ExportedStorageJson> {
    const newStorage: ExportedStorageJson = {};

    const needMigrate = Object.entries(storage).some(([id, data]) => {
      const { update, ...rest } = data;
      const requiresUpdate = !rest.created_at || !rest.updated_at || update;

      if (requiresUpdate) {
        if (!rest.created_at) rest.created_at = id;
        if (!rest.updated_at) rest.updated_at = update ?? rest.created_at;
      }

      newStorage[id] = rest as DbResume;
      return requiresUpdate;
    });

    if (needMigrate) await this._setItems(newStorage);

    return newStorage;
  }

  public async queryAll() {
    const storage = await this._storage();

    if (!storage) return this._storageError();

    const data = Object.entries(storage)
      .map(([id, data]) => ({ id: Number(id), ...data }))
      .sort(
        (a, b) =>
          b.updated_at.localeCompare(a.updated_at) ||
          b.created_at.localeCompare(a.created_at)
      );

    return this._success(data);
  }

  public async queryById(id: number) {
    const res = await this._getStorageIfIdExists(id, true);

    if (!res.data) return res;
    else return this._success({ id, ...res.data[id] });
  }

  public async update(data: DbResumeUpdate, newUpdateTime: boolean) {
    const res = await this._getStorageIfIdExists(data.id);

    if (res.error) return res;

    const storage = res.data!;
    const { id, ...updatedResume } = {
      ...storage[data.id],
      ...data,
      updated_at: newUpdateTime ? this._currentTime() : storage[data.id].updated_at
    };

    storage[id] = updatedResume;
    await this._setItems(storage);

    return this._success({ id, ...updatedResume });
  }

  public async create(data: DbResumeEmpty | DbResume) {
    const storage = await this._storage();

    // Check storage
    if (!storage) return this._storageError();

    // Check if resume already exists
    if ("id" in data && storage[data.id]) {
      return {
        data: null,
        error: {
          message: `Resume ${data.id} already exists.`
        }
      };
    }

    const currentTime = this._currentTime();

    // Generate a new "id", "updated_at" and "created_at" if not provided
    const createdData: DbResume = {
      updated_at: currentTime,
      created_at: currentTime,
      id: Number(currentTime),
      ...data
    };

    const { id, ...resume } = createdData;

    storage[id] = resume;
    await this._setItems(storage);

    return this._success(createdData);
  }

  public async delete(id: number) {
    const res = await this._getStorageIfIdExists(id);
    if (res.error) return res;

    const storage = res.data!;
    const deleted = copy(storage[id]);

    delete storage[id];
    await this._setItems(storage);

    return this._success({ id, ...deleted });
  }
}
