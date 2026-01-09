import { Mark } from '@tiptap/core'

export const VortexBold = Mark.create({
  name: 'bold',

  parseHTML() {
    return [
      { tag: 'strong' },
      { tag: 'b' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['strong', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      toggleBold:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-b': () => this.editor.commands.toggleBold(),
    }
  },
})

export default VortexBold