import * as React from 'react'
import { AbstractComponent } from './common/component'
export class About extends AbstractComponent {

  render() {
    return (
      <>
        <h3>About</h3>
        <p>Welcome to <a href="https://github.com/cancerberoSgx/magica">Magica</a>'s playground, a place to run ImageMagick commands in the browser.</p>
        <h4>Usage</h4>
        <p>First, at the top left there is a list of examples which declare some images (with urls) and a ImageMagick command like `convert foo.png -scale 55% bar.gif`</p>
        <p>If you want to build your own commands (and that's the real purpose of this tool), you first need to declare the input images by providing a URL or selecting a local image file. Take into account that:</p>
        <ul>
          <li>In the command, **images are referenced only by its base name** which is inferred from given url or file path. For example if the URL is <code>https://i.imgur.com/UG1hgFf.jpg</code> then the command must reference by the name of <code>UG1hgFf.jpg</code>, for example, <code>convert UG1hgFf.jpg -rotate 44 out.gif</code></li>
          <li>All given input files will be remembered so they can be referenced in future commands. They are listed at the left-bottom side of the screen.</li>
          <li>Not all servers allow to load images (cross domain policy). A website it does if imgur.com. Another alternative is uploading to a github pages project. (please tell me if you know another one)</li>
          <li>Any image format can be used as input, including non supported by browser like tiff, psd, tga, etc</li>
          <li>For them to be rendered in the browser, output image formats must be supported by it, so use output image formats like png, jpg, gif.</li>
        </ul>
      </>
    )
  }
}
