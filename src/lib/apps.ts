import type { AppLink } from "./auth";

// Facilidade para adicionar apps: adicione um objeto neste array.
// O backend poderá sobrepor/mergear com as apps do usuário por grupo.
export const defaultApps: AppLink[] = [
  {
    id: "portal-academico",
    name: "Portal Acadêmico",
    href: "https://grupoeduca161993.rm.cloudtotvs.com.br/FrameHTML/Web/App/Edu/PortalEducacional/login/",
    description: "Acesso ao portal do aluno e professor",
    icon: "🎓",
    target: "_blank",
    isDefault: true,
    tags: ["acadêmico"],
  },
  {
    id: "biblioteca",
    name: "Biblioteca",
    href: "https://biblioteca.unifacema.edu.br/",
    description: "Catálogo e serviços da biblioteca",
    icon: "📚",
    target: "_blank",
    isDefault: true,
    tags: ["acadêmico"],
  },
  {
    id: "suporte-ti",
    name: "Suporte TI",
    href: "",
    description: "Abrir chamados e acompanhar solicitações",
    icon: "🛠️",
    target: "_blank",
    isDefault: true,
    tags: ["ti"],
  },
  {
    id: "Brightspace-UniFacema",
    name: "Brightspace UniFacema",
    href: "https://brightspace.unifacema.edu.br/",
    description: "Ambiente virtual de aprendizagem",
    icon: "📘",
    target: "_blank",
    isDefault: true,
    tags: ["acadêmico"],
  }
];

// Apps por grupo/setor (exemplos).
// Pra testar em dev: /dev-login?groups=financeiro  | vários: /dev-login?groups=financeiro,rh
// Pra sair: /dev-logout
export const groupApps: Record<string, AppLink[]> = {
  financeiro: [
    {
      id: "rm-fin-cp",
      name: "Contas a Pagar",
      href: "http://192.168.0.208:8021/Login",
      description: "Gestão de títulos, pagamentos e fornecedores",
      icon: "💸",
      target: "_blank",
      tags: ["financeiro", "rm"],
    },
    {
      id: "rm-fin-cr",
      name: "Contas a Receber",
      href: "https://rm.unifacema/financeiro/contas-a-receber",
      description: "Cobranças, títulos e recebíveis",
      icon: "🧾",
      target: "_blank",
      tags: ["financeiro", "rm"],
    },
  ],
  rh: [
    {
      id: "rm-rh-ponto",
      name: "Ponto e Frequência",
      href: "https://rm.unifacema/rh/ponto",
      description: "Espelho de ponto e ajustes",
      icon: "⏱️",
      target: "_blank",
      tags: ["rh", "rm"],
    },
  ],
};

export function getAppsForGroups(groups: string[] | undefined): AppLink[] {
  if (!groups || groups.length === 0) return [];
  const list: AppLink[] = [];
  for (const g of groups) {
    const apps = groupApps[g.toLowerCase()];
    if (apps) list.push(...apps);
  }
  return list;
}



