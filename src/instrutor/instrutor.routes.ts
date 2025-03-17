import express, { Router } from "express";
import { InstrutorController } from "./instrutor.controller";
import { InstrutorRepository } from "./instrutor.repository";
import { InstrutorService } from "./instrutor.service";


export class InstrutorRoutes {
  private database: any;
  private router: Router;

  private InstrutorRepository: InstrutorRepository;
  private InstrutorService: InstrutorService;
  private InstrutorController: InstrutorController;


  constructor(database: any) {
    this.database = database;
    this.router = express.Router();
    this.InstrutorRepository = new InstrutorRepository(this.database);
    this.InstrutorService = new InstrutorService(this.InstrutorRepository);
    this.InstrutorController = new InstrutorController(this.InstrutorService);
    this.configureRoutes();
  }

  configureRoutes(): void {
    this.router.post("/", (req, res) =>
      this.InstrutorController.createInstrutor(req, res)
    );
    this.router.get("/", (req, res) =>
      this.InstrutorController.getInstrutores(req, res)
    );
    this.router.get("/:id", (req, res) =>
      this.InstrutorController.getInstrutorById(req, res)
    );
    this.router.put("/:id", (req, res) =>
      this.InstrutorController.updateAllFieldsInstrutor(req, res)
    );
    this.router.patch("/:id", (req, res) =>
      this.InstrutorController.updatePartOfInstrutor(req, res)
    );
    this.router.delete("/:id", (req, res) =>
      this.InstrutorController.deleteInstrutor(req, res)
    );
  }

  getrouter(): Router {
    return this.router;
  }
}
