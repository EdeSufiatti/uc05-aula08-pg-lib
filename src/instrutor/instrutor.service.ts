import { Instrutor } from "../shared/model/instrutor";
import { InstrutorRepository } from "./instrutor.repository";

export class InstrutorService {
  constructor(private instrutorRepository: InstrutorRepository) {
    this.instrutorRepository = instrutorRepository;

  }

  async create(instrutor: Instrutor): Promise<Instrutor> {
    return this.instrutorRepository.create(instrutor);
  }

  async getAll(): Promise<Instrutor[]> {
    return this.instrutorRepository.getAll();
  }

  async getById(id: number): Promise<Instrutor | undefined> {
    return this.instrutorRepository.getById(id);
  }
  async updateInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    return this.instrutorRepository.updateInstrutor(id, instrutor);
  }
  async updatePartOfInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    return this.instrutorRepository.updatePartOfInstrutor(id, instrutor);
  }
  async delete(id: number): Promise<void> {
    return this.instrutorRepository.delete(id);
  }
}
