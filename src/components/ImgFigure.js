import React from 'react';
class ImgFigure extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	/**
	 * 翻转、居中图片
	 */
	handleClick(e) {
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
ImgFigure.defaultProps = {};

export default ImgFigure;