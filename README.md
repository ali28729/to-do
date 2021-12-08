# To-Do App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

</section>

</div>

</div>

</section>


<section class="docs-section">

## Folder & File Structure

<div class="adocs-section-content ng-binding">

The codebase structure used in this project is detailed below.

- <span class="f-path">node_modules/</span>

  All the dependency and third party libraries are placed in this folder.

- <span class="f-path">public/</span>

  This folder basically keeps the public assets.


- <span class="f-path">src/</span>
  This folder contains all the code for the app.

    - <span class="f-path">@fake-db/</span>

      This folder keeps the fake-db code which is used to mock network requests.

    - <span class="f-path">containers/</span>

      Here is the components/ folder where we place common components used throughout the app. So, if you want to create a component which you want to reuse throughout the app, you should place that component here. 

    - <span class="f-path">components/</span>

      components/ folder contains the code for the actual app, it contains functional component which use various dependencies throughout the app to actually deliver the UI/UX.

		- <span class="f-path">[folder-name]/store/</span>
		
			Each subfolder here is another independent module within the app with it's own redux store files. Actions and reducers for the specific modules are defined here.

    - <span class="f-path">store/</span>

     	Store folder contains all the redux configuration files and a demo action/reducer file to demonstrate how the state at macro level app will be manager whereas each module will have their own place for maintaining redux files.


- <span class="f-path">.prettierrc.json</span>

  Keeps the prettier formatting config files to have a consistent dev. experience in a team.


</div>

</section>

## Technologies Used

- [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter) : Used to simulate network requests to reduce the chances of errors in integration phase
- [MUI](mui.com): To develop a consistent UI.
- [Tailwind](https://tailwindcss.com/): For responsiveness and layouts. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
