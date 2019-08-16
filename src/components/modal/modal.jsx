import React from 'react'
import { Modal } from 'antd-mobile'

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default class modal extends React.Component {

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  render() {
    const { msg } = this.props
    return (
      <Modal
        visible={this.state.modal1}
        transparent
        maskClosable={false}
        onClose={this.onClose('modal1')}
        title="Title"
        footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        afterClose={() => { alert('afterClose'); }}
      >
        <div>{msg}</div>
      </Modal>
    )
  }
}
