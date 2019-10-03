Objective:

 * end user application to build mem like images and animations

Inspiration: https://memingbot.ml/

what's not

 * it's not a repository of images or fonts or anty resource
  contains some samples but in general users are responsible of loading / managing their fonts/images/anims/&colors

## Must 

mobile first. persona is whatsapp/other-chat cell-phone app that wants to easily create a meme.
   * don't focus on a native app, just on a webpage for now.
   * but perhaps we could design the app so later is easy to build a native app. 
      * so users from whatsapp/facebook/telegraph can open the app using an action in the chat app itself (instead of having to open the browser. https://stackoverflow.com/questions/5707722/what-are-all-the-custom-url-schemes-supported-by-the-facebook-iphone-app/5707825#5707825)https://app.urlgeni.us/ https://developers.facebook.com/docs/applinks/add-to-content

## Design thoughts 

 * use vectors /fabricjs or not ?
   * fabricjs would facilitate GUI / editor
   * shouldnt be a problem since any shape can be rasterized. Users should be notified that after that happen there's no go back


Use cases 

### Templates

a way of quicly create a meme with just a clicks and msg

Users are offered with a collection of templates that has some meanful background and some text in the right places / colors and fonts 
  * so they just need to : 1
    * change font /color /stroke, size style of text
    * change image background

### Resource search

the app could connect with image indices (public like imgur or other free repositories and search for a tematic, like "dump", "politician", "scientist"). The app could just open a third party web paage in another tab. Should not focus on getting the resources - just pointing users to the right places (and let them deal with legal issues if any)

Same for fonts - just links to fontwebsites - let them search, get the ttf/odt and load it in the app. 0% leval issues since it's their actions on their computers. 



 * texto serial - time-wise (http://www.imagemagick.org/Usage/anim_mods/#serial)
  * usuario elije la fuente
  * opcionalmente elije el orden de los caracteres y el mismo define char bounds
