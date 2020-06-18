## About this app
This is my master project. It was entirely designed by me, but its true strength lies in the code. With a clean design pattern, it is truly scalable. To do so, it's really a matter of time and effort, the structure is all here, for I have left lots of reusable components, you may want to open the UUI Elements folder (but not only) to understand the sheer force behind this statement. It took quite some time and effort to build such structure, but I finally decided to release it.

## Live demo at https://aniworld-mern.web.app/

Home Page            |  Category Showcase
:-------------------------:|:-------------------------:
![](https://i.ibb.co/GswL4gn/index.png)  |  ![](https://i.ibb.co/GswL4gn/index.png)

Advanced Search            |  Sign Up
:-------------------------:|:-------------------------:
![](https://i.ibb.co/GswL4gn/index.png)  |  ![](https://i.ibb.co/GswL4gn/index.png)

## How to run it

Simply type consecutively:

### `npm i`
### `npm start`

>> In both the FRONT END folder and the BACK END folder. You can find the BACK END folder here: https://github.com/rmc-softdev/RealEstateBackend

## Technical comments

The data management is very neatly handled by the new Context API, which handles both the login and the filters, for I had already one big project with Redux and decided to expand my tools a bit. Every component is functional, with tons of hooks, one of the things I highly regarded about it was the custom hooks, we have a custom hook for http requests, for the auth and so on so forth. A great deal of the UI error handling comes from the back end, but not only, for we also have lots of customizable components, almost every input, for example, comes from a customizable form control.

## Issues

I honestly think that this project's size is pretty big and as such it became quite troublesome to keep expanding as just a side project, for one thing, the form control which I once highly regarded became so big and complex that if you don't look at it for a couple of days you might get lost on how to use it properly. This slowed me down, sometimes and I think I could've maybe done some better logic here and there (from this principle of minimal effort).
