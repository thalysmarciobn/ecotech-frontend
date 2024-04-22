import UserService from "@/services/UserService";
import store from "@/store";
import UserModule from "@/store/modules/UserModule";
import ChecarUsuario from "@/types/ChecarUsuario";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getModule } from "vuex-module-decorators";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomePage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/painel",
    name: "Painel",
    component: () => import("../components/Painel.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/gerar-solicitacao",
    name: "GerarSolicitacao",
    component: () => import("../components/GerarSolicitacao.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: () => import("../components/Produtos.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/enderecos",
    name: "Enderecos",
    component: () => import("../components/Enderecos.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const userModule = getModule(UserModule, store);

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("="));
    const chave = cookies.find(([key]) => key === "chave");

    if (chave) {
      const valorChave = chave[1];

      try {
        const data: ChecarUsuario = await UserService.checar(valorChave);

        if (data.codigo === "logado") {
          userModule.setUser(data.usuario);
          next();
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    }

    next({ name: "Login" });
    return;
  }

  next();
});

export default router;
