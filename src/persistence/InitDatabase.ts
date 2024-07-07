import AppDataSource from "./DataSource";

export async function ensureDatabaseInitialized(): Promise<void> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}
