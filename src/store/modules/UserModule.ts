import User from "@/types/User";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({ namespaced: true, name: "userModule" })
export default class AccountModule extends VuexModule {
  private _user: User | null = null;

  public logado: boolean = this._user != null;

  get user(): User | null {
    return this._user;
  }

  @Mutation
  public setUser(val: User | null) {
    this._user = val;
  }

  @Mutation
  public setQtEcoSaldo(val: number) {
    if (this._user) {
      this._user.qt_ecosaldo = val;
    }
  }
}
