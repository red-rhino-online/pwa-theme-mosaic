import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Sidebar, Loader } from 'semantic-ui-react';

import { fetchPages } from './action';
import { getPages, pagePropType, getPagesFetching } from './reducer';
import PageList from './components/PageList';

// translations
import { fetchTranslations } from '../../translations/actions';
import { getTranslations, getTranslationsFetching } from '../../translations/reducers';

import './style.css';

class SideMenu extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages({}));
    dispatch(fetchTranslations);
  }

  render() {
    const { pages, translations } = this.props;

    return (
      <Sidebar visible={this.props.sideMenuVisible} direction="right">
        {this.props.loadingPages === 1 && this.props.loadingTranslations === 1 ? <Loader active /> : ''}
        <PageList text={translations.LINKS} pages={pages} />
      </Sidebar>
    );
  }
}

SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadingPages: PropTypes.number.isRequired,
  sideMenuVisible: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(pagePropType).isRequired,
  translations: PropTypes.shape({
    LINKS: PropTypes.any,
    GO_TO: PropTypes.any,
  }),
  loadingTranslations: PropTypes.number.isRequired,
};

SideMenu.defaultProps = {
  translations: {
    LINKS: 'Visit website',
    GO_TO: 'Go to',
  },
};

const mapStateToProps = state => ({
  pages: getPages(state.pages),
  loadingPages: getPagesFetching(state.pages),
  sideMenuVisible: state.sideMenuVisible,
  loadingTranslations: getTranslationsFetching(state.translations),
  translations: getTranslations(state.translations),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPages, fetchTranslations }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
