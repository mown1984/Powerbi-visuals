//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

///<reference path="../jquery/jquery.d.ts"/>

interface NgScrollbarsConfig {
    autoScrollSize?: boolean;//default: true, automatically calculate scrollbar size depending on container/ content size 
    autoUpdate?: boolean;//(default: true) automatically update scrollbar if container/ content size is changed 
    disableBodyScroll?: boolean;//(default: false) if option enabled and mouse is over scrollable container, main page won't be scrolled 
    duration?: number//(default: 200ms) scroll speed duration when mouse is over scrollbar (scroll emulating mode)
    ignoreMobile?: boolean;//(default: true), do not initialize custom scrollbars on mobile devices 
    ignoreOverlay?: boolean;//(default: true) do not initialize custom scrollbars in browsers when native scrollbars overlay content (Mac OS, mobile devices, etc...)
    scrollStep?: number//(default: 30px) scroll step when mouse is over scrollbar (scroll emulating mode)
    showArrows?: boolean;//(default: false) add class to show scrollbar arrows in advanced scrollbar 
    stepScrolling?: boolean;//(default: true) emulate step scrolling on mousedown over scrollbar 
    type?: string;//[simple | advanced](default: simple) scrollbar HTML structure type.Is not used for custom scrollx/ scrolly element 
    scrollx?: any;//(default: null) custom HTML structure or element for horizontal scrollbar 
    scrolly?: any;//(default: null) custom HTML structure or element for vertical scrollbar 
    onDestroy?: () => void; //(default: null) callback function when scrollbar is destroyed 
    onInit?: () => void; //(default: null) callback function when scrollbar is initialized first time 
    onScroll?: () => void; //(default: null) callback function when cotnainer is scrolled 
    onUpdate?: () => void; //(default: null) callback function before scrollbars size calculated 

}

interface JQuery {
    scrollbar: (ngScrollbarsConfig?: NgScrollbarsConfig) => JQuery;
}