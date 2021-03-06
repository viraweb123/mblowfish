## Fallback Languages

Now you might wonder, after you've read that you can configure a preferred language and register multiple languages to have multi language support, if there's a way to teach your app a fallback language. The answer is yes.

## Registering a fallback language

Teaching your app a fallback language is as easy as just calling a method on the $mbTranslateProvider. Yep right, that sounds too easy, but that's the way it is. Let's say we have an app and we register a translation table for the German language.

	$mbTranslateProvider
	  .translations('de', { /* ... */ });

Now let's say there are some translation ids, that are available in an English translation table, but not in the German translation table. The translate would generally return the given translation id, if it can't find a translation for it in the translation table. If you register a fallback language that has the translation id in it, translate will return this translation instead.

So let's register English as a fallback language for our app, first we have to register the language itself for sure.

	$mbTranslateProvider
	  .translations('de', { /* ... */ })
	  .translations('en', { /* ... */ });

Now we tell translate to use English as a fallback language:

	$mbTranslateProvider
	  .translations('de', { /* ... */ })
	  .translations('en', { /* ... */ })
	  .fallbackLanguage('en');

That's it. If there isn't a translation id in the German translation table, translate will search for it in the English translation table. Easy huh?

## Registering a fallback stack

Now what if you have a set of fallback languages? translate can handle these too! All you have to do is to register your fallback language keys as array:

	$mbTranslateProvider
	  .translations('de', { /* ... */ })
	  .translations('en', { /* ... */ })
	  .translations('fr', { /* ... */ })
	  .fallbackLanguage(['en', 'fr']);

Now, if translate can't find your translation id in the English translation table, which is the first fallback language, it iterates over the rest of registered fallback languages and searches there. This is a one way ticket, which means the iteration starts in this case at en and goes on until fr. You can register as many fallback language as you want.

Note: Because the configuration is being applied as soon as possible, you should define the (initial) fallback languages before calling .preferredLanguage().

## Switching fallback language at runtime

Oh yes even that is possible! There are some cases where you might want to switch your fallback language at runtime too. Or even the entire fallback stack! For example imagine the case where you set German as preferred language and you want to make sure that English is the fallback language. No problem. We can do that already. Now imagine, the actual language is switched to English and you want to fallback to French, but English is already registered as fallback language.

You can switch the fallback language at runtime with the fallbackLanguage() method on the $mbTranslate service. Here's how it could look like:

	$scope.changeLanguage = function (langKey) {
	  if (langKey === 'en') {
	    $mbTranslate.fallbackLanguage('fr');
	  } else if (langKey == 'de') {
	    $mbTranslate.fallbackLanguage('en');
	  }
	  $mbTranslate.use(langKey);
	};

Don't forget that the fallback language key controls the start point of the iteration for fallback languages. If you have en, fr, de as fallback language registered and you switch the fallback language to fr, in that case, if there's a missing translation id, translate only searches in de for a fallback translation.

## Changing the entire fallback stack at runtime

Same as above you can do:

	$scope.changeLanguage = function (langKey) {
	  $mbTranslate.fallbackLanguage(['de', 'en', 'fr']);
	  $mbTranslate.use(langKey);
	};

When changing the entire fallback language stack, you also change the order in how translate iterate over them. So actually, the iteration process stays the same but you change the order of fallback languages to iterate over.

## Limit the fallback languages to iterate

An additional possibility to iterate through the fallback stack is to limit the languages to be scanned for translation keys. There are some use cases where the user / developer wants to scan only a part of the available fallback languages without removing some already defined or loaded languages. This is also possible! As mentioned above, the fallback stack is iterated from 'left to right'. So if we would like to start the iteration after 'de' in the stack of 'de, en, fr', we have to define the start with 'useFallbackLanguage()'.

	// langKey is 'en'
	$scope.changeLanguage = function (langKey) {
	$mbTranslate.fallbackLanguage(['de', 'en', 'fr']);
	$mbTranslate.useFallbackLanguage(langKey);
 
From now on - all translation texts in 'de' will be ignored and skipped. Important notice: If the ignored language is the preferred or current translation, it will be translated within that language - even though it should be skipped!
