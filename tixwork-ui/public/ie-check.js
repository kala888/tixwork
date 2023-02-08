function isIEExplorer() {
  const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  const isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1; //判断是否IE11浏览器
  if (isEdge) {
    return false
  }
  return isIE || isIE11
}

function downloadChrome() {
  window.location.href =
    'https://tiandtech.oss-cn-chengdu.aliyuncs.com/software/chrome.exe';
}

if (isIEExplorer()) {
  document.write(
    '<div style="width: 100%;margin-top: 10%;text-align: center;" >' +
    '<p style="font-size: 24px;">"微软于2022年6月15日宣布正式停止对IE浏览器支持和维护"</p>' +
    '<p style="font-size: 24px;">系统检测到您正在使用的浏览器是IE内核。出于安全考虑请使用Chrome浏览器。</p>' +
    '<p style="color: red;cursor: pointer;font-size: 30px;" onclick="downloadChrome()">点击下载 或 自行安装</p>' +
    '</div>'
  );
}
