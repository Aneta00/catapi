This is a [Next.js](https://nextjs.org/) project that uses [The Cat Api](https://thecatapi.com/)

## Getting Started

1. First in the root of the project create '.env.local' file and add your api key var:

NEXT_PUBLIC_CAT_API_KEY=""

2. Then, run the development server:

```bash

yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Notes

- Next.js app with styled components as css tool. 
- I created two components: Grid and Typography to show how I would normally set it up when building components for the design system or components for specific project. 
- Wouldn't normally used third party ui libraries for big production projects, but used Ant Design for the rest of the components to save time. Used Ant Design for the reason just to make it a bit different and not use MUI. 
- My Api key is stored in .env.local file 
- Every page needs H1, but I hid it on home page visually, because it is self explanatory, kept it off the screen for indexing and screen readers. 

## Challenges

- Set it up to display all the images from the Api at first, before figured out how to show only images uploaded by a specific user. I set 'sub_id' to be the same as 'user_id' found in '/favourites' endpoint.

- Added voting functionality at first inside the Card component, but it was causing issues with calculations as the data returned from votes is not accumulated but is spread as 1 vote per row, so I then moved the voting counting to the parent and created a map of sum of votes and storing it in the state and passing it down to the single card. The same with favourites.

## Improvements if more time:

- More separation of pages and components
- Introduce context or state management
- Could create a fetch hook to minimise code repetition
- Add storybook to manage components
- Add visual regression testing to storybook (screenshot comparison)
- Add unit tests / React Testing Library tests to components 

