import React, { Component } from 'react';
import './style.scss';
import {get} from '../../api';
import {formatCurrencyVND} from '../../utils/common';
import SearchBar from './search-bar';
import Pagination from '../common/pagingation';
import {TableSizeDefault} from '../../constants/constants';
import InfiniteScroll from "react-infinite-scroll-component";
import notfoundimage from '../../assets/images/notfoundimage.png'
class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            productSearch: [],
            total: 0,
            params: {
                skip: 1,
                take: TableSizeDefault.value
            },
            pageSize: TableSizeDefault,
            currentPage: 1,
            hasMoreItems: true,
            loading: true,
            keyworks: null,
            keyworkSearch: '',
        }
    }
    componentDidMount() {
        this.loadItems(this.state.currentPage);
    }
    
    // _onPageChange = page => {
    //     this.setState({
    //       currentPage: page
    //     })
    //     const { pageSize } = this.state;
    //     this.setState({
    //         params: { 
    //             ...this.state.params,
    //             skip: page,
    //             take: pageSize.value
    //         }
    //     },()=>{
    //         this.getProducts();
    //     })
    // };
    onSearch = (keyworkSearch)=>{
        this.setState({
            keyworkSearch,
        },()=>this.loadItems(1));
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
    loadItems(currentPage) {
        let {keyworks,keyworkSearch} = this.state;
        get(`api/search/?q=${keyworkSearch || ''}&saleCategories=613&channel=pv_online&terminal=phongvu&saleStatuses=hang_ban,hang_dat_truoc,hang_sap_het,hang_moi,hang_trung_bay,hang_thanh_ly&_sort=saleStatuses%7C%7Chang_ban%7Chang_dat_truoc%7Chang_sap_het%7Chang_moi%7C%7Chang_trung_bay%7Chang_thanh_ly%7C%7Cngung_kinh_doanh&_order=asc&_page=${currentPage}&_limit=10&publishStatus=true`,(resp)=>{
            let{ productSearch, products} = this.state;
            if(resp){
                if(keyworkSearch && keyworkSearch !== keyworks){ //nếu có gt tìm kiếm -> push giá trị vào mảng mới
                    productSearch.length = 0;
                    resp.result.products.map((item,index) => {
                        item.image = item.images.length > 0 && item.images[0].url;
                        item.sku = item.sku;
                        item.sellPrice = item.price.sellPrice && item.price.sellPrice;
                        item.promotionPrice = item.promotionPrices.length > 0 && item.promotionPrices[0].finalPrice;
                        item.name = item.name;
        
                        productSearch.push(item);
                    });
                    this.setState({
                        products:productSearch,
                        currentPage,
                        loading: false,
                        keyworks: keyworkSearch
                    });
                }else if(keyworkSearch && keyworkSearch === keyworks){ //nếu gt tìm kiếm k thay đổi(tức load thêm sản phẩm) -> push vào mảng cũ
                    resp.result.products.map((item,index) => {
                        item.image = item.images.length > 0 && item.images[0].url;
                        item.sku = item.sku;
                        item.sellPrice = item.price.sellPrice && item.price.sellPrice;
                        item.promotionPrice = item.promotionPrices.length > 0 && item.promotionPrices[0].finalPrice;
                        item.name = item.name;
        
                        productSearch.push(item);
                    });
                    this.setState({
                        products:productSearch,
                        currentPage,
                        loading: false,
                    });
                }else if(!keyworkSearch && keyworkSearch !== keyworks){ //Nếu trước đó đã search và search nữa -> push giá trị mới vào mảng rỗng
                    products.length = 0;
                    resp.result.products.map((item,index) => {
                        item.image = item.images.length > 0 && item.images[0].url;
                        item.sku = item.sku;
                        item.sellPrice = item.price.sellPrice && item.price.sellPrice;
                        item.promotionPrice = item.promotionPrices.length > 0 && item.promotionPrices[0].finalPrice;
                        item.name = item.name;
        
                        products.push(item);
                    });
                    this.setState({
                        products: products,
                        currentPage,
                        loading: false,
                        keyworks: keyworkSearch
                    });
                }else{
                    resp.result.products.map((item,index) => { //Nếu không có search->push vào mảng hiện có(load more products)
                        item.image = item.images.length > 0 && item.images[0].url;
                        item.sku = item.sku;
                        item.sellPrice = item.price.sellPrice && item.price.sellPrice;
                        item.promotionPrice = item.promotionPrices.length > 0 && item.promotionPrices[0].finalPrice;
                        item.name = item.name;
        
                        products.push(item);
                    });
                    this.setState({
                        products: products,
                        currentPage,
                        loading: false,
                    });
                }
                if(products.length >= resp.extra.totalItems){
                    this.setState({
                        hasMoreItems: false,
                        loading: false
                    });
                }
            }
        });
    }
    handleClickToDetail(sku){
        this.props.history.push(`/product/${sku}`)
    }
    render() {
        let {products,total,pageSize,currentPage,hasMoreItems,loading}=this.state;
        console.log('products',products)
        return (
            <div className="main">
                <SearchBar onSearch={this.onSearch}/>
                <InfiniteScroll
                    dataLength={products.length}
                    next={()=>this.loadItems(currentPage+1)}
                    hasMore={hasMoreItems}
                    loader={loading && <h4>Loading...</h4>}
                    >
                    <div className="product">
                    {
                        products && products.map((item,index)=><div key={index} className="product-cart">
                                    <img src={item.image ? item.image : notfoundimage} onClick={()=>this.handleClickToDetail(item.sku)}/>
                                    <div>
                                        <p onClick={()=>this.handleClickToDetail(item.sku)}>{item.name}</p>
                                        <b className="price">{item.promotionPrice && formatCurrencyVND(item.promotionPrice)}<sup>đ</sup></b>
                                        <div>
                                            <b className="promotion_price">{item.sellPrice && formatCurrencyVND(item.sellPrice)}</b>
                                            <div id='pointer'>-20%</div>
                                        </div>
                                    </div>
                                </div>)
                    }
                    </div>
                </InfiniteScroll>
                {/* <div className="paginations">
                    {total > pageSize.value ? (
                            <Pagination
                                total={total}
                                pageSize={pageSize.value}
                                page={currentPage}
                                onChange={page => this._onPageChange(page)}
                                enableFirstLastButton={true}
                            />
                            ) : null}
                </div> */}
            </div>
        );
    }
}

export default index;