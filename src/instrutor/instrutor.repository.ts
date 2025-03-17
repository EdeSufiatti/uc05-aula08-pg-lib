import { Instrutor } from './../shared/model/instrutor';



export class InstrutorRepository {
  private database: any;
  constructor(database: any) {
    this.database = database;
  }
  async create(instrutor: Instrutor): Promise<Instrutor> {
    const queryInsertInstrutores = `
        insert into instrutores (nome, data_nascimento, cpf,
          telefone, sexo, email, data_admissao,data_desligamento)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
      `;

    const result = await this.database.one(queryInsertInstrutores, [
      instrutor.nome,
      instrutor.dataNascimento,
      instrutor.cpf,
      instrutor.telefone,
      instrutor.sexo,
      instrutor.email,
      instrutor.data_admissao,
      instrutor.data_desligamento
    ]);
    return {
      ...instrutor,
      id: result.id,
    }

  }

  async getAll(): Promise<Instrutor[]> {
    const result = await this.database.query(
      `select nome, data_nascimento, cpf,
          telefone, sexo, email, data_admissao,data_desligamento
      from instrutores`,
      []
    );
    if (result.length === 0) {
      return [];
    }
    return result.map((instrutor: any) => ({
      id: instrutor.id,
      nome: instrutor.nome,
      dataNascimento: instrutor.data_nascimento,
      cpf: instrutor.cpf,
      telefone: instrutor.telefone,
      sexo: instrutor.sexo,
      email: instrutor.email,
      data_admissao: instrutor.data_admissao,
      data_Desligamento: instrutor.data_desligamento,
    }));


  }

  async getById(id: number): Promise<Instrutor | undefined> {
    const [result] = await this.database.query(
      `select nome, data_nascimento, cpf,
          telefone, sexo, email, data_admissao,data_desligamento
        from instrutores
      where id = $1`,
      [id]
    );
    if (!result) return;
    return {
      id,
      nome: result.nome,
      dataNascimento: result.data_nascimento,
      cpf: result.cpf,
      telefone: result.telefone,
      sexo: result.sexo,
      email: result.email,
      data_admissao: result.data_admissao,
      data_desligamento: result.data_desligamento,
    };
  }
  async updateInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      // Monta a query de update
      const statementUpdateInstrutor = `
        update instrutores set
          nome = $1,
          data_nascimento = $2,
          cpf = $3,
          telefone = $4,
          sexo = $5,
          email = $6,
          data_admissao = $7,
          data_desligamento = $8
        where id = $9
      `;
      await this.database.query(statementUpdateInstrutor, [
        instrutor.nome,
        instrutor.dataNascimento,
        instrutor.cpf,
        instrutor.telefone,
        instrutor.sexo,
        instrutor.email,
        instrutor.data_admissao,
        instrutor.data_desligamento,
        id,
      ]);
    } catch (error) {
      throw new Error("Erro ao atualizar instrutor");
    }
  }

  async updatePartOfInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      // Monta a query de update
      const statementUpdateInstrutor = `
        update instrutores set
          nome = $1,
          data_nascimento = $2,
          cpf = $3,
          telefone = $4,
          sexo = $5,
          email = $6,
          data_admissao = $7,
          data_desligamento = $8
        where id = $9
      `;
      await this.database.query(statementUpdateInstrutor, [
        instrutor.nome,
        instrutor.dataNascimento,
        instrutor.cpf,
        instrutor.telefone,
        instrutor.sexo,
        instrutor.email,
        instrutor.data_admissao,
        instrutor.data_desligamento,
        id,
      ]);
    } catch (error) {
      throw new Error("Erro ao atualizar instrutor");
    }
  }

  async delete(id: number) {
    const instrutor = await this.getById(id);

    if (!instrutor) {
      throw new Error("Instrutor nao encontrado");
    }
    // Monta a query de exclusão
    const statementDeleteInstrutores = `delete from instrutores where id = $1`;
    await this.database.query(statementDeleteInstrutores, [id]);
  }
}
