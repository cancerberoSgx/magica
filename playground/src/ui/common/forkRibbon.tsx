import * as React from 'react'

export const ForkRibbon = () => <div className="forkRibbon" dangerouslySetInnerHTML={getRibbonHtml()} />

function getRibbonHtml() {
  return {
    __html:
      '<a href="https://github.com/cancerberoSgx/magica" style="opacity:0.6;position:fixed;padding:5px 45px;width:auto;top:70px;right:-60px; -webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);box-shadow:0 0 0 3px #f6c304, 0 0 20px -3px rgba(0, 0, 0, 0.5);text-shadow:0 0 0 #555555, 0 0 5px rgba(0, 0, 0, 0.3);background-color:#f6c304;color:#555555;font-size:13px;font-family:sans-serif;text-decoration:none;font-weight:bold;border:2px dotted #555555;-webkit-backface-visibility:hidden;letter-spacing:.5px;">Fork me on GitHub</a>',
  }
}
