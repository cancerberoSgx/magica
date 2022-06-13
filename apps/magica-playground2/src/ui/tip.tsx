import * as React from 'react';

interface Props {
  // text: string
  className?: string
  icon?: string
  children: any
}

/** TODO: an image component with options for: save-as, replace, rename, and collection options as: delete, duplicate */
export function Tip(props: Props) {
  const [visible, setVisible] = React.useState(false)
  return (
    <div className={`dropdown is-right is-down ${visible ? 'is-active' : ''}`}>

      <span className={`icon dropdown-trigger ${props.className || ''}`} style={{ cursor: 'pointer' }}
        onClick={e => {
          // e.currentTarget.parentElement.classList.toggle('is-active')
          setVisible(!visible)
        }}>
        <i className={`fas ${props.icon || 'fa-question-circle'}`}></i>
      </span>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={()=>setVisible(false)}>
            {props.children}
            {/* <button onClick={()=>setVisible(false)}>Close</button> */}
          </div>
        </div>
      </div>

    </div>)
}
