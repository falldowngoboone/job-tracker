job-tracker
===========

This is a tiny little AngularJS project I've been working on to get the hang of Angular. It's an update list based on a multi-client, multi-project work flow. It's horribly primitive, so please forgive the lack of style, function, etc. It's a work in progress.

## Requirements

There are some requirements to run this little app. I'm working on automating this. Please bear with me.

### Sass

You'll need Sass to compile the styles. One way to get the compiler is to use the Ruby gem:

`gem install sass`

Check out [Sass's documentation](http://sass-lang.com/documentation/) for more info if you need help.

Once installed, cd into the css directory (`cd ~/<path-to-folder>/job-tracker/css`) and compile the Sass:

`sass style.scss output.css`

### PHP

To run this, you must have a PHP server running in the background. In a Linux/Unix environment, in your Terminal, cd into the job tracker directory and type:

`php -S localhost:8000`

Now you can navigate to localhost:8000 in your browser. I ended up creating a .command file to do this for me. It's more convenient. To do this, create a new file named `hotsheet.command` and open it in your [favorite text editor](http://www.sublimetext.com). Put this code in the file:

````
#!/bin/bash

cd ~/Projects/job-tracker
php -S localhost:8000
````

Now all you need to do is double-click this command file to spin up a PHP server.

The first time you edit something, the `scripts/writeJSON.php` should automatically create the `data/` directory to store the hs-data.json file. This is where all of the information is save.

## Future Plans

### AngularJS Seed App

I plan on converting this project to [Angular's seed app](https://github.com/angular/angular-seed). There's a lot of goodness baked into that, including testing and npm install to automatically install dependencies and build out all the files.

### RESTful Service

I want to bolt on a RESTful service instead of making a complete file rewrite every single time the data is saved. It's a waste of resources.

## Final Words

If you see something that doesn't make sense, please post an issue. I want to make this the best it can be.