import React from 'react';
import renderer from 'react-test-renderer';

import mockStore from '../../../__mocks__/redux-mock-store';

import SideMenu from '../index';

jest.mock('../PageList', () => 'Page list test');

describe('Side menu', () => {
  it('renders side menu', () => {
    const store = mockStore({
      pages: {
        items: [],
        isFetching: 1,
      },
      translations: {
        items: {},
        isFetching: 1,
      },
      sideMenuVisible: true,
    });
    expect(renderer.create(<SideMenu store={store} fetchPages={jest.fn()} />)).toMatchSnapshot();
  });
  it('renders hidden side menu', () => {
    const store = mockStore({
      pages: {
        items: [],
        isFetching: 0,
      },
      translations: {
        items: {},
        isFetching: 1,
      },
      sideMenuVisible: true,
    });
    expect(renderer.create(<SideMenu store={store} fetchPages={jest.fn()} />)).toMatchSnapshot();
  });
  it('renders side menu', () => {
    const store = mockStore({
      pages: {
        items: [
          {
            id: 53,
            parent: 5,
            title: {
              rendered: 'Page Title',
            },
            slug: 'page-slug',
            content: {
              rendered: 'Page content',
            },
            link: 'page-link',
            author: 68,
            comment_status: 'open',
            featured_media: 36,
            status: 'status',
          },
        ],
        isFetching: 0,
      },
      translations: {
        items: {
          LINKS: 'Visit website',
          GO_TO: 'Go to',
        },
        isFetching: 1,
      },
      sideMenuVisible: true,
    });
    expect(renderer.create(<SideMenu store={store} fetchPages={jest.fn()} />)).toMatchSnapshot();
  });
});
