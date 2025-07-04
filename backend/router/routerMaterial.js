const express = require("express");
const routerMaterial = express.Router();
const materialController = require("../controllers/materialController");

routerMaterial.get("/", materialController.getAllMateriais);
routerMaterial.get("/:id", materialController.getMateriaisById);
routerMaterial.post("/", materialController.createtMaterial);
routerMaterial.put("/:id", materialController.updateMaterialById);
routerMaterial.delete("/:id", materialController.deleteMaterialById);

module.exports = routerMaterial;