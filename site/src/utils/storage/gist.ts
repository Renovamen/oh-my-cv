import { isClient } from "@renovamen/utils";
import type { StorageJson } from "./db";

const GIST_FILENAME = "ohmycv_data.json";
const GIST_DESCRIPTION = "Oh My CV - Cloud Storage Backup";
const TOKEN_KEY = "ohmycv_github_token";
const GIST_ID_KEY = "ohmycv_gist_id";
const AUTO_SYNC_KEY = "ohmycv_github_auto_sync";

export interface GithubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
}

export class GithubGistService {
  public getToken(): string {
    if (!isClient) return "";
    return localStorage.getItem(TOKEN_KEY) || "";
  }

  public setToken(token: string): void {
    if (!isClient) return;
    localStorage.setItem(TOKEN_KEY, token.trim());
  }

  public clearToken(): void {
    if (!isClient) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(GIST_ID_KEY);
  }

  public hasToken(): boolean {
    return Boolean(this.getToken());
  }

  public getGistId(): string | null {
    if (!isClient) return null;
    return localStorage.getItem(GIST_ID_KEY);
  }

  public setGistId(id: string | null): void {
    if (!isClient) return;
    if (id) {
      localStorage.setItem(GIST_ID_KEY, id);
    } else {
      localStorage.removeItem(GIST_ID_KEY);
    }
  }

  public isAutoSyncEnabled(): boolean {
    if (!isClient) return false;
    const val = localStorage.getItem(AUTO_SYNC_KEY);
    return val === null ? true : val === "true";
  }

  public setAutoSync(enabled: boolean): void {
    if (!isClient) return;
    localStorage.setItem(AUTO_SYNC_KEY, String(enabled));
  }

  private _getHeaders(): HeadersInit {
    const token = this.getToken();
    if (!token) {
      throw new Error("GitHub Personal Access Token is required.");
    }
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    };
  }

  /**
   * Verify whether the token is valid and return basic user information.
   */
  public async verifyUser(): Promise<GithubUserProfile> {
    const res = await fetch("https://api.github.com/user", {
      headers: this._getHeaders()
    });

    if (res.status === 401) {
      throw new Error("Invalid GitHub token. Please verify permissions.");
    }
    if (!res.ok) {
      throw new Error(`GitHub request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return {
      login: data.login,
      name: data.name ?? null,
      avatar_url: data.avatar_url,
      html_url: data.html_url
    };
  }

  /**
   * Locate an existing "Oh My CV" gist or create a new private one.
   */
  public async getOrCreateGist(jsonData: StorageJson): Promise<string> {
    const currentId = this.getGistId();

    if (currentId) {
      try {
        const verifyRes = await fetch(`https://api.github.com/gists/${currentId}`, {
          headers: this._getHeaders()
        });
        if (verifyRes.ok) {
          return currentId;
        }
      } catch {
        // Fall back to searching or creating
      }
    }

    // Search existing gists for one matching our backup filename or description
    try {
      const listRes = await fetch("https://api.github.com/gists?per_page=100", {
        headers: this._getHeaders()
      });
      if (listRes.ok) {
        const gists = await listRes.json();
        const found = gists.find(
          (g: any) =>
            (g.files && g.files[GIST_FILENAME]) ||
            g.description === GIST_DESCRIPTION
        );
        if (found) {
          this.setGistId(found.id);
          return found.id;
        }
      }
    } catch {
      // Continue to create a new Gist
    }

    // Create a new secret Gist
    const createRes = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        public: false,
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(jsonData, null, 2)
          }
        }
      })
    });

    if (!createRes.ok) {
      const errBody = await createRes.text();
      throw new Error(`Failed to create GitHub Gist (${createRes.status}): ${errBody}`);
    }

    const created = await createRes.json();
    this.setGistId(created.id);
    return created.id;
  }

  /**
   * Push current storage data to GitHub Gist
   */
  public async pushToGist(jsonData: StorageJson): Promise<{ gistId: string; updated_at: string }> {
    const gistId = await this.getOrCreateGist(jsonData);

    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(jsonData, null, 2)
          }
        }
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to push data to GitHub Gist (${res.status}): ${err}`);
    }

    const data = await res.json();
    return {
      gistId,
      updated_at: data.updated_at
    };
  }

  /**
   * Pull raw JSON backup content from GitHub Gist
   */
  public async pullFromGist(): Promise<string> {
    let gistId = this.getGistId();

    if (!gistId) {
      const listRes = await fetch("https://api.github.com/gists?per_page=100", {
        headers: this._getHeaders()
      });
      if (!listRes.ok) {
        throw new Error("Failed to list GitHub Gists.");
      }
      const gists = await listRes.json();
      const found = gists.find(
        (g: any) =>
          (g.files && g.files[GIST_FILENAME]) ||
          g.description === GIST_DESCRIPTION
      );
      if (!found) {
        throw new Error("No 'Oh My CV' backup gist found in your GitHub account.");
      }
      gistId = found.id;
      this.setGistId(gistId);
    }

    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: this._getHeaders()
    });

    if (!res.ok) {
      throw new Error(`Failed to retrieve GitHub Gist (${res.status}).`);
    }

    const gistData = await res.json();
    const file = gistData.files?.[GIST_FILENAME];
    if (!file || !file.content) {
      throw new Error(`File '${GIST_FILENAME}' not found in Gist.`);
    }

    return file.content;
  }
}

export const gistService = new GithubGistService();
