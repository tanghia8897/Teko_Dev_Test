import React from "react";
import "./style.scss";
import $ from 'jquery'
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labelWidth: "0px",
            isError: false,
            skipError: false
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: (this.props.labelPosition === "top-left" || this.props.labelPosition === "top-right") ? "0px" : (($(this.refs.acb).width() + 20) + "px"),
            skipError: this.props.skipError ? this.props.skipError : false
        })
    }

    onBlur(name, displayName, value, skipError) {
        let {
            validations,
            onBlur
        } = this.props
        if(onBlur){
            return this.props.onBlur();
            // return;
        }
        if (validations) {
            let errors = ""
            for (let i = 0; i < validations.length; i++) {
                const validate = validations[i]
                var error = validate(displayName, value)
                if (error) errors += error
                // if (error) errors += "\n" + error
            }

            if (skipError && errors.length === 0) {
                // $(".text-danger").removeClass("show");
            } else {
                this.setState({
                    isError: (errors.length > 0) ? true : false
                })
                document.getElementById("validator-for-" + name).innerHTML = '';
                var element = document.getElementById("validator-for-" + name);
                if (element) element.innerHTML = errors
                if (errors) {
                    $("#" + name).addClass("error");
                    // document.getElementById(name).addClass('error')
                }
                else
                    $("#" + name).removeClass("error");
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.skipError != undefined){
            if(this.props.skipError !== nextProps.skipError){
                let element = document.getElementById("validator-for-" + this.props.name);
                element.innerHTML = ''
                $("#" + this.props.name).removeClass("error");
            }
        }
    }

    render() {
        let {
            labelWidth,
            isError
        } = this.state
        let {
            name,
            displayName,
            type,
            placeholder,
            value,
            tabIndex,
            fontSize,
            autoFocus,
            label,
            multiline,
            icon,
            hideErrors,
            onBlur,
            errors,
            className,
        } = this.props

        return (
            <div className={"custom-input " + (this.props.className ? this.props.className : "")}>
                <div
                    className={(this.props.edit ? "edit" : "view")}
                    id={(this.props.id) ? this.props.id : ""}
                    style={{ width: "calc(100% - " + labelWidth + ")" }}
                    id={name}
                >
                    {
                        this.props.edit ? (!multiline ?
                            <div>
                                <input
                                    type={type}
                                    placeholder={placeholder ? placeholder : ""}
                                    value={value}
                                    tabIndex={tabIndex}
                                    onChange={(e) => this.props.onChange(e)}
                                    onBlur={(e) => this.onBlur(name, displayName, e.target.value)}
                                    style={{ fontSize: fontSize }}
                                    autoFocus={autoFocus}
                                    id={"input-" + name}
                                    label={displayName}
                                    onKeyUp={this.props.onKeyUp ? (e)=>this.props.onKeyUp(e) : ''}
                                />
                                {icon && <i className={icon} />}
                            </div>
                            : <textarea
                                placeholder={placeholder ? placeholder : ""}
                                value={value}
                                tabIndex={tabIndex}
                                onChange={(e) => this.props.onChange(e)}
                                onBlur={(e) => this.onBlur(name, displayName, e.target.value)}
                                style={{ fontSize: fontSize }}
                                autoFocus={autoFocus}
                                id={"input-" + name}
                                label={displayName}
                            />) : <span
                                style={{ fontSize }}
                            >
                                {
                                    value
                                }
                            </span>
                    }
                </div>
                {
                    this.props.edit && !hideErrors ? <div className={"text-danger show"}>
                        <p id={"validator-for-" + name} />
                    </div> : ""
                }
                {
                    errors && (
                        <div
                            id={"validator-for-" + (className ? className : "") + "-container"}
                            className={"text-danger show " + (className ? className : "")}
                        >
                            <p id={"validator-for-"}>{errors}</p>
                            <a href id={"validator-name-" + className} hidden>
                                {displayName}
                            </a>
                        </div>
                    )
                }
            </div>

        );
    }
}
export default Index;
