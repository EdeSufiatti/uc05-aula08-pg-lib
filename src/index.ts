import Scanner from "@codeea/scanner";
import { connect } from "http2";
import pgp from "pg-promise";

async function main() {
  const scanner = new Scanner();

  // criar um objeto de conexão com o banco
  const connectionString = "postgres://postgres:password@localhost:5432/matriculas_db";

  const connection = pgp()(connectionString);

  try {
    // usando scaner vamos obter os dados dos alunos

    console.log("a seguir inform os dados do aluno: \n");
    const nome = await scanner.question("Nome Compleot:");
    const data_nasc = await scanner.question("Data de Nascimento:");
    const cpf = await scanner.question("CPF:");
    const telefone = await scanner.question("Telefone:");
    const sexo = await scanner.question("sexo:");
    const email = await scanner.question("email:");
    const escolaridade = await scanner.question("escolaridade:");
    const renda = await scanner.question("renda:");
    const pcd = await scanner.question("pcd:");

    // vamos inserir os dados do aluno no banco


    const queryInsertAlunos = `
insert into alunos (nome, data_nasc, cpf,
telefone, sexo,  email, escolaridade, renda, pcd)
  values ($1,$2,$3,$4,$5,$6,$7,$8,$9);`

    await connection.query(queryInsertAlunos, [
      nome,
      data_nasc,
      cpf,
      telefone,
      sexo.charAt(0),
      email,
      escolaridade,
      renda,
      pcd.toUpperCase() === "SIM" ? true : false,
    ])

    const results = await connection.query("select * from alunos");

    console.log(results);
  } catch (error) {
    console.log(error);
  }

  scanner.close();
}

(async () => {
  await main()
})()
/* teste
