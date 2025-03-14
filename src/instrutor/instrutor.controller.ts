import { Instrutor } from "../shared/model/instrutor";
import { InstrutorService } from "./instrutor.service";
import { Request, Response } from "express";

export class InstrutorController {
  private service: InstrutorService;

  constructor(service: InstrutorService) {
    this.service = service;
  }


}
