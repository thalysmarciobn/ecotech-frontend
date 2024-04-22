import User from "./User";

export default interface ChecarUsuario {
  codigo: string;
  usuario: User | null;
}
