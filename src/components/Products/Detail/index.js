import React, { Component } from 'react';
import './style.scss'
import {get} from '../../../api';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Specification from './specifications';
import PriceCompare from './price-compare';
import ProductDescription from './product-description';
import CustomTab from '../../common/tabs';
import {formatCurrencyVND} from '../../../utils/common';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 465 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};
class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            productDetail: '',
            tabIndex: 1,
            quantity: 1,
        }
    }
    _renderTabIndex(array, exceptArray) {
        if (!exceptArray) return array
        exceptArray.map(item => {
            if(item){
                array = array.filter(e => e.toString() !== item.toString())
            }
        })
        return array
    }

    _renderTabContent(array, exceptArray) {
        if (!exceptArray) return array
        for(let i = exceptArray.length-1 ; i>=0;i--){
            if(exceptArray[i] !== null){
                array.splice(exceptArray[i], 1)
            }
        }
        return array
    }
    componentDidMount() {
        get(`api/products/${this.props.match.params.id}?channel=pv_online&terminal=phongvu`,(result)=>{
            this.setState({
                productDetail: result.result.product
            })
        })
    }
    handleAddQuantity = ()=>{
        this.setState({
            quantity: this.state.quantity + 1
        })
    }
    handleRemoveQuantity = ()=>{
        let {quantity} = this.state;
        if(quantity > 1){
            this.setState({
                quantity: this.state.quantity - 1
            })
        }
    }
    render() {
        let {productDetail,tabIndex,quantity}=this.state;
        return (
            <div className="product-detail">
                {
                    productDetail && <React.Fragment>
                        <div className='nav'>
                            <i class="material-icons arrow-left" onClick={()=>this.props.history.goBack()}>keyboard_arrow_left</i>
                            <div>
                                <Tooltip title={productDetail.name}>
                                    <h5 className='name'>
                                        {productDetail.name.slice(0,20)} ...
                                    </h5>
                                </Tooltip>
                                <b className='price'>{formatCurrencyVND(productDetail.price.sellPrice)} đ</b>
                            </div>
                            <IconButton aria-label="cart">
                                <Badge  badgeContent={quantity} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge >
                            </IconButton>
                        </div>
                        <div className='product-content'>
                            <div className='carousel-image'>
                                <Carousel
                                    swipeable={true} 
                                    showDots={true}
                                    responsive={responsive}
                                    ssr={true} // means to render carousel on server-side.
                                    infinite={true}
                                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                    autoPlaySpeed={2000}
                                    keyBoardControl={true}
                                    draggable={true}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    // deviceType={this.props.deviceType}
                                    deviceType="desktop"
                                    // deviceType={this.props.deviceType}
                                    itemClass="carousel-item-padding-40-px"
                                    // arrows={this.props.deviceType == "mobile" ? true : false}
                                    >
                                    {productDetail.images.map((item, index) => {
                                        return (
                                            <img key={index} src={item.url}/>
                                        );
                                    })}
                                </Carousel>
                            </div>
                            <div className='product-decription'>
                                <h4>{productDetail.name}</h4>
                                <div>
                                    <span>Mã SP: </span>
                                    <a style={{color: '#5395f8'}}>{productDetail.sku}</a>
                                </div>
                                <span className='status'>
                                    Tạm hết hàng
                                </span>
                                <div className="price">
                                    <b>{formatCurrencyVND(productDetail.promotionPrices[0].finalPrice)}<sup>đ</sup></b>
                                    <span>{formatCurrencyVND(productDetail.price.sellPrice)}</span>
                                </div>
                            </div>
                            <CustomTab
                                onChange={tabIndex => {
                                    // this.props.history.push(`?tab=${tabIndex}`)
                                }}
                                value={tabIndex}
                                tabLabels={
                                    this._renderTabIndex([
                                        "Mô tả sản phẩm",
                                        "Thông số kỹ thuật",
                                        "So sánh giá"
                                    ])
                                }
                                tabContainers={
                                    this._renderTabContent([
                                        <ProductDescription/>,
                                        <Specification/>,
                                        <PriceCompare/>
                                    ])
                                }
                            />
                            <div className='product-same-type'>
                                <span>Sản phẩm cùng loại</span>
                                <Carousel
                                    additionalTransfrom={0}
                                    arrows
                                    autoPlaySpeed={3000}
                                    centerMode={false}
                                    className=""
                                    containerClass="container"
                                    dotListClass=""
                                    draggable
                                    focusOnSelect={false}
                                    infinite
                                    itemClass=""
                                    keyBoardControl
                                    minimumTouchDrag={80}
                                    partialVisible
                                    renderButtonGroupOutside={false}
                                    renderDotsOutside={false}
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    responsive={{
                                        desktop: {
                                        breakpoint: {
                                            max: 3000,
                                            min: 1024
                                        },
                                        items: 3,
                                        partialVisibilityGutter: 40
                                        },
                                        mobile: {
                                        breakpoint: {
                                            max: 464,
                                            min: 0
                                        },
                                        items: 2,
                                        partialVisibilityGutter: 20
                                        },
                                        tablet: {
                                        breakpoint: {
                                            max: 1024,
                                            min: 464
                                        },
                                        items: 2,
                                        partialVisibilityGutter: 100
                                        }
                                    }}
                                    showDots={false}
                                    sliderClass=""
                                    slidesToSlide={1}
                                    swipeable
                                    >
                                    {productDetail.images.map((item, index) => {
                                        return (
                                            <div>
                                                <img key={index} src={item.url}/>
                                                <div>{productDetail.name.slice(0,25)}...</div>
                                                <div className="price">
                                                    <b>{formatCurrencyVND(productDetail.promotionPrices[0].finalPrice)}<sup>đ</sup></b>
                                                    <span>{formatCurrencyVND(productDetail.price.sellPrice)}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    </Carousel>
                            </div>
                            <div className='cart-info'>
                                <div style={{flexGrow: 3}}>
                                    <i class="material-icons" onClick={this.handleRemoveQuantity}>remove_circle_outline</i>
                                    {quantity}
                                    <i class="material-icons" onClick={this.handleAddQuantity}>add_circle_outline</i>
                                </div>
                                <div style={{flexGrow: 7}}>
                                    <i class="material-icons">add_shopping_cart</i>
                                    <b>{formatCurrencyVND(productDetail.promotionPrices[0].finalPrice*quantity)} <sup>đ</sup></b>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}
export default index;