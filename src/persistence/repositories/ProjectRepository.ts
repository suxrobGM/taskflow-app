import AppDataSource from '../DataSource';
import {Project} from '../entities';
import {ensureDatabaseInitialized} from '../InitDatabase';

export class ProjectRepository {
  private readonly projectRepository = AppDataSource.getRepository(Project);

  async getAllProjects(): Promise<Project[]> {
    await ensureDatabaseInitialized();
    return this.projectRepository.find();
  }

  async getProjectById(id: string): Promise<Project | null> {
    await ensureDatabaseInitialized();
    return this.projectRepository.findOneBy({id: id});
  }

  async createProject(options: CreateProjectOptions): Promise<Project> {
    await ensureDatabaseInitialized();
    const project = this.projectRepository.create({
      name: options.name,
      description: options.description,
    });
    await this.projectRepository.save(project);
    return project;
  }

  async updateProject(id: string, options: UpdateProjectOptions): Promise<Project> {
    await ensureDatabaseInitialized();
    const project = await this.projectRepository.findOneBy({id: id});
    let saveChanges = false;

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    if (options.name !== project.name) {
      project.name = options.name;
      saveChanges = true;
    }
    if (project.description !== options.description) {
      project.description = options.description;
      saveChanges = true;
    }

    if (saveChanges) {
      await this.projectRepository.save(project);
    }
    
    return project;
  }
}

interface CreateProjectOptions {
  name: string;
  description?: string;
}

interface UpdateProjectOptions {
  name: string;
  description?: string;
}
