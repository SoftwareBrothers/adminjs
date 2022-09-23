Short description of current changes:

1. Frontend code (mostly bundling & React code) moved to new repository "@adminjs/frontend". New frontend will use
react-app-composer to make managing the frontend easier and make it fully customizable.
2. Common code (common types, utils used across different packages, etc) moved to new repository "@adminjs/common",
Exports from "@adminjs/common" are namespaced, for example "@adminjs/common/utils", "@adminjs/common/interfaces", "@adminjs/common/constants", etc
3. Localization is now no longer a part of core/backend. Handlers should return localization codes at most, the translations will now be kept as a part of "@adminjs/frontend". Initializing translations in the frontend should make managing languages easier. If you need custom translations in the backend, consider setting up a separate i18n instance.
4. ViewHelpers are no longer a part of core/backend. Separating frontend from core ("adminjs") repository allows you to host frontend elsewhere than the backend. Backend may not know what the frontend's URL is, so instead all redirects etc should be done in the frontend using React Router.
5. Configuration of AdminJS instance will remain mostly the same until version 8. This is to make migrating from version 6 to 7 smoother. However, keeping frontend configuration alongside backend code is not the best solution either so you can expect some configuration to be moved to "@adminjs/frontend" in v8.
For now, most notable changes in configuration are:
- removed `assets` from `AdminJSOptions` - this is no longer needed in the backend at all, while you can simply bundle any css and js browser code using webpack with `@adminjs/frontend`
- removed `locale` due to what we stated above
- you still define dashboard/page/action/property components using `component` prop in a given setting. However, you no longer need to use `AdminJS.bundle`. Instead, you just have to type in a name of a React component that you have bundled in `@adminjs/frontend`. This is one of the options that will later be moved to the frontend repository.
6. all bundling related logic has been removed, you will now have to bundle frontend code by yourself using Webpack. This adds more flexibility to what you can do with the frontend.


ResourceOptions:
- deleted `href`

PropertyOptions:
- deleted `custom`
- deleted `props`
- deleted `label`
- deleted `description`
- deleted `hideLabel`
- deleted `isDraggable`
- deleted `components`

Action:
- deleted `showResourceActions`
- deleted `showFilter`
- deleted `label`
- deleted `icon`
- deleted `guard`
- deleted `component`
- deleted `showInDrawer`
- deleted `hideActionHeader`
- deleted `containerWidth`
- deleted `layout`
- deleted `variant`
- deleted `parent`
- deleted `custom`

