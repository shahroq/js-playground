import * as fs from "fs/promises";
import * as path from "path";

export interface JSONFileResult<T> {
  data: T;
  existed: boolean;
}

export class JSONFileUtils {
  static async loadJSON<T>(filePath: string): Promise<JSONFileResult<T>> {
    try {
      // Read the file
      const fileContent = await fs.readFile(filePath, "utf-8");

      // Parse JSON content
      try {
        const data = JSON.parse(fileContent);
        console.log(`✓ Loaded existing JSON file: ${filePath}`);
        return { data, existed: true };
      } catch (parseError) {
        // Invalid JSON, throw error
        throw new Error(`Invalid JSON in file ${filePath}.`);
      }
    } catch (error: any) {
      // File doesn't exist
      if (error.code === "ENOENT") {
        throw new Error(`Database file not found: ${filePath}.`);
      } else {
        // Other errors (permissions, etc.)
        throw new Error(`Failed to access file ${filePath}: ${error.message}`);
      }
    }
  }

  static async saveJSON<T>(filePath: string, data: T): Promise<void> {
    const dir = path.dirname(filePath);

    // Ensure directory exists
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      // Directory already exists or created
    }

    // Write to file with pretty formatting
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
