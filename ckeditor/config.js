/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        { name: 'document', groups: [ 'document', 'mode', 'doctools' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'paragraph', groups: [ 'list', 'align', 'indent', 'blocks', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] },
        { name: 'forms', groups: [ 'forms' ] }
    ];

    config.removeButtons = 'NewPage,Preview,Print,Templates,PasteFromWord,Find,Replace,SelectAll,Scayt,Cut,Copy,Paste,PasteText,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,ShowBlocks,Maximize,Flash,Image,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Anchor,Language,BidiRtl,BidiLtr,CreateDiv,Indent,Outdent,CopyFormatting,Undo,Redo,Blockquote,NumberedList,Font,BGColor,JustifyBlock,Strike,Subscript,Superscript,Styles,BulletedList,Save,Source,Underline,Italic,RemoveFormat,Format';
};
