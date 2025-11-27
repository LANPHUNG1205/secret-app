# Installation

## Git

Git is required so that you can clone (make a copy version of) the code file from Github to your computer (and also later make changes to the code if you want)

Go to this website [Git](https://git-scm.com/install/windows) and download the latest version.

After installing git successfully, you can check by open Terminal and write the command to check the git version:

```
git --version
```

If the Terminal shows the current version of git, then you're done!

## Node.js

Node.js is required so that you can run the web app in browser (Google Chrome, Firefox...) by http server.

Go the this website [Node.js](https://nodejs.org/en/download) and download the LTS (Long-Term Support) version.

After installing Node.js successfully, you can check by using Terminal and write the command to check the node and npm version:

```
node -v
```

```
npm -v
```

Both should print the versions of node and npm then you are done!

# Clone code project from Github

Directly on this page (the Github repository), click on the green 'Code' button.

Under 'Local', copy the HTTPS path with the .git at the end.

Go to desktop (or anywhere you want to save the code folder), then Right click -> Show more options -> Open Git Bash here

Note: In Git Bash please don't use Ctrl+C and Ctrl+V to copy paste things, just Right click -> Copy/Paste.

Write the following command then Enter (or you can paste directly the HTTPS path you copied from Github after the git clone):

```
git clone https://github.com/LANPHUNG1205/secret-app.git
```

Now you will see a folder with the name 'secret-app' on your desktop (or in the folder that you opened Git Bash)

# Run the app

Right click on the code folder -> Open in Terminal.

Write the following command then Enter:

```
npx http-server
```

After a few seconds you will see different URLs starting with 'http://'.

Ctrl + Click on one of the URL will open the Web App directly on your browser (or just simply copy the URL and paste it on your browser)

Then enjoy the game!








