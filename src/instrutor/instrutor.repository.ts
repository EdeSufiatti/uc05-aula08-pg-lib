import { Instrutor } from './../shared/model/instrutor';



export class InstrutorRepository {
  private database: any;
  constructor(database: any) {
    this.database = database;
  }
  async create(instrutor: Instrutor): Promise<Instrutor> {
    const queryInsertInstrutores = `
        insert into instrutores (nome, data_nascimento, cpf,
          matricula, sexo, email, data_admissao,data_desligamento)
        values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
      `;

    const result = await this.database.one(queryInsertInstrutores, [
      instrutor.nome,
      instrutor.data_nascimento,
      instrutor.cpf,
      instrutor.matricula,
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
          matricula, sexo, email, data_admissao,data_desligamento
      from instrutores`,
      []
    );
    if (result.length === 0) {
      return [];
    }
    return result.map((instrutor: any) => ({
      id: instrutor.id,
      nome: instrutor.nome,
      data_nascimento: instrutor.data_nascimento,
      cpf: instrutor.cpf,
      matricula: instrutor.matricula,
      sexo: instrutor.sexo,
      email: instrutor.email,
      data_admissao: instrutor.data_admissao,
      data_Desligamento: instrutor.data_desligamento,
    }));


  }

  async getById(id: number): Promise<Instrutor | undefined> {
    const [result] = await this.database.query(
      `select nome, data_nascimento, cpf,
          matricula, sexo, email, data_admissao,data_desligamento
        from instrutores
      where id = $1`,
      [id]
    );
    if (!result) return;
    return {
      id,
      nome: result.nome,
      data_nascimento: result.data_nascimento,
      cpf: result.cpf,
      matricula: result.matricula,
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
          matricula = $4,
          sexo = $5,
          email = $6,
          data_admissao = $7,
          data_desligamento = $8
        where id = $9
      `;
      await this.database.query(statementUpdateInstrutor, [
        instrutor.nome,
        instrutor.data_nascimento,
        instrutor.cpf,
        instrutor.matricula,
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

 /* async updatePartOfInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      // Monta a query de update
      const statementUpdateInstrutor = `
        update instrutores set
          nome = $1,
          data_nascimento = $2,
          cpf = $3,
          matricula = $4,
          sexo = $5,
          email = $6,
          data_admissao = $7,
          data_desligamento = $8
        where id = $9
      `;
      await this.database.query(statementUpdateInstrutor, [
        instrutor.nome,
        instrutor.data_nascimento,
        instrutor.cpf,
        instrutor.matricula,
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
*/
async updatePartOfInstrutor(id: number, instrutor: Partial<Instrutor>): Promise<void> {
  try {

    const saved = await this.getById(id);
    if (!saved) {
      throw new Error("Instrutor não encontrado");
    }


    let instrutorParams: Instrutor = {} as Instrutor;


    instrutorParams.nome = (instrutor.nome !== undefined && instrutor.nome !== saved.nome)
      ? instrutor.nome : saved.nome;

    instrutorParams.data_nascimento = (instrutor.data_nascimento !== undefined && instrutor.data_nascimento !== saved.data_nascimento)
      ? instrutor.data_nascimento : saved.data_nascimento;

    instrutorParams.cpf = (instrutor.cpf !== undefined && instrutor.cpf !== saved.cpf)
      ? instrutor.cpf : saved.cpf;

    instrutorParams.matricula = (instrutor.matricula !== undefined && instrutor.matricula !== saved.matricula)
      ? instrutor.matricula : saved.matricula;

    instrutorParams.sexo = (instrutor.sexo !== undefined && instrutor.sexo !== saved.sexo)
      ? instrutor.sexo : saved.sexo;

    instrutorParams.email = (instrutor.email !== undefined && instrutor.email !== saved.email)
      ? instrutor.email : saved.email;

    instrutorParams.data_admissao = (instrutor.data_admissao !== undefined && instrutor.data_admissao !== saved.data_admissao)
      ? instrutor.data_admissao : saved.data_admissao;

    instrutorParams.data_desligamento = (instrutor.data_desligamento !== undefined && instrutor.data_desligamento !== saved.data_desligamento)
      ? instrutor.data_desligamento : saved.data_desligamento;
s
    await this.updateInstrutor(id, instrutorParams);
  } catch (error) {
    throw error;
  }
}

  async delete(id: number) {
    const instrutor = await this.getById(id);

    if (!instrutor) {
      throw new Error("Instrutor nao encontrado");
    }

    const statementDeleteInstrutores = `delete from instrutores where id = $1`;
    await this.database.query(statementDeleteInstrutores, [id]);
  }
}
