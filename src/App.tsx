import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { getVortexEditorExtensions } from './core/extensions'

console.log('🚀 App.tsx: جاري تحميل مع امتدادات Vortex الكاملة')

function App() {
  console.log('🎯 App component: بدء التصيير')
  
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [selectedHighlight, setSelectedHighlight] = useState('#FFFF00')
  
  let extensions
  try {
    extensions = getVortexEditorExtensions()
  } catch (err: any) {
    console.error('❌ فشل تحميل امتدادات Vortex:', err)
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-white p-6 rounded shadow max-w-2xl">
          <h2 className="text-lg font-bold mb-2">خطأ في تحميل امتدادات المحرر</h2>
          <p className="text-sm text-gray-700 mb-4">تحقق من تبعيات الحزم أو سجل الأخطاء في الطرفية (F12).</p>
          <pre className="text-xs text-red-600 whitespace-pre-wrap">{String(err && err.stack ? err.stack : err)}</pre>
        </div>
      </div>
    )
  }

  const editor = useEditor({
    extensions,
    content: `
      <h1 style="text-align: center;">🚀 VortexWriter - المحرر المتكامل 🌀</h1>
      
      <p style="text-align: center;">هذا هو المحرر <strong>الأكثر تطوراً</strong> مع جميع الميزات الأساسية والمتقدمة.</p>
      
      <h2>🎨 تنسيقات النصوص:</h2>
      <p>يمكنك تجربة: <strong>نص غامق</strong>, <em>نص مائل</em>, <u>نص مسطر</u>, <s>نص مشطوب</s>.</p>
      
      <h2>📋 القوائم:</h2>
      <ul>
        <li>قائمة نقطية</li>
        <li>عنصر ثاني</li>
      </ul>
      
      <ol>
        <li>قائمة مرقمة</li>
        <li>عنصر ثاني</li>
      </ol>
      
      <h2>✅ قائمة المهام:</h2>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true">مهمة مكتملة ✓</li>
        <li data-type="taskItem" data-checked="false">مهمة غير مكتملة</li>
      </ul>
      
      <h2>🔗 الروابط:</h2>
      <p>رابط لـ <a href="https://vortexwriter.com" target="_blank" rel="noopener noreferrer" class="vortex-link">VortexWriter</a></p>
      
      <h2>💻 كود:</h2>
      <pre><code class="language-javascript">function hello() {
  console.log('مرحباً بالعالم!');
}</code></pre>
      
      <h2>💬 اقتباس:</h2>
      <blockquote class="vortex-blockquote">هذا نص مقتبس للمثال مع تنسيق خاص</blockquote>
      
      <hr class="vortex-horizontal-rule">
      
      <h2>📊 جدول:</h2>
      <table class="vortex-table">
        <thead>
          <tr>
            <th>العمود 1</th>
            <th>العمود 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>خلية 1</td>
            <td>خلية 2</td>
          </tr>
          <tr>
            <td>خلية 3</td>
            <td>خلية 4</td>
          </tr>
        </tbody>
      </table>
      
      <h2>🎨 تظليل النص:</h2>
      <p>هذا نص <mark class="vortex-highlight" style="background-color: yellow;">مظلل باللون الأصفر</mark> للمثال.</p>
    `,
    onUpdate({ editor }) {
      console.log('📝 تم تحديث المحتوى:', editor.getHTML().substring(0, 100))
    },
    onCreate({ editor }) {
      console.log('✅ تم إنشاء المحرر بنجاح!')
      console.log('🔧 عدد الامتدادات:', editor.extensionManager.extensions.length)
      console.log('🎯 الأوامر المتاحة:', Object.keys(editor.commands))
    },
  })

  console.log('🎯 حالة المحرر بعد useEditor:', editor ? '✅ موجود' : '❌ غير موجود')

  if (!editor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-5xl mb-6 animate-pulse">🌀</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">VortexWriter v3</h1>
          <p className="text-gray-600 mb-4">جاري تهيئة المحرر المتقدم...</p>
          <div className="space-y-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-sm text-gray-500">جاري تحميل جميع امتدادات Tiptap v3</p>
          </div>
        </div>
      </div>
    )
  }

  // --- دوال المعالجة ---
  
  const handleSave = () => {
    const html = editor.getHTML()
    const text = editor.getText()
    
    console.log('💾 حفظ المحتوى:', {
      htmlLength: html.length,
      textLength: text.length,
      preview: html.substring(0, 200)
    })
    
    alert(`تم الحفظ!\n\nعدد الأحرف: ${text.length}\nعدد الكلمات: ${text.split(' ').length}\n\nعرض HTML في Console (F12)`)
  }

  const handleClear = () => {
    if (confirm('هل تريد مسح كل المحتوى؟ سيتم فقدان جميع البيانات.')) {
      editor.chain().focus().clearContent().run()
    }
  }

  const handleInsertImage = () => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setShowImageModal(false)
    }
  }

  const handleInsertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const handleTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run()
    setSelectedColor(color)
    setShowColorPicker(false)
  }

  const handleHighlight = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run()
    setSelectedHighlight(color)
    setShowHighlightPicker(false)
  }

  const handleTableAction = (action: string) => {
    switch(action) {
      case 'addColumnBefore':
        editor.chain().focus().addColumnBefore().run()
        break
      case 'addColumnAfter':
        editor.chain().focus().addColumnAfter().run()
        break
      case 'deleteColumn':
        editor.chain().focus().deleteColumn().run()
        break
      case 'addRowBefore':
        editor.chain().focus().addRowBefore().run()
        break
      case 'addRowAfter':
        editor.chain().focus().addRowAfter().run()
        break
      case 'deleteRow':
        editor.chain().focus().deleteRow().run()
        break
      case 'deleteTable':
        editor.chain().focus().deleteTable().run()
        break
      case 'mergeCells':
        editor.chain().focus().mergeCells().run()
        break
      case 'splitCell':
        editor.chain().focus().splitCell().run()
        break
      case 'toggleHeaderColumn':
        editor.chain().focus().toggleHeaderColumn().run()
        break
      case 'toggleHeaderRow':
        editor.chain().focus().toggleHeaderRow().run()
        break
      case 'toggleHeaderCell':
        editor.chain().focus().toggleHeaderCell().run()
        break
      default:
        console.log('Action not supported:', action)
    }
  }

  // --- الألوان المحددة مسبقًا ---
  const colorPresets = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#4A90E2', '#50E3C2', '#B8E986', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#D0021B', '#F5A623', '#8B572A'
  ]

  const highlightPresets = [
    '#FFFF00', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD',
    '#FFB6C1', '#F0E68C', '#E6E6FA', '#D3D3D3', '#FFA07A',
    '#FFEB3B', '#FFC107', '#8BC34A', '#03A9F4', '#9C27B0',
    '#E91E63', '#FF5722', '#795548', '#607D8B', '#9E9E9E'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            <span className="inline-block animate-[spin_3s_linear_infinite]">🌀</span> VortexWriter Pro
          </h1>
          <p className="text-lg text-gray-700">محرر متكامل مع <span className="font-semibold text-blue-600">جميع الميزات الأساسية</span></p>
          <div className="mt-2 flex justify-center flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Tiptap v3</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">21+ امتداد</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">React 18</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">TypeScript</span>
          </div>
        </div>

        {/* Editor Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200">
          {/* Enhanced Toolbar */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-4 flex flex-wrap gap-3 items-center">
            
            {/* المجموعة 1: تنسيقات النصوص الأساسية */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('bold') 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'}`}
                title="نص غامق (Ctrl+B)"
              >
                <span className="font-bold">ب</span>
                <span className="hidden sm:inline">غامق</span>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('italic') 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'}`}
                title="نص مائل (Ctrl+I)"
              >
                <span className="italic">م</span>
                <span className="hidden sm:inline">مائل</span>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('underline') 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'}`}
                title="نص مسطر (Ctrl+U)"
              >
                <span className="underline">س</span>
                <span className="hidden sm:inline">مسطر</span>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('strike') 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'}`}
                title="نص مشطوب"
              >
                <span className="line-through">ش</span>
                <span className="hidden sm:inline">مشطوب</span>
              </button>

              <div className="w-px h-8 bg-gray-300 mx-1"></div>
            </div>

            {/* المجموعة 2: العناوين والفقرات */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('heading', { level: 1 }) 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300 hover:text-green-600 hover:shadow-md'}`}
                title="عنوان رئيسي (Ctrl+Alt+1)"
              >
                <span className="font-bold">H1</span>
                <span className="hidden sm:inline">عنوان 1</span>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('heading', { level: 2 }) 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300 hover:text-green-600 hover:shadow-md'}`}
                title="عنوان فرعي (Ctrl+Alt+2)"
              >
                <span className="font-bold">H2</span>
                <span className="hidden sm:inline">عنوان 2</span>
              </button>
              
              <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('paragraph') 
                  ? 'bg-gray-600 text-white shadow-lg shadow-gray-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800 hover:shadow-md'}`}
                title="فقرة عادية (Ctrl+Alt+0)"
              >
                <span>¶</span>
                <span className="hidden sm:inline">فقرة</span>
              </button>

              <div className="w-px h-8 bg-gray-300 mx-1"></div>
            </div>

            {/* المجموعة 3: القوائم */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('bulletList') 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 hover:shadow-md'}`}
                title="قائمة نقطية (Ctrl+Shift+8)"
              >
                <span>•</span>
                <span className="hidden sm:inline">نقطية</span>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('orderedList') 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 hover:shadow-md'}`}
                title="قائمة مرتبة (Ctrl+Shift+9)"
              >
                <span>1.</span>
                <span className="hidden sm:inline">مرقمة</span>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('taskList') 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 hover:shadow-md'}`}
                title="قائمة مهام"
              >
                <span>✓</span>
                <span className="hidden sm:inline">مهام</span>
              </button>

              <div className="w-px h-8 bg-gray-300 mx-1"></div>
            </div>

            {/* المجموعة 4: المحاذاة */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive({ textAlign: 'left' }) 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-orange-300 hover:text-orange-600 hover:shadow-md'}`}
                title="محاذاة لليسار"
              >
                <span>←</span>
                <span className="hidden sm:inline">يسار</span>
              </button>

              <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive({ textAlign: 'center' }) 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-orange-300 hover:text-orange-600 hover:shadow-md'}`}
                title="محاذاة للوسط"
              >
                <span>↔</span>
                <span className="hidden sm:inline">وسط</span>
              </button>

              <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive({ textAlign: 'right' }) 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-orange-300 hover:text-orange-600 hover:shadow-md'}`}
                title="محاذاة لليمين"
              >
                <span>→</span>
                <span className="hidden sm:inline">يمين</span>
              </button>

              <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive({ textAlign: 'justify' }) 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-orange-300 hover:text-orange-600 hover:shadow-md'}`}
                title="محاذاة كاملة"
              >
                <span>⇔</span>
                <span className="hidden sm:inline">كاملة</span>
              </button>

              <div className="w-px h-8 bg-gray-300 mx-1"></div>
            </div>

            {/* المجموعة 5: الألوان والتظليل */}
            <div className="flex flex-wrap gap-2">
              {/* Color Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-pink-300 hover:text-pink-600 hover:shadow-md"
                  title="لون النص"
                >
                  <span style={{ color: selectedColor }}>A</span>
                  <span className="hidden sm:inline">لون</span>
                </button>
                
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl p-4 z-50 w-64">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">اختر لون النص:</label>
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleTextColor(e.target.value)}
                        className="w-full h-10 cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {colorPresets.map(color => (
                        <button
                          key={color}
                          onClick={() => handleTextColor(color)}
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        editor.chain().focus().unsetColor().run()
                        setShowColorPicker(false)
                      }}
                      className="mt-3 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                    >
                      إزالة اللون
                    </button>
                  </div>
                )}
              </div>

              {/* Highlight Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowHighlightPicker(!showHighlightPicker)}
                  className="px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-yellow-300 hover:text-yellow-600 hover:shadow-md"
                  title="تظليل النص"
                >
                  <span style={{ backgroundColor: selectedHighlight, color: '#000' }}>T</span>
                  <span className="hidden sm:inline">تظليل</span>
                </button>
                
                {showHighlightPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl p-4 z-50 w-64">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">اختر لون التظليل:</label>
                      <input
                        type="color"
                        value={selectedHighlight}
                        onChange={(e) => handleHighlight(e.target.value)}
                        className="w-full h-10 cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {highlightPresets.map(color => (
                        <button
                          key={color}
                          onClick={() => handleHighlight(color)}
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        editor.chain().focus().unsetHighlight().run()
                        setShowHighlightPicker(false)
                      }}
                      className="mt-3 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                    >
                      إزالة التظليل
                    </button>
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-gray-300 mx-1"></div>
            </div>

            {/* المجموعة 6: إدراج عناصر */}
            <div className="flex flex-wrap gap-2">
              {/* Link Button */}
              <button
                onClick={() => {
                  const url = window.prompt('أدخل رابط URL:', 'https://')
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run()
                  }
                }}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('link') 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md'}`}
                title="إضافة رابط (Ctrl+K)"
              >
                <span>🔗</span>
                <span className="hidden sm:inline">رابط</span>
              </button>

              <button
                onClick={() => editor.chain().focus().unsetLink().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${!editor.isActive('link') 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-300'}`}
                title="إزالة الرابط"
                disabled={!editor.isActive('link')}
              >
                <span>❌</span>
                <span className="hidden sm:inline">إزالة</span>
              </button>

              {/* Image Button */}
              <button
                onClick={() => setShowImageModal(true)}
                className="px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300 hover:text-green-600 hover:shadow-md"
                title="إدراج صورة"
              >
                <span>🖼️</span>
                <span className="hidden sm:inline">صورة</span>
              </button>

              {/* Table Button */}
              <div className="relative">
                <button
                  onClick={handleInsertTable}
                  className="px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                  title="إدراج جدول"
                >
                  <span>📊</span>
                  <span className="hidden sm:inline">جدول</span>
                </button>
                
                {editor.isActive('table') && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl p-3 z-50 w-48">
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleTableAction('addColumnBefore')} className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded">+ عمود قبل</button>
                      <button onClick={() => handleTableAction('addColumnAfter')} className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded">+ عمود بعد</button>
                      <button onClick={() => handleTableAction('deleteColumn')} className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded">حذف عمود</button>
                      <button onClick={() => handleTableAction('addRowBefore')} className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 rounded">+ صف قبل</button>
                      <button onClick={() => handleTableAction('addRowAfter')} className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 rounded">+ صف بعد</button>
                      <button onClick={() => handleTableAction('deleteRow')} className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded">حذف صف</button>
                      <button onClick={() => handleTableAction('deleteTable')} className="px-2 py-1 text-xs bg-red-500 text-white hover:bg-red-600 rounded col-span-2">حذف الجدول</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Code Block Button */}
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('codeBlock') 
                  ? 'bg-gray-800 text-white shadow-lg shadow-gray-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800 hover:shadow-md'}`}
                title="كتلة كود (Ctrl+Alt+C)"
              >
                <span>{"</>"}</span>
                <span className="hidden sm:inline">كود</span>
              </button>

              {/* Blockquote Button */}
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${editor.isActive('blockquote') 
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-yellow-300 hover:text-yellow-600 hover:shadow-md'}`}
                title="اقتباس"
              >
                <span>❝</span>
                <span className="hidden sm:inline">اقتباس</span>
              </button>

              {/* Horizontal Rule Button */}
              <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800 hover:shadow-md"
                title="فاصل أفقي"
              >
                <span>―</span>
                <span className="hidden sm:inline">فاصل</span>
              </button>
            </div>

            {/* المجموعة 7: إدارة المستند */}
            <div className="ml-auto flex gap-2">
              <button
                onClick={handleClear}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors border border-gray-300 flex items-center gap-2"
              >
                <span>🗑️</span>
                <span className="hidden sm:inline">مسح</span>
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
              >
                <span>💾</span>
                <span>حفظ</span>
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="p-6">
            <EditorContent 
              editor={editor} 
              className="min-h-[600px] focus:outline-none prose prose-lg max-w-none vortex-editor-content"
            />
          </div>

          {/* Status Bar */}
          <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-medium">✅ جميع الامتدادات تعمل</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Ctrl+B</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Ctrl+I</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Ctrl+Alt+1</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">Ctrl+K</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="font-bold text-gray-800">{editor.getText().length}</div>
                <div className="text-xs text-gray-500">حرف</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">{editor.getText().split(' ').length}</div>
                <div className="text-xs text-gray-500">كلمة</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">{editor.state.doc.content.childCount}</div>
                <div className="text-xs text-gray-500">فقرة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إدراج صورة</h3>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleInsertImage}
                  className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  disabled={!imageUrl.trim()}
                >
                  إدراج
                </button>
                <button
                  onClick={() => {
                    setShowImageModal(false)
                    setImageUrl('')
                  }}
                  className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  إلغاء
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                تلميح: يمكنك أيضاً سحب وإفلات الصورة مباشرة في المحرر
              </p>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
            <div className="text-3xl mb-4 text-blue-600">🎨</div>
            <h3 className="font-bold text-gray-800 mb-2">تنسيقات النصوص</h3>
            <p className="text-gray-600 text-sm">غامق، مائل، مسطر، مشطوب، ألوان، تظليل، ومحاذاة كاملة للنصوص.</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6">
            <div className="text-3xl mb-4 text-green-600">📋</div>
            <h3 className="font-bold text-gray-800 mb-2">القوائم المتقدمة</h3>
            <p className="text-gray-600 text-sm">قوائم نقطية، مرقمة، وقوائم مهام تفاعلية مع خاصية التحديد.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6">
            <div className="text-3xl mb-4 text-purple-600">🖼️</div>
            <h3 className="font-bold text-gray-800 mb-2">الوسائط والجداول</h3>
            <p className="text-gray-600 text-sm">إدراج الصور، الجداول المتقدمة، الروابط، والفواصل الأفقية.</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-6">
            <div className="text-3xl mb-4 text-orange-600">💻</div>
            <h3 className="font-bold text-gray-800 mb-2">الكود والاقتباسات</h3>
            <p className="text-gray-600 text-sm">كتل كود مع تلوين الصياغة، اقتباسات مميزة، وعناوين متعددة المستويات.</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚀 جاهز للمرحلة التالية!</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-lg font-semibold text-blue-600 mb-2">بناء الواجهة</div>
              <p className="text-sm text-gray-600">إنشاء مجلد <code>src/ui/</code> للمكونات المنفصلة</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-lg font-semibold text-green-600 mb-2">إضافة المزيد</div>
              <p className="text-sm text-gray-600">امتدادات إضافية مثل subscript، superscript، placeholder</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-lg font-semibold text-purple-600 mb-2">تحسينات الأداء</div>
              <p className="text-sm text-gray-600">تحسين bundle size، إضافة lazy loading</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-lg font-semibold text-orange-600 mb-2">الخطوة التالية</div>
              <p className="text-sm text-gray-600">بناء واجهة React المنفصلة وتحسين التنظيم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App