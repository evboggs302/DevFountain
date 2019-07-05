Sup Group!

# Getting Started

1. Git clone into a dir in the terminal on your local machine. (this gives you access to the master)
2. cd into the project and " code . "
3. Run npm i to get the needed node modules. Feel free to look in the package.json to look for any dependencies you might need for your branch.

# Make Your Branch

1. Before you start working, make your brnch by opening the terminal in code editor, and typing

```
git checkout -b [lastName-branch]
```

(this makes a new branch and moves you into that branch)

2. You are now free to start coding and editing information. Don't forget to "git commit" your work frequently.

# Pushing Your Branch

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

# Working on anothers Branch

- To assist with or take over another branch, you will need to first

```
git fetch <other branch name>
```

- You will then be able to work on that branch by following the below prompts;

```
git checkout master
git checkout <other branch name>
```

# Merging Your Branch

- Once the branch is completed, follow the above steps to push your branch.
- Once your branch is pushed, you will be able to merge your branch with the master via github.com
