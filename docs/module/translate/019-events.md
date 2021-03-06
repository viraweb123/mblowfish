Events
angular-translate triggers some custom events on $rootScope you can react on once they are fired. Please make sure to also listen on $rootScope for these events! You can't listen to them on $scope, since they are only emitted at a $rootScope level, to create an application-wide event bus with better performance.

This document describes the different events and when they get fired.

General
Some events get fired independently from how you have configured angular-translate. These are general events you could always expect to be fired.

$translateChangeStart

Gets fired anytime angular-translate starts to try to change the language. This is at startup, when setting the language the first time, or when changing the language at runtime using $translate.use(). This event gets also fired when angular-translate has to load translation data asynchronously first.

$translateChangeSuccess

As the event name says, this gets fired once a translation change was successful. When not using an asynchronous loader, this event gets usually fired immediately after $translateChangeStart event. This event gets also fired after an asynchronous loader had to load translation data first.

$translateChangeError

Gets fired when a translation change failed. This actually only occurs when an asynchronous loader rejects a returned promise.

$translateChangeEnd

Gets always fired when a translation change ends, wether it was successful or not, and after all registered interpolation services have been notified about the translation change.

Asynchronous loading
There are some events that get only fired when an asynchronous loader is used. These are covered here.

$translateLoadingStart

Just as the event name says, this event gets fired when a registered asynchronous loader gets invoked, right after $translateChangeStart has been fired.

$translateLoadingSuccess

Gets fired when the asynchronous loader returns with a resolved promise.

$translateLoadingError

Gets fired when the asynchronous loader returns with a rejected promise.

$translateLoadingEnd

Gets fired wether an asynchronous loader returned with a resolved or rejected promise. In the case a loader returned with a resolved promise, this gets fired after the translation table has been updated.

$translatePartialLoaderStructureChanged

Gets fired when changing the "structure" of $translatePartialLoader using any kind of *Part() method.

