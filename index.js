const console = require("console");
const fs = require("fs");
// * Vamos a crear una red social.
class dataBase {
    constructor(archivo) {
        this.archivo = archivo;
    };

    // ? USUARIO

    // * Crear Usuario
    async createUser(objUser){
        const data = await fs.promises.readFile(`${this.archivo}/usuarios.json`, "utf-8");
        const usuarios = JSON.parse(data);
        const id = usuarios.length + 1;
        objUser.id = id;
        objUser.likes = [];
        usuarios.push(objUser);
        const dataParse = JSON.stringify(usuarios);
        await fs.promises.writeFile(`${this.archivo}/usuarios.json`, dataParse);
        return usuarios;
    }

    // * Obtener todos los usuarios
    async getAllUsers(){
        const data = await fs.promises.readFile(`${this.archivo}/usuarios.json`, "utf-8");
        return JSON.parse(data);
    }

    // * Obtener usuario por ID
    async getUserID(id){
        const idnum = parseInt(id)
        const data = await fs.promises.readFile(`${this.archivo}/usuarios.json`, "utf-8");
        const usuarios = JSON.parse(data)
        const usuario = usuarios.find((user) => user.id === idnum)
        if (usuario){
            return usuario;
        }else{
            throw new Error ("usuario no encontrado");
        }
    }

    // * Obtener like de usuario por ID
    async getLikeUserID(id){
        const data = await fs.promises.readFile(`${this.archivo}/usuarios.json`, "utf-8");
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find(user => user.id === id);
        if (usuario){
            return usuario.likes;
        }else{
            return "usuario no encontrado";
        }
    }

    // * dar like
    async likesPage(usuarioID, pageID){
        const data = await this.getAllUsers();
        const dataAct = data.map((usuario) => {
            if(usuario.id === usuarioID){
                usuario.likes.push(pageID);
            }
            return usuario;
        })
        const dataActParse = JSON.stringify(dataAct);
        await fs.promises.writeFile(`${this.archivo}/usuarios.json`, dataActParse);
    }

    // ? FAN PAGES
    // * Crear pagina
    async createPage(pageObj){
        const data = await fs.promises.readFile(`${this.archivo}/pages.json`, "utf-8");
        const paginas = JSON.parse(data);
        const id = paginas.length + 1;
        pageObj.id = id;
        paginas.push(pageObj); 
        const pagParse = JSON.stringify(paginas);
        await fs.promises.writeFile(`${this.archivo}/pages.json`, pagParse);
        return paginas;
    }

    // * Enlistar pagina
    async getAllPages(){}
}
(
    async function start() {
        const db = new dataBase("data");
        // db.createUser({ nombre: "Julian", correo: "holamundo@gmail.com" },{ nombre: "Lisandro", correo: "holamundo@gmail.com" },{ nombre: "Cesar", correo: "holamundo@gmail.com" },{ nombre: "Maxi", correo: "holamundo@gmail.com" },{ nombre: "Pedro", correo: "holamundo@gmail.com" });
        // db.createUser({ nombre: "Pedro", correo: "holamundo@gmail.com" });
        // db.createUser({ nombre: "Maxi", correo: "holamundo@gmail.com" });
        // db.createUser({ nombre: "Cesar", correo: "holamundo@gmail.com" });
        // db.createUser({ nombre: "Lisandro", correo: "holamundo@gmail.com" });
        // console.log("--------GET ALL----------");
        // console.log(await db.getAllUsers());
        // console.log("--------GET FOR ID-------");
        // const pagina = await db.likesPage(2,1);
    }
)();
module.exports = dataBase;