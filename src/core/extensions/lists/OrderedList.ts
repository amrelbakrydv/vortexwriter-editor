import { Node } from '@tiptap/core'

export const VortexOrderedList = Node.create({
  name: 'orderedList',
  nameAr: 'قائمة مرتبة',

  group: 'block list',

  content: 'listItem+',

  parseHTML() {
    return [
      {
        tag: 'ol',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['ol', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      toggleOrderedList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, 'listItem')
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-9': () => this.editor.commands.toggleOrderedList(),
    }
  },
})

export default VortexOrderedList