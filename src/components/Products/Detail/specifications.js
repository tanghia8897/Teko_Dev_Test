import React, { Component } from 'react';

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            showMoreInfo: true,
        }
    }
    onShow = ()=>{
        this.setState({showMoreInfo: !this.state.showMoreInfo})
    }
    render() {
        let {showMoreInfo} = this.state;
        return (
            <div className='spectifications'>
                <div className={showMoreInfo ? 'collapse show' : 'collapse'}>
                    <ul className={showMoreInfo && 'mask-image'}>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                        <li>
                            <span>Thương hiệu</span>
                            <div>Cooler Master</div>
                        </li>
                    </ul>
                </div>
                {
                    showMoreInfo    
                        ? <div className='show-more' onClick={this.onShow}>Hiển thị nhiều hơn<i class="material-icons">keyboard_arrow_down</i></div>
                        : <div className='show-more' onClick={this.onShow}>Thu gọn <i class="material-icons">keyboard_arrow_up</i></div>
                }
            </div>
        );
    }
}

export default Index;