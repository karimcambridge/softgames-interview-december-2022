# SOFTGAMES Interview December 2022

## Instructions

- Create 144 sprites (NOT graphics object) that are stacked on each other like cards in a deck(so object above covers bottom one, but not completely). Every second 1 object from top of stack goes to other stack - animation of moving should be 2 seconds long. So at the end of whole process you should have reversed stack. Display number of fps in left top corner and make sure, that this demo runs well on mobile devices.
- Create a tool that will allow mixed text and images in an easy way (for example displaying text with emoticons or prices with money icon). It should come up every 2 seconds a random text with images in random configuration (image + text + image, image + image + image, image + image + text, text + image + text etc) and a random font size.
- Particles - make a demo that shows an awesome fire effect. Please keep number of images low (max 10 sprites on screen at once). Feel free to use existing libraries how you would use them in a real project.

### Things I could've and should've done better

- Firstly, the code is meh, lol. Could've been slightly better, proper documentation, etc.
- Definitely could've done better dependency injection, it's still a bit monolithic-y / singleton-y..
- Uh, getters and setters, (they aren't used so I didn't bother)
- A better fire particle system, really wanted to attempt some cool realistic graphics but other factors played in this.
- Validity checks, uh, there is like barely any but it's an interview right?
- Interfacing & typings - Definitely slacked on those. Could've thrown in a decorator or 2.

**The following commands are available:**

| Command                       | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `npm start`                   | Start the webpack dev server locally            |
| `npm run build`               | Clean and build the bundle                      |
| `npm run build-only`          | Build the bundle only                           |
| `npm run clean`               | Clean the bundle folder (remove dist)           |
| `npm run predeploy`           | Setup deployment for github pages               |
| `npm run deploy`              | Deploy to github pages                          |

**Live View**

https://karimcambridge.com/softgames-interview-december-2022/