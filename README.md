## Class Name
urlchanger

This component has 2 functions: -

Auto triggers an outcome on page load.
Changes the browser's url.

If the attribute "outcomeName" is configured and contains the name of an 
outcome attached to the component then it will be automatically triggered on load.
This can be delayed by setting the Delay MS attribute.

Otherwise

The value in the component's state is put into window.location.href which will cause an instant redirect.


