// استيراد الامتدادات الأساسية من Tiptap v3
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'

// استيراد الامتدادات الأخرى
import { Link } from '@tiptap/extension-link'
import { CodeBlock } from '@tiptap/extension-code-block'
import { Blockquote } from '@tiptap/extension-blockquote'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TextAlign } from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Underline } from '@tiptap/extension-underline'
import { Strike } from '@tiptap/extension-strike'

// استيراد الامتدادات المخصصة الأساسية
import VortexBold from './basic/Bold'
import VortexItalic from './basic/Italic'
import VortexHeading from './basic/Heading'
import VortexParagraph from './basic/Paragraph'

// استيراد امتدادات القوائم
import VortexListItem from './lists/ListItem'
import VortexBulletList from './lists/BulletList'
import VortexOrderedList from './lists/OrderedList'

console.log('📦 Vortex Extensions: جاري تحميل امتدادات Tiptap v3...')

// دالة لتحميل الامتدادات الأساسية (الحد الأدنى)
export const getBasicExtensions = () => {
  console.log('🔄 إنشاء مصفوفة الامتدادات الأساسية')
  return [
    Document,
    Text,
    VortexParagraph,
    VortexBold,
    VortexItalic,
    VortexHeading.configure({ levels: [1, 2, 3] }),
  ]
}

// دالة لتحميل الامتدادات الموسعة (مع القوائم والروابط)
export const getExtendedExtensions = () => {
  console.log('🔄 إنشاء مصفوفة الامتدادات الموسعة')
  return [
    Document,
    Text,
    VortexParagraph,
    VortexBold,
    VortexItalic,
    VortexHeading.configure({ levels: [1, 2, 3] }),
    VortexListItem,
    VortexBulletList,
    VortexOrderedList,
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        class: 'vortex-link',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
  ]
}

// دالة جديدة لتحميل الامتدادات الكاملة (مع جميع الميزات)
export const getCompleteExtensions = () => {
  console.log('🔄 إنشاء مصفوفة الامتدادات الكاملة')
  return [
    // --- الامتدادات الأساسية (الضرورية) ---
    Document,
    Text,
    
    // --- عناصر البلوك الأساسية ---
    VortexParagraph,
    VortexHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    Blockquote.configure({
      HTMLAttributes: {
        class: 'vortex-blockquote',
      },
    }),
    CodeBlock.configure({
      languageClassPrefix: 'language-',
      HTMLAttributes: {
        class: 'vortex-code-block',
      },
    }),
    HorizontalRule.configure({
      HTMLAttributes: {
        class: 'vortex-horizontal-rule',
      },
    }),
    
    // --- الماركات (Marks) الأساسية ---
    VortexBold,
    VortexItalic,
    Underline,
    Strike,
    
    // --- الماركات المتقدمة ---
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        class: 'vortex-link',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    Color,
    Highlight.configure({ 
      multicolor: true,
      HTMLAttributes: {
        class: 'vortex-highlight',
      },
    }),
    
    // --- القوائم ---
    VortexListItem,
    VortexBulletList,
    VortexOrderedList,
    TaskList.configure({
      HTMLAttributes: {
        class: 'vortex-task-list',
      },
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'vortex-task-item',
      },
    }),
    
    // --- الجداول ---
    TableRow,
    TableCell,
    TableHeader,
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'vortex-table',
      },
    }),
    
    // --- الصور ---
    Image.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: {
        class: 'vortex-image',
      },
    }),
    
    // --- المحاذاة (يجب أن تكون في النهاية) ---
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'right',
    }),
  ]
}

// دالة لتحميل جميع الامتدادات (بأقصى إعدادات)
export const getAllExtensions = () => {
  return getCompleteExtensions()
}

// دالة خاصة للإصدار النهائي (مع كل التخصيصات)
export const getVortexEditorExtensions = () => {
  console.log('🎛️ تحميل إصدار Vortex Editor النهائي')
  return getCompleteExtensions()
}

// تصدير جميع الامتدادات بشكل منفصل
export {
  Document,
  Text,
  VortexBold,
  VortexItalic,
  VortexHeading,
  VortexParagraph,
  VortexListItem,
  VortexBulletList,
  VortexOrderedList,
  Link,
  CodeBlock,
  Blockquote,
  HorizontalRule,
  Image,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TextAlign,
  Color,
  Highlight,
  TaskList,
  TaskItem,
  Underline,
  Strike,
}