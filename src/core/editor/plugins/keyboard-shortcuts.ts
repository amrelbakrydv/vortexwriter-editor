import { Extension } from '@tiptap/core'

// اختصارات لوحة المفاتيح المخصصة
export const KeyboardShortcuts = Extension.create({
  name: 'keyboardShortcuts',

  addKeyboardShortcuts() {
    return {
      // اختصارات عربية
      'Mod-b': () => this.editor.commands.toggleBold(),
      'Mod-i': () => this.editor.commands.toggleItalic(),
      
      // اختصارات للعناوين
      'Mod-Alt-1': () => this.editor.commands.toggleHeading({ level: 1 }),
      'Mod-Alt-2': () => this.editor.commands.toggleHeading({ level: 2 }),
      'Mod-Alt-3': () => this.editor.commands.toggleHeading({ level: 3 }),
      
      // اختصار للفقرة العادية
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    }
  },
})

// تصدير افتراضي أيضاً
export default KeyboardShortcuts