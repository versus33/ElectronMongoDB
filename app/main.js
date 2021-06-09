const { BrowserWindow, ipcMain } = require("electron");
const Soci = require("./models/Socio");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile("app/index.html");
}

ipcMain.on("new-soci", async (e, arg) => {
  const newSoci = new Soci(arg);
  const sociSaved = await newSoci.save();
  console.log(sociSaved);
  e.reply("new-soci-created", JSON.stringify(sociSaved));
});

ipcMain.on("get-socis", async (e, arg) => {
  const socis = await Soci.find();
  e.reply("get-socis", JSON.stringify(socis));
});

ipcMain.on("delete-soci", async (e, args) => {
  const sociDeleted = await Soci.findByIdAndDelete(args);
  e.reply("delete-soci-success", JSON.stringify(sociDeleted));
});

ipcMain.on("update-soci", async (e, args) => {
  console.log(args);
  const updatedSoci = await Soci.findByIdAndUpdate(
    args.idSociToUpdate,
    { nombre: args.nombre,
      apellido: args.apellido,
      direccion: args.direccion,
      codPostal: args.codPostal,
      poblacion: args.poblacion,
      provincia: args.provincia,
      telefono: args.telefono,
      movil: args.movil,
      emaildp: args.emaildp },
    { new: true }
  );
  e.reply("update-soci-success", JSON.stringify(updatedSoci));
});

module.exports = { createWindow };
