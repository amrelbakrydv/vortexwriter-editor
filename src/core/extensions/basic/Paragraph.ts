import { Node } from '@tiptap/core'

export const VortexParagraph = Node.create({
  name: 'paragraph',

  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'p' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    }
  },
})

export default VortexParagraph