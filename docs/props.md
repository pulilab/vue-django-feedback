# Props:

> Most of the configuration is done through props but several named slots are used as well

## apiUrl
- Type: `String`
- Default: `/api/tickets/`

Define the url where the component should post the submitted form. It is configured to work out of the box with django-simple-feedback

```html
<vue-django-feedback api-url="my_own_url"></vue-django-feedback>
```

## authToken
- Type: `String`
- Default: `''`

If present, the component will append an `Authorization`  header to the POST request containing the token passed to the prop

```html
<vue-django-feedback auth-token="my_token"></vue-django-feedback>
```


## meta
- Type: `String`
- Default: `''`

This prop, if present, first gets passed to `JSON.parse()` and then sent to the request in the backend to the meta slot. If an invalid `Object` is passed, a safe error is raised in the console.

!> These props need a valid Object or Array

```html
<vue-django-feedback meta='{"key": "value"}'></vue-django-feedback>
```


## name
- Type: `String`
- Default: `undefined`

This represents the name of the logged in user, if this and the email props are present, the UI will switch to the Authenticated version. Visit the [Demo](demo) for further explanation.

```html
<vue-django-feedback name="My name!"></vue-django-feedback>
```

## email
- Type: `String`
- Default: `undefined`

This represents the email of the logged in user, if this and the name props are present, the UI will switch to the Authenticated version. Visit the [Demo](demo) for further explanation.

```html
<vue-django-feedback email="vue@pulilab.com"></vue-django-feedback>
```

## avatarUrl
- Type: `String`
- Default: `undefined`

Url to display an optional avatar / pic for the user, if not present a placeholder image is shown.

!> The avatar picture is shown only if the <strong>name</strong> and <strong>email</strong> props are not `null` not `empty` and also not `undefined` as well.


```html
<vue-django-feedback
  email="vue@pulilab.com"
  avatar-url="http://myavatar.com"
  name="My name!">
</vue-django-feedback>
```

## submitButtonText
- Type: `String`
- Default: `'Submit'`

Text of the submit button.

```html
<vue-django-feedback submit-button-text="Send!"></vue-django-feedback>
```

## globalErrorWarning
- Type: `String`
- Default: `'Error!'`

Text of the submit error warning displayed in the left bottom corner when an error occurs.

```html
<vue-django-feedback global-error-warning="Opsy Daisy!"></vue-django-feedback>
```

## nameLabel
- Type: `String`
- Default: `'Your name'`

Value of the label for the name input field

```html
<vue-django-feedback name-label="Username"></vue-django-feedback>
```

## emailLabel
- Type: `String`
- Default: `'Your email'`

Value of the label for the email input field

```html
<vue-django-feedback email-label="Contact email please"></vue-django-feedback>
```

## subjectLabel
- Type: `String`
- Default: `'Subject'`

Value of the label for the subject input field

```html
<vue-django-feedback subject-label="Topic!"></vue-django-feedback>
```

## messageLabel
- Type: `String`
- Default: `'Subject'`

Value of the label for the message text area

```html
<vue-django-feedback message-label="Whatsup?!"></vue-django-feedback>
```
