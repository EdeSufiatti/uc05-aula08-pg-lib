import { Instrutor } from "../shared/model/instrutor";
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

 async getInstrutorById( _: Request<{ id: string }>, res: Response) {
    try {
      const instrutor = await this.service.getAll();
      res.status(200).send(instrutor);
    } catch (error) {
      console.log("Error - InstrutorController>getInstrutorById", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  
}
