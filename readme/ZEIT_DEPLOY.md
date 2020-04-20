# How to set up Zeit.co deploy
Without any permissions in the tutinformatics organization.  

Disclaimer: This is not a "nice" or very useful solution.

### Setting up repository

1. Create a fork of the desired repository in tutinformatics org.  
E.g https://github.com/tutinformatics/ofbiz-ui

2. Clone the repo from tutinformatics
```bash
git clone https://github.com/tutinformatics/ofbiz-ui.git
```
3. Add the forked repo as a remote (add your username)
```bash
git remote add forked https://github.com/username/ofbiz-ui.git
```

### Setting up zeit

1. Create a Zeit.co account using your Github account  
https://zeit.co/signup

2. Import project to zeit by clicking on *Import Project from Github*  
https://zeit.co/import/git  
Click on the link to edit *repository access settings*
and under *Select repositories* choose ofbiz-ui and hit *Save*

3. Refresh https://zeit.co/import/git and import again, repo should be visible, select it and import it

4. Change *Output directory* to **dist** (if ofbiz-ui) and finally click *Deploy*

5. Zeit.co will build and deploy master branch

### Deploy your own branch

1. Work on your branch and `git push` to your branch in tutinformatics

2. To deploy your branch push changes to forked repo
```bash
git push forked branchName
```

3. Zeit.co will build your branch and give a branch specific deploy URL.
