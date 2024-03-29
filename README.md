# TentAdmin

> Tent Admin Web App

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Framework & Dependencies
```
vue@2.5.2 - The basical app framework.
vue-router@3.0.1
vuex@3.0.1
axios@0.18.0 - Web request.
--bootstrap@4.1.3 - CSS UI Framework.-- // Included in CSS file of AdminLTE 3
element-ui@2.4.9 - UI components.
fontawesome-free@^5.5.0
animate.css@3.7.0
```

HTML framework base [AdminLTE 3 Alpha-2](https://github.com/almasaeed2010/AdminLTE/releases/tag/v3.0.0-alpha.2)

For a detailed of the dependencies of this app, check out the package.json.

## Directory

```
/
├─src                             Main source
│  ├─api                          API Module
│  │  │─ApiBase.js                API Base, return an axios instance.
│  │  └─index.js                  API entry, import all apis from hrer.
│  ├─common                       Common module, include some utils script, style.
│  ├─component                    VUE component file folder.
│  │  │─framework                 Basical framework, include NavBar, SideMenu...
│  │  │─manage                    Admin manage template.
│  │  └─...                       Other module component.
│  ├─filter                       Global filter.
│  ├─router                       Vue Router.
│  ├─store                        Vuex.
│  ├─App.vue                      Vue webapp main template.
│  └─main.js                      Project entry.
└─ ...                            ...
```

## License

MIT