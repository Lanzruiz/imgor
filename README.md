# Imgor rebuild

Repository: https://git.largeinc.com/atlargeinc/imgor-v3-react
- Need to have access

### Requirements

- **NodeJs 10.15+**
- **Yarn 1.12+**

`API STAGE: https://imgor-api-dev.largeinc.com/api/v1/`

- Branch `master` is the main branch which all task should have branch from it

- Clone project on your local machine

- Go to directory folder and follow steps below:

### Getting started
1. ##### Create .env file from example
```sh
  $ cp .env.example .env
```

1. ##### Install packages
```sh
  $ yarn install
```

#### Development
1. ##### Start dev server
```sh
  $ yarn start
```

#### Production (NOT REQUIRED FOR DEVELOP)
1. ##### Run React App on your server
2. ##### Add div container to your website
3. ##### Add bundled script into your page
```html
	<div
		id="imgor-root"
		data-external_init="false"
		data-rep-email="repemail@pls.com"
		data-sport="Golf"
		data-gender="male"
		data-group=""
		data-secondary_group=""
		data-business_type="Youth Camp"
		data-api-url=""
		data-url-to-no-props="/abc"
		data-redirect-url-shopify=""
		data-app-key="abc"
		data-last_changed="1547592269991"
		data-display-footer="true"
		data-content-path="/settings/locale.en.json"
		data-settings-path="/settings/settings.json"
		data-via-logo-path="https://t6hgmcqx.s3.amazonaws.com/2c7a9538-3f33-70c4-29f5-ae75f59b6445/fn7s1pm3wnitd4rh/via-approved.png"
	></div>
	
	<script src="/static/js/main.code.chunk.js">
```

3. ##### SCSS
    ##### You can change SCSS variables if you want change view.

```
Path to SCSS variables: ./src/constants/scss/variables.scss
```

4. ##### To add another locale just translate file ```en.json``` and name its ```{locale}.json```
```
Path to Locales directory: ./src/assets/lang/en.json
```

#### App Settings
1. ##### To set default settings use:
```
{app-url}/start?lang={lang}&package_type={packageType}&business_type={businessType}&sport={sport}
```
