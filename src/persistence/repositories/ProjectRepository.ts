import AppDataSource from "../DataSource";
import {ensureDatabaseInitialized} from "../InitDatabase";
import {Project} from "../entities";
import {ProjectMapper} from '../mappers';
import {
  UpdateProjectDto,
  CreateProjectDto,
  ProjectDto,
} from "../models"


export class ProjectRepository {
  private readonly projectRepository = AppDataSource.getRepository(Project);

  async getAllProjects(): Promise<ProjectDto[]> {
    await ensureDatabaseInitialized();
    const projects = await this.projectRepository.find();
    return projects.map(project => ProjectMapper.toDto(project));
  }

  async getProjectById(id: string): Promise<ProjectDto | null> {
    await ensureDatabaseInitialized();
    const project = await this.projectRepository.findOneBy({id: id});
    return project ? ProjectMapper.toDto(project) : null;
  }

  async createProject(options: CreateProjectDto): Promise<ProjectDto> {
    await ensureDatabaseInitialized();
    const project = this.projectRepository.create({
      name: options.name,
      description: options.description,
    });
    const createdProject = await this.projectRepository.save(project);
    return ProjectMapper.toDto(createdProject);
  }

  async updateProject(id: string, options: UpdateProjectDto): Promise<ProjectDto> {
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
    if (options.description && options.description !== project.description) {
      project.description = options.description;
      saveChanges = true;
    }

    if (saveChanges) {
      await this.projectRepository.save(project);
    }

    return ProjectMapper.toDto(project);
  }
}
