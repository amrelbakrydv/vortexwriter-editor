import { Node } from '@tiptap/core'

export const VortexBulletList = Node.create({
  name: 'bulletList',
  nameAr: 'قائمة نقطية',

  group: 'block list',

  content: 'listItem+',

  parseHTML() {
    return [
      {
        tag: 'ul',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['ul', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      toggleBulletList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, 'listItem')
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-8': () => this.editor.commands.toggleBulletList(),
    }
  },
})

export default VortexBulletList