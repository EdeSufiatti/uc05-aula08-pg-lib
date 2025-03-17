
import  { Instrutor } from "../shared/model/instrutor";
import { InstrutorService } from "./instrutor.service";
import { Request, Response } from "express";

export class InstrutorController {
  private service: InstrutorService;

  constructor(service: InstrutorService) {
    this.service = service;
  }

  async createInstrutor(req: Request<{}, {}, Instrutor>, res: Response) {
    try {
      const instrutor = req.body;
      const novoInstrutor = await this.service.createInstrutor(instrutor);
      res.status(201).json(instrutor);
    } catch (error) {
      res.status(400).json({ error: true,  message: error });
    }

  }

  async getInstrutores(_: Request, res: Response) {
    try {
      const instrutores = await this.service.getAll();
      res.status(200).send(instrutores);
    } catch (error) {
      console.log("Error - InstrutorController>getInstrutores", error);
      res.status(500).send({ error: true, message: error });
    }
  }


  async getInstrutorById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
        return;
      }
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      const Instrutor = await this.service.getById(instrutorId);
      if (!Instrutor) {
        res.status(404).send({ error: true, message: "Instrutor nao encontrado" });
        return;
      }
      res.status(200).send(Instrutor);
    } catch (error) {
      console.log("Error - InstrutorController>getInstrutorById", error);
      res.status(500).send({ error: true, message: error });


    }

  }
async updatePartOfInstrutor(req: Request<{ id: string }, {}, Instrutor>, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
      return;
    }
    const instrutorId = parseInt(id);
    if (isNaN(instrutorId)) {
      res.status(400).send({ error: true, message: "Informe um ID válido" });
      return;
    }
    const instrutor = req.body;
    const instrutorAtualizado = await this.service.updatePartOfInstrutor(instrutorId, instrutor);
    res.status(200).send(instrutorAtualizado);
  } catch (error) {
    console.log("Error - InstrutorController>updatePartOfInstrutor", error);
    res.status(500).send({ error: true, message: error });
  }

}
async updateAllFieldsInstrutor(req: Request<{ id: string }, {}, Instrutor>, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
      return;
    }
    const instrutorId = parseInt(id);
    if (isNaN(instrutorId)) {
      res.status(400).send({ error: true, message: "Informe um ID válido" });
      return;
    }
    const instrutor = req.body;
    const instrutorAtualizado = await this.service.updateInstrutor(instrutorId, instrutor);
    res.status(200).send(instrutorAtualizado);
  } catch (error) {
    console.log("Error - InstrutorController>updateAllFieldsInstrutor", error);
    res.status(500).send({ error: true, message: error });
  }

}
  async deleteInstrutor(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
        return;
      }
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      await this.service.delete(instrutorId);
      res.status(204).send();
    } catch (error) {
      console.log("Error - InstrutorController>deleteInstrutor", error);
      res.status(500).send({ error: true, message: error });
    }
  }
}
