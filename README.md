Sup Group!

# **Getting Started**

1. Git clone into a dir in the terminal on your local machine. (this gives you access to the master)
2. cd into the project and " code . "
3. Run npm i to get the needed node modules. Feel free to look in the package.json to look for any dependencies you might need for your branch.

## _Make Your Branch_

1. Before you start working, make your branch by opening the terminal in code editor, and typing

```
git checkout -b <yourLastName>-branch
```

(this makes a new branch and moves you into that branch)

2. You are now free to start coding and editing information. Don't forget to "git commit" your work frequently.

## _Pushing Your Branch_

- As you work, you should be familiar with the git add and git commit commands. For this group project, run the below when you are ready to push your code to GitHub.

```
git add .
git commit -m '<enter your commit message>'

git pull origin master
    (resolve any conflicts come up)

git add .
git commit -m 'resolved conflicts'
git push origin <brnach name>
```

## _Working on anothers Branch_

- To assist with or take over another branch, you will need to first

```
git fetch <other branch name>
```

- You will then be able to work on that branch by following the below prompts;

```
git checkout master
git checkout <other branch name>
```

## _Merging Your Branch_

- Once the branch is completed, follow the above steps to push your branch.
- Once your branch is pushed, you will be able to merge your branch with the master via

github.com --> pull requests --> New pull request

# **Testing**

## _Integration Testing (server)_

- When testing the connection a call makes to the server/DB, reference the successful tests in in the below path:

```
src/TESTS/userController.test.js
```

- To make these tests run, you will need to use the below command line for the correst test to run;

```
npm run test
```

## _Unit Testing (single function)_

- When testing the data and functionality of a hook, reference the successful tests in in in the below path:

```
src/TESTS/testHook.test.js
src/TESTS/useFetch.test.js
```

- To make these tests run, you will need to use the below command line for the correst test to run;

```
npm run test
```

##### _This README created by [Evan Boggs](https://github.com/evboggs302)_
