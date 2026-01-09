import { Mark } from '@tiptap/core'

export const VortexItalic = Mark.create({
  name: 'italic',

  parseHTML() {
    return [
      { tag: 'em' },
      { tag: 'i' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['em', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      toggleItalic:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-i': () => this.editor.commands.toggleItalic(),
    }
  },
})

export default VortexItalic