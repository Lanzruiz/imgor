# Imgor rebuild

### Getting started
1. ##### Create .env file from example
```sh
  $ cp .env.example .env
```

1. ##### Install packages
```sh
  $ npm i
```

#### Development
1. ##### Start dev server
```sh
  $ npm start
```

#### Production
1. ##### Run React App on your server
2. ##### Add iframe to your website

```html
	<iframe src={url-path-to-react-app}></iframe>
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