require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片的信息转换为图片的url信息
imageDatas = ((imageDatasArr) => {
	for (let i = 0, len = imageDatasArr.length; i < len; i++) {
		let singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}

	return imageDatasArr;
})(imageDatas);


/**
 * 获取区间内的一个随机值
 * @param  {[type]} low  [description]
 * @param  {[type]} high [description]
 * @return {[type]}      [description]
 */


var getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);
var get30DegRandom = () => {
	return ((Math.random() > 0.5 ? '+' : '-') + Math.ceil(Math.random() * 30));
};
//图片组件
class ImgFigure extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		//翻转和居中图片
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}

	render() {
		var styleObj = {};

		//如果props属性中指定了这张图片的位置,则使用
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		//如果图片的旋转角度有值并且不为0，添加旋转角度
		if (this.props.arrange.rotate) {
			(['MosTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function(value) {
				styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
		}


		if (this.props.arrange.isCenter) {
			styleObj.zIndex = 11;
		}

		let imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse ' : '';

		return (
			<figure className = {imgFigureClassName} style= {styleObj} onClick = {this.handleClick}>
			    <img src = {this.props.data.imageURL} alt = {this.props.data.title}/>
			    <figcaption>
			        <h2 className = "img-title">{this.props.data.title}</h2>
			        <div className =  "img-back" onClick={this.handleClick}>
			            <p>
			                {this.props.data.title};
			            </p>
			        </div>
			    </figcaption>
			</figure>

		);
	}
}

class ControllerUnit extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		//翻转和居中图片
		if (this.props.arrange.isCenter) {
			this.props.inverse()
		} else {
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}



	render() {
		let controllerUnitClassName = 'controller-unit';
		//如果对应的是居中的图片，显示控制按钮的居中态
		if (this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center ';
			//如果翻转显示翻转状态
			if (this.props.arrange.isInverse) {
				controllerUnitClassName += 'is-inverse'
			}
		}
		return (
			<span className={ controllerUnitClassName } onClick={this.handleClick}></span>
		)
	}
}


class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.Constant = {
			centerPos: {
				left: 0,
				right: 0
			},
			hPosRange: { //水平方向取值范围
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: { //垂直方向取值范围
				x: [0, 0],
				topY: [0, 0]
			}
		};
		this.state = {
			imgsArrangeArr: [
				/*{
  				pos:{
  					left:'0',
  					top:'0'
  				},
  				rotate:0, //旋转角度
  				isInverse:false //图片正反
  				isCenter:false //图片是否居中
  			}*/
			]
		};
	}

	//点击正中央的图片，使其翻转
	inverse(index) {
		return () => {
			let imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})
		}
	}

	center(index) {
		return () => {
			this.rearrange(index);
		}
	}

	rearrange(centerIndex) {
		let imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			topImgNum = Math.floor(Math.random() * 2), //取一个或取
			topImgSpliceIndex = 0,
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

		//首先居中 centerIndex 的图片
		imgsArrangeCenterArr[0] = {
			pos: centerPos,
			rotate: 0,
			isCenter: true
		}

		//取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		//布局位于上侧的图片
		imgsArrangeTopArr.forEach(function(value, index) {
			imgsArrangeTopArr[index] = {
				pos: {
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			}
		});

		//布局左右两侧的图片
		for (let i = 0, len = imgsArrangeArr.length, k = len / 2; i < len; i++) {
			let hPosRangeLORX = null;

			//前半部分布局左边，右半部分布局右边
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			} else {
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i] = {
				pos: {
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			};
		}

		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		this.setState({
			imgsArrangeArr: imgsArrangeArr
		});

	}



	//组件加载后，为每张图片计算其位置的范围
	componentDidMount() {
		//获取舞台大小
		let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,

			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		//获取一个imageFigure 的大小
		let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);

		// 计算中心图片的位置
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		//计算左侧,右侧区域图片排布的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		//计算上侧区域图片排布的取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		let num = Math.floor(Math.random() * 10);
		this.rearrange(num);

	}

	render() {
		let controllerUnits = [],
			imgFigures = [];
		imageDatas.forEach(function(value, index) {
			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}
			imgFigures.push(<ImgFigure key ={index} data = {value} ref = {'imgFigure' + index} 
				                       arrange = {this.state.imgsArrangeArr[index]}
				                       center = {this.center(index)}
				                       inverse = {this.inverse(index)}/>);


			controllerUnits.push(<ControllerUnit key={index} 
			                     arrange = {this.state.imgsArrangeArr[index]}
			                     center = {this.center(index)}
			                     inverse = {this.inverse(index)}
			                                  />);
		}.bind(this));

		return (
			<section className = "stage" ref ="stage">
			    <section className = "img-sec">
			        {imgFigures}
			    </section>
			    <nav className="controller-nav">
                    {controllerUnits}
                </nav>
			</section>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;