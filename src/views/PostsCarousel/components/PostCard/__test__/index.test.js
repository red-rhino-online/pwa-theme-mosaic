import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PostCard from '../index';

describe('Post card', () => {
  it('should render correctly post with featured image', () => {
    const mockPost = {
      id: 1,
      title: {
        rendered: 'Mock title',
      },
      author: 55,
      categories: [43, 54, 23],
      slug: 'mock-slug',
      content: {
        rendered: 'Some mock content to be rendered',
        protected: false,
      },
      excerpt: {
        rendered: 'Some mock exceprt to be rendered',
        protected: true,
      },
      featured_media: 23,
      date: 'some mock date',
      _embedded: {
        author: [
          {
            id: 55,
            name: 'Some mock author',
          },
          {
            id: 56,
            name: 'Another mock author',
          },
        ],
        'wp:term': [[
          { id: 43, name: 'Some category', slug: 'some-category-slug-1' },
          { id: 54, name: 'Some category', slug: 'some-category-slug-2' },
          { id: 23, name: 'Some category', slug: 'some-category-slug-32' },
        ]],
        'wp:featuredmedia': [
          {
            id: 23,
            source_url: 'someMockImageUrl',
          },
        ],
      },
    };
    const category = {
      params: {
        categoryId: '32',
        categorySlug: 'some-slug',
      },
    };
    const output = shallow(<PostCard post={mockPost} category={category} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly post without image', () => {
    const mockPost = {
      id: 1,
      title: {
        rendered: 'Mock title',
      },
      author: 55,
      categories: [43, 54, 23],
      slug: 'mock-slug',
      content: {
        rendered: 'Some mock content to be rendered',
        protected: false,
      },
      excerpt: {
        rendered: 'Some mock exceprt to be rendered',
        protected: true,
      },
      featured_media: 0,
      date: 'some mock date',
      _embedded: {
        author: [
          {
            id: 55,
            name: 'Some mock author',
          },
        ],
        'wp:term': [[
          { id: 43, name: 'Some category', slug: 'some-category-slug-1' },
          { id: 54, name: 'Some category', slug: 'some-category-slug-2' },
          { id: 23, name: 'Some category', slug: 'some-category-slug-32' },
        ]],
      },
    };

    const category = {
      params: {
        categoryId: '32',
        categorySlug: 'some-slug',
      },
    };

    const output = shallow(<PostCard post={mockPost} category={category} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
