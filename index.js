const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/empleados", async (req, res) => {
  try {
    const empleados = await prisma.empleados.findMany();
    res.json(empleados);
  } catch (error) {
    res.status(404).json({ error: "Error al obtener los empleados" });
  }
});

app.get("/empleados/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const empleados = await prisma.empleados.findUnique({
      where: { id: Number(id) },
    });
    res.json(empleados);
  } catch (error) {
    res.status(404).json({ error: "Error al obtener los empleados" });
  }
});

app.post("/empleados", async (req, res) => {
  const { nombre, apellido, puesto, sueldo } = req.body;
  const sueldoParseado = parseFloat(sueldo);

  if (isNaN(sueldoParseado)) {
    return res
      .status(400)
      .json({ error: "El sueldo debe ser un número válido" });
  }

  try {
    const empleado = await prisma.empleados.create({
      data: {
        nombre,
        apellido,
        puesto,
        sueldo: sueldoParseado,
      },
    });
    res.status(201).json(empleado);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el empleado" });
  }
});

app.put("/empleados/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, puesto, sueldo } = req.body;
  const sueldoParseado = parseFloat(sueldo);

  if (isNaN(sueldoParseado)) {
    return res
      .status(400)
      .json({ error: "El sueldo debe ser un número válido" });
  }

  try {
    const empleado = await prisma.empleados.update({
      where: { id: Number(id) },
      data: { nombre, apellido, puesto, sueldo: sueldoParseado },
    });
    res.json(empleado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el empleado" });
  }
});

app.delete("/empleados/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const empleados = await prisma.empleados.delete({
      where: { id: Number(id) },
    });
    res.json(empleados);
  } catch (error) {
    res.status(404).json({ error: "Error al eleminar al empleado" });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
