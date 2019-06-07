import Print from "./print";
Print.install = function(Vue) {
  Vue.directive("print", Print);
};

export default Print;
