/* global describe, it, before, after, document, window */
import chai from 'chai';
import { destroyElement } from 'widget-utils';

import { mCell, calendar } from '../../src/styles/calendar.scss';
import BookingSyncCalendar from '../../src/bookingsync-calendar-widget';

const { expect } = chai;
const { keys } = Object;

const stubElement = (name, attrs) => {
  const params  = attrs || {};
  const element = document.createElement(name);
  keys(params).map((i) => element.setAttribute(i, params[i]));
  return element;
};

const div1 = stubElement('div', { 'data-bookingsync-calendar-widget': true });
const div2 = stubElement('div', { 'data-bookingsync-calendar-widget': true });

describe('BookingSync Calendar renders on containers with auto-init', () => {
  before(() => {
    document.body.appendChild(div1);
    document.body.appendChild(div2);
  });

  after(() => {
    BookingSyncCalendar.instances.map((a) => a.destroy());
    destroyElement(div1);
    destroyElement(div2);
  });

  it('renders 2 widgets on the page', () => {
    document.addEventListener('DOMContentLoaded', () => {
      expect(document.querySelectorAll(`.${calendar}`).length).to.be.equal(2);
    });
  });

  it('renders 4 (2 * 2) months', () => {
    document.addEventListener('DOMContentLoaded', () => {
      expect(document.querySelectorAll(`.${mCell}`).length).to.be.equal(4);
    });
  });

  it('exposes widget-utils', () => {
    expect(window.BookingSyncWidgetUtils).to.exist;
  });
});
