# Add remote repo
git remote add cs git@bitbucket.org:cs-bitbucket/imgor-react.git

# Make sure on master
git checkout master

# Pull from CS remote
git pull cs master

# Pull from ATL remote
git pull origin master

# Push to remote ATL repo
git push origin master