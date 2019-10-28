import Toast from './Toast';

const obj = {};

obj.install = function(Vue){
  //创建组件构造器
  const ToastContrustor = Vue.extend(Toast);
  //新建构造器
  const toast = new ToastContrustor();

  //将组件对象手动挂载在某个元素
  toast.$mount(document.createElement('div'));
  //添加元素到body
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;

}

export default obj