
import BasicLayout from "../layouts/BasicLayout";

//在这里配置路由的信息
let routeConfig = [
  // {
  //   label: "地址抽取",
  //   path: "/AddressExtraction",
  //   exact: true,
  //   render: AddressExtractionComponent
  // },
];
const routers = [

  ...routeConfig
];

const deepRouter = list => {
  return list.map((vl, i) => {
    if (vl.render === vl.children) {
      const values = Object.values(vl);
      return deepRouter(values);
    }
    return vl;
  });
};

export const getRouterMenu = () => {
  let values = Object.values(routers);
  values = values.filter(vl => {
    return !vl.exclude;
  });
  const menuList = deepRouter(values);
  return menuList[0];
};

export const getLayoutData = layout => {
  return [
    {
      path: "/",
      exact: false,
      render: BasicLayout
    }
  ];
};

const deepCheckRoute = (list, fn) => {
  list.forEach((vl, i) => {
    if (!vl.render) {
      if (vl.children) {
        deepCheckRoute(vl.children, fn);
      } else {
        const values = Object.values(vl);
        deepCheckRoute(values, fn);
      }
    } else {
      fn(vl);
    }
  });
};

const getRouterTemplate = () => {
  const values = Object.values(routers);
  const routeObject = [];
  deepCheckRoute(values, vl => {
    routeObject.push(vl);
  });
  return routeObject;
};

export { getRouterTemplate, routers };
