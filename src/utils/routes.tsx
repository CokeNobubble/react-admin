import React, { lazy } from "react";
import { RouterBody } from "@/router";
import { Navigate } from "react-router-dom";

type IRoutes = {
  children: IRoutes[] | undefined;
  icon: string | null;
  path: string;
  title: string;
  component: string;
};

const layoutModule = import.meta.glob("../layout/index.tsx");
const modules = import.meta.glob("../views/*/index.tsx");
const generateRouter = (routes: IRoutes[]) => {
  let newRouter: RouterBody[] = routes.map((r: IRoutes) => {
    const component =
      r.component === "Layout"
        ? layoutModule[`../layout/index.tsx`]
        : modules[`../views/${r.component}/index.tsx`];
    let routes: RouterBody = {
      path: r.path,
      component: lazy(component as any),
      meta: {
        title: r.title,
        icon: r.icon,
      },
    };

    // 如果有子路由
    if (r.children) {
      routes.children = generateRouter(r.children as IRoutes[]);
    }
    return routes;
  });
  return newRouter;
};

export { generateRouter };
