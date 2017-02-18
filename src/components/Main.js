require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';


//获取图片相关数据
let imageDatas = require('../data/imageData.json');

/**
 * 将图片信息转成URL路径信息
 * @param  {array} imageDatasArr 图片信息数组
 * @return {array} 图片信息数组
 */
imageDatas = ((imageDatasArr) => {
	for (var i = 0, j = imageDatasArr.length; i < j; i++) {
		let singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
	render() {
		return (
			<section className = "stage">
			    <section className = "img-sec"></section>
			    <nav className = "controller-nav"></nav>
			</section>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;