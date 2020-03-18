import React from "react";
import $ from "jquery";

import "./style.scss";

export class Pagination extends React.Component {
  constructor(props) {
    super(props);

    window.addEventListener("resize", () => this.responsive());

    this.state = {
      isMobile: false,
      currentPage: 1,
      pages: [],
      lastPage: 1
    };
  }

  responsive = () => {
    let { isMobile } = this.state;

    if ($(window).width() < 768 && !isMobile) {
      this.setState({ isMobile: true });
    } else if ($(window).width() >= 768 && isMobile) {
      this.setState({ isMobile: false });
    }
  };

  componentWillReceiveProps(props) {
    const { total, pageSize } = props;
    if (total == this.props.total && pageSize == this.props.pageSize) return;
    if (pageSize != this.props.pageSize || total != this.props.total) {
      this.setState({
        currentPage: 1
      }, () => this.resolvePages(props))
    }
    this.resolvePages(props);
  }

  componentWillMount() {
    this.resolvePages(this.props);
  }

  resolvePages = props => {
    const { total, pageSize } = props;
    const { currentPage } = this.state;
    let pages = [];

    var numOfPages =
      parseInt(total / pageSize) + (total % pageSize > 0 ? 1 : 0);

    if (numOfPages <= 2) {
      pages.push(1);
      pages.push(2);
    } else {
      if (
        currentPage - 2 >= 1 &&
        (currentPage < 3 || currentPage > numOfPages - 1)
      )
        pages.push(currentPage - 2);
      if (currentPage - 1 >= 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage + 1 <= numOfPages) pages.push(currentPage + 1);
      if (currentPage + 2 <= numOfPages && currentPage < 2)
        pages.push(currentPage + 2);
    }
    this.setState({
      pages,
      lastPage: numOfPages
    });
  };

  onChange = page => {
    this.setState({ currentPage: page }, () => {
      this.resolvePages(this.props);
      let { onChange } = this.props;
      if (!onChange) return;
      onChange(page);
    });
  };

  componentDidMount() {
    this.responsive();
  }

  render() {
    return this.renderForDesktop();
    // let { isMobile } = this.state;
    // if (isMobile) {
    //   return this.renderForMobile();
    // } else {

    // }
  }

  renderForMobile() {
    let { pages, currentPage } = this.state;
    return (
      <nav aria-label="Page navigation example">
        <ul className="paginations justify-content-end">
          {pages.map(page => (
            <li
              key={page}
              className={"page-item" + (page == currentPage ? " active" : "")}
              onClick={() => this.onChange(page)}
            >
              <a className={"page-link"} >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  renderForDesktop() {
    let { pages, lastPage, currentPage } = this.state;
    let {enableFirstLastButton}=this.props;
    return (
      <nav aria-label="Page navigations example">
        <ul className="paginations justify-content-end">
          {
            enableFirstLastButton == true && <li className={"page-item"}>
              <a className={"page-link"} onClick={() => this.onChange(1)}>
                Đầu
              </a>
            </li>
          }
          {pages.map(page => (
            <li
              key={page}
              className={"page-item" + (page == currentPage ? " active" : "")}
            >
              <a className={"page-link"} onClick={() => this.onChange(page)}>
                {page}
              </a>
            </li>
          ))}
          {
            enableFirstLastButton == true && <li className={"page-item"}>
              <a className={"page-link"} onClick={() => this.onChange(lastPage)}>
                Cuối
              </a>
            </li>
          }
          
        </ul>
      </nav>
    );
  }
}
export default Pagination;
