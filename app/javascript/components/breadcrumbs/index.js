import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';
import { unescape } from 'lodash';

const parsedText = text => unescape(text).replace(/<[/]{0,1}strong>/g, '');

class Breadcrumbs extends Component {
  renderItems = () => {
    const {
      items, controllerName,
    } = this.props;
    return items.filter((item, index) => index !== (items.length - 1)).map((item, index) => {
      const text = parsedText(item.title);
      if ((item.url || item.key) && !item.action) {
        if (item.key) {
          return (
            <Breadcrumb.Item
              key={`${item.key}-${index}`} // eslint-disable-line react/no-array-index-key
              onClick={() => sendDataWithRx({ breadcrumbSelect: { path: `/${controllerName}/tree_select`, key: item.key } })}
            >
              {text}
            </Breadcrumb.Item>
          );
        }
        return (
          <Breadcrumb.Item
            key={item.url || index}
            href={item.url}
          >
            {text}
          </Breadcrumb.Item>
        );
      }
      return <li key={index}>{text}</li>; // eslint-disable-line react/no-array-index-key
    });
  };

  render() {
    const {
      items, title, controllerName, ...rest
    } = this.props;
    return (
      <Breadcrumb style={{ marginBottom: 0 }} {...rest}>
        {items && this.renderItems()}
        <Breadcrumb.Item active>
          <strong>
            {items ? parsedText(items[items.length - 1].title) : parsedText(title)}
          </strong>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      action: PropTypes.string,
      key: PropTypes.string,
    },
  )),
  title: PropTypes.string,
  controllerName: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  items: undefined,
  title: undefined,
  controllerName: undefined,
};

export default Breadcrumbs;
