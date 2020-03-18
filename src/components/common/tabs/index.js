import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import $ from "jquery";
import { IconButton } from "@material-ui/core";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      scrollPosition: "none",
      isHanldeScroll: true
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    let { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  scrollLeft() {
    this.setState({
      isHanldeScroll: false
    }, () => {
      let tabBar = $("#custom-tab-bar>div>div>div");
      tabBar.animate({ scrollLeft: 0 }, 'slow');
    })
  }
  scrollRight() {
    this.setState({
      isHanldeScroll: false
    }, () => {
      let tabBar = $("#custom-tab-bar>div>div>div");
      tabBar.animate({ scrollLeft: tabBar.get(0).scrollWidth - tabBar.innerWidth() }, 'slow');
    })
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
    let tabBar = $("#custom-tab-bar>div>div>div");
    if (tabBar.innerWidth() < tabBar.get(0).scrollWidth) {
      this.setState({
        scrollPosition: "start",
        isHanldeScroll: true
      })
    }

    tabBar.scroll(() => {
      if (this.state.isHanldeScroll) {
        this.setState({
          scrollPosition: "midle"
        })
      }
      if (tabBar.scrollLeft() + tabBar.innerWidth() === tabBar.get(0).scrollWidth) {
        this.setState({
          scrollPosition: "end",
          isHanldeScroll: true
        })
      }
      if (tabBar.scrollLeft() === 0) {
        this.setState({
          scrollPosition: "start",
          isHanldeScroll: true
        })
      }
    })

  }

  render() {
    let { scrollPosition } = this.state;

    const {  theme, tabLabels, tabContainers } = this.props;

    return (
      <div
        className={
          "custom-tabs " + (this.props.className ? this.props.className : "")
        }
      >
        <AppBar position="static" color="default" className="tab-bar" id="custom-tab-bar">
          {
            (scrollPosition === "end" || scrollPosition === "midle") &&
            <div className="back">
              <IconButton onClick={() => this.scrollLeft()}>
                <NavigateBeforeIcon />
              </IconButton>
            </div>
          }
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            scrollButtons="auto"
            className="tab"
          >
            {tabLabels &&
              tabLabels.length > 0 &&
              tabLabels.map((tab, i) =><Tab label={tab} key={i} />)}
            </Tabs>
          {
            (scrollPosition === "start" || scrollPosition === "midle") &&
            <div className="next">
              <IconButton onClick={() => this.scrollRight()}>
                <NavigateNextIcon />
              </IconButton>
            </div>
          }
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabContainers &&
            tabContainers.length > 0 &&
            tabContainers.map((container, i) =>
              container && <TabContainer
                index={i}
                value={this.state.value}
                dir={theme.direction}
                key={i}
                className="tab-container"
              >
                {container}
              </TabContainer>
            )}
        </SwipeableViews>
      </div>
    );
  }
}
Index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Index);


