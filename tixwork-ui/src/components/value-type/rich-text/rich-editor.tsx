import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

export type RichEditorType = {
  value?: string;
  className?: any;
  onChange?: (value: string) => void;
  readonly?: boolean;
  contentStyle?: string;
  convertValue?: (value: string) => string;
};

const script = 'https://tixwork.oss-cn-chengdu.aliyuncs.com/tinymce/tinymce.min.js';

function RichEditor(props: RichEditorType, ref) {
  const editorRef = useRef<any>();
  const { convertValue, contentStyle, readonly, className, value, onChange } = props;
  const [content, setContent] = useState(value ?? '');

  useEffect(() => {
    console.log('vvvvvvvv', value);
    setContent(value ?? '');
  }, [value]);

  const css = useEmotionCss(() => ({
    width: '100%',
    '.tox-editor-header': {
      display: readonly ? 'none !important' : 'unset',
    },
  }));

  const getContent = () => {
    let html = editorRef.current.getContent();
    if (convertValue) {
      html = convertValue(html);
    }
    return html;
  };

  const handleChange = () => {
    let html = getContent();
    onChange?.(html);
  };
  const rootClz = classNames('rich-editor', className, css);

  React.useImperativeHandle(ref, () => ({
    getContent,
  }));

  return (
    <div className={rootClz}>
      <Editor
        disabled={readonly}
        initialValue={value}
        value={content}
        onBlur={handleChange}
        onEditorChange={(v) => setContent(v)}
        onInit={(__, editor) => (editorRef.current = editor)}
        tinymceScriptSrc={script}
        init={{
          language: 'zh-Hans', //注意大小写
          height: 300,
          width: '100%',
          plugins: [
            'preview',
            'autosave',
            'code',
            'fullscreen',
            'table',
            'pagebreak',
            'advlist',
            'lists',
            'wordcount',
            'quickbars',
            'searchreplace',
          ],
          extended_valid_elements: 'header,body',
          editimage_cors_hosts: ['picsum.photos'],
          element_format: 'xhtml',
          menubar: false,
          branding: false, //去掉tinymce的水印
          // toolbar:'',
          toolbar:
            'undo redo | fontsize forecolor bold italic underline strikethrough|newLine outdent indent lineheight align numlist bullist |pagebreak table  removeformat| charmap emoticons | preview searchreplace code',
          pagebreak_split_block: true,
          pagebreak_separator: `<div style="page-break-after: always"></div>`,
          quickbars_selection_toolbar: false,
          quickbars_insert_toolbar: false,
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          content_style: contentStyle,
          font_size_formats:
            '8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 24pt 28pt 32pt 36pt 40pt 44pt 48pt 52pt 56pt 72pt',
          line_height_formats: '1 1.2 1.4 1.6 2 2.5 3',
          formats: {
            underline: {
              inline: 'span',
              styles: {
                padding: '0 4px 2px',
                borderBottom: '1px solid #666',
              },
            },
          },
          setup: function (editor) {
            // 创建一个自定义按钮
            editor.ui.registry.addButton('newLine', {
              tooltip: '首行缩进', // 按钮上显示的文本
              icon: 'ltr',
              onAction: function () {
                const selectedText = editor.selection.getContent();
                const indentedText = '<div style="text-indent: 2em;">' + selectedText + '</div>';
                editor.selection.setContent(indentedText);
              },
            });
          },
        }}
      />
    </div>
  );
}

export default React.forwardRef(RichEditor);
