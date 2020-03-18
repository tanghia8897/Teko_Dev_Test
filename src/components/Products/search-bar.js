import React, { Component } from 'react';
import TextInput from '../common/text-input';

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyworks: ''
        }
    }
    componentDidUpdate(prevProps, prevState){
        let {keyworks} = this.state;
        if(keyworks !== prevState.keyworks){
            this.props.onSearch(keyworks)
        }
    }
    render() {
        let {keyworks} = this.state;
        return (
            <div className="search-bar">
                <div>
                    <i class="material-icons">search</i>
                    <TextInput
                        className="keyworks"
                        edit={true}
                        placeholder={"Nhập tên, mã sản phẩm"}
                        name="keyworks"
                        value={keyworks}
                        onChange={e => {
                            this.setState({
                                keyworks: e.target.value
                            });
                        }}
                        // onKeyUp={()=>this._onSearch()}
                    />
                </div>
            </div>
        );
    }
}

export default Index;