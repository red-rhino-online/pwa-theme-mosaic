import React, { Component } from 'react';
import { List, Header, Icon } from 'semantic-ui-react';

export default class PageList extends Component {
  state = { parentIds: [], pages: [], parentPageTitle: ['Go to'], goBack: false };

  componentWillReceiveProps() {
    this.setState({ parentIds: [...this.state.parentIds, 0] });
  }
  setParentsList(parentId, pages, parentPageTitle) {
    this.setState({
      parentIds: [...this.state.parentIds, parentId],
      pages: [...this.state.pages, pages],
      parentPageTitle: [...this.state.parentPageTitle, parentPageTitle],
      goBack: false,
    });
  }
  setParentsBackList(wat) {
    this.state.parentIds.pop();
    const poppedParentIds = this.state.parentIds;
    this.state.parentPageTitle.pop();
    const poppedPageTitles = this.state.parentPageTitle;
    this.setState({ parentId: poppedParentIds, parentsPageTitle: poppedPageTitles, goBack: true });
  }

  render() {
    const checkParent = this.state.parentIds[this.state.parentIds.length - 1];
    let parents;
    this.state.goBack === false ? (parents = this.props.pages.filter(page => page.parent === checkParent)) : (parents = this.state.pages.pop());

    return (
      <List divided relaxed>
        {checkParent === 0 ? (
          <Header>{this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}</Header>
        ) : (
          <Header>
            <Icon name="caret left" onClick={e => this.setParentsBackList()} />
            {this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}
          </Header>
        )}
        {parents.map(page => (
          <List.Item key={Math.random()}>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">{page.title.rendered}</List.Header>
            </List.Content>
            {page.children.length > 0 ? (
              <List.Icon
                link
                name="triangle right"
                size="large"
                verticalAlign="middle"
                onClick={e => this.setParentsList(page.id, parents, page.title.rendered)}
              />
            ) : (
              ''
            )}
          </List.Item>
        ))}
      </List>
    );
  }
}
