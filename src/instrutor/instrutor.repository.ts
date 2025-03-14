export class InstrutorRepository {

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
      instrutor.data_Desligamento
    ]);
    return {
      id: result.id,
      ...instrutor,
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
      data_Desligamento: result.data_desligamento,
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
        instrutor.data_Desligamento,
        id,
      ]);
    } catch (error) {
      throw new Error("Erro ao atualizar instrutor");
    }
  }
}
async update PartOfInstrutor(id: number, instrutor: Instrutor): Promise < void> {
  try {
    // Obter os dados do instrutor do banco
    const saved = await this.getById(id);
    if(!saved) {
      throw new Error("Instrutor nao encontrado");
    }

    let instrutorParams: Instrutor = {} as Instrutor;

    // Nome
    instrutorParams.nome = saved.nome !== instrutor.nome ? instrutor.nome : saved.nome;
    // DataNascimento
    instrutorParams.dataNascimento = saved.dataNascimento !== instrutor.dataNascimento ? instrutor.dataNascimento : saved.dataNascimento;
    // CPF
    instrutorParams.cpf = saved.cpf !== instrutor.cpf ? instrutor.cpf : saved.cpf;
    // Telefone
    instrutor.telefone = saved.telefone !== instrutor.telefone ? instrutor.telefone : saved.telefone;
    // Sexo
    instrutorParams.sexo = saved.sexo !== instrutor.sexo ? instrutor.sexo : saved.sexo;
    // Email
    instrutorParams.email = saved.email !== instrutor.email ? instrutor.email : saved.email;
    // DataAdmissao
    instrutorParams.data_admissao = saved.data_admissao !== instrutor.data_admissao ? instrutor.data_admissao : saved.data_admissao;
    // DataDesligamento
    instrutorParams.data_Desligamento = saved.data_Desligamento !== instrutor.data_Desligamento ? instrutor.data_Desligamento : saved.data_Desligamento;

    await this.updateInstrutor(id, instrutorParams);
  } catch(error) {
    throw new Error("Erro ao atualizar instrutor");
  }
}
