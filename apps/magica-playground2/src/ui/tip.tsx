import * as React from 'react';
import { useAppState } from '../state';
import { File } from 'magica'
import * as FileSaver from 'file-saver'

interface Props {
  // text: string
  className?: string
  icon?: string
  children: any
}

/** TODO: an image component with options for: save-as, replace, rename, and collection options as: delete, duplicate */
export function Tip(props: Props) {
  return (
    <div className="dropdown is-right is-down">

      <span className={`icon dropdown-trigger ${props.className || ''}`} style={{ cursor: 'pointer' }}
        onClick={e => {
          e.currentTarget.parentElement.classList.toggle('is-active')
        }}>
        <i className={`fas ${props.icon || 'fa-question-circle'}`}></i>
      </span>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            {props.children}
          </div>
        </div>
      </div>

    </div>)
}
