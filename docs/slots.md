# Slots:

> In order to be able to configure a longer message section of the form, several named slots are implemented:

!> Due to the web-component nature of vue-django-feedback slot must be named `vue-slot="slot_name"`

## header-text
```html
<!-- Default -->
Ask our experts!
```

Change the default header markup to anything present in the slot, more complex structures can be inserted as well.

```html
<vue-django-feedback>
  <span vue-slot="header-text">
    Feel free to complain
  </span>
</vue-django-feedback>
```

## success-header

```html
<!-- Default -->
Thank you!
```

Change the default success header markup to anything present in the slot, more complex structures can be inserted as well.

```html
<vue-django-feedback>
  <span vue-slot="success-header">
    Awesome!
  </span>
</vue-django-feedback>
```

## success-message
```html
<!-- Default -->
Your message has been successfully sent!
We will be back to you soon!
```

Change the default success message markup to anything present in the slot, more complex structures can be inserted as well.

```html
<vue-django-feedback>
  <span vue-slot="success-message">
    Gotcha, we will be in touch!
  </span>
</vue-django-feedback>
```

## error-header
```html
<!-- Default -->
Sorry
```

Change the default error header markup to anything present in the slot, more complex structures can be inserted as well.

```html
<vue-django-feedback>
  <span vue-slot="error-header">
   Ops!
  </span>
</vue-django-feedback>
```

## error-message
```html
<!-- Default -->
There was a problem processing your ticket,
please try again
```

Change the default error message markup to anything present in the slot, more complex structures can be inserted as well.

```html
<vue-django-feedback>
  <span vue-slot="error-message">
   Mmmh, Something when crazy, try again!
  </span>
</vue-django-feedback>
```
