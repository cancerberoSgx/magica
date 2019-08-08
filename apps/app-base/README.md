a basic abstract applicatoin that works and implements generic widgets so it can be resampled multiple times and extendeds. supports:

  * Component abstract class
  * Store and state
  use the store API that this provides
  * main
  * worker that just executes commsands
  * basica layout with headr and body
 * the property app on state contains information like name urls about the app thar this needs to render . Also has configurable labewls, color positions of containers, layout, etc
 * implement their own index.htm that loads their own main() function. but this later must call and wait our main()
 "sub" applications  must

 * import this project as a library
  * use this store,  
  * subclass component
