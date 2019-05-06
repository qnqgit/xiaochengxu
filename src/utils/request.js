
// 每一个请求，需要一个 url 地址
// 根据情况，还可以有一个 data 数据
function request(obj) {

  let url = obj.url || '';
  // 配置接口根路径
  url = 'https://www.zhengzhicheng.cn' + url;

  let method = obj.method || 'get';
  let data = obj.data || {}
  // 其它参数...

  return new Promise(function (resolve, rejected) {

    mpvue.showLoading({
      title: '正在加载...'
    });

    mpvue.request({
      url: url,
      method: method,
      data: data,
      success: function (info) {
        resolve(info.data);
        mpvue.hideLoading();
      }
    });
  });

}

export default request;
