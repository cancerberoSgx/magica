import * as React from 'react';

export const DropDown = props => <div className="dropdown">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3"
      onClick={e => {
        const dropdown = (e.target as HTMLButtonElement).closest('.dropdown');
        dropdown.classList.toggle('is-active');
      }}>
      <span>Click me</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu3" role="menu">
    <div className="dropdown-content">
      <a href="#" className="dropdown-item">
        Overview
      </a>
      <a href="#" className="dropdown-item">
        Modifiers
      </a>
      <a href="#" className="dropdown-item">
        Grid
      </a>
      <a href="#" className="dropdown-item">
        Form
      </a>
      <a href="#" className="dropdown-item">
        Elements
      </a>
      <a href="#" className="dropdown-item">
        Components
      </a>
      <a href="#" className="dropdown-item">
        Layout
      </a>
      <hr className="dropdown-divider" />
      <a href="#" className="dropdown-item">
        More
      </a>
    </div>
  </div>
</div>;
