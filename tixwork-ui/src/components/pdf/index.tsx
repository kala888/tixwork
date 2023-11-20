import ObjectUtils from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { App, Button, Empty, Space, Typography } from 'antd';
import classNames from 'classnames';
import FileSaver from 'file-saver';
import _ from 'lodash';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { fetch } from 'umi-request';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.staticfile.org/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
console.log(`//cdn.staticfile.org/pdf.js/${pdfjs.version}/pdf.worker.min.js`);

type _PdfViewerType = {
  source: File | string;
  empty?: string;
  className?: any;
  download?: boolean;
};
type PdfViewerType = {
  trigger?: any;
} & _PdfViewerType;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const _PdfView = (props: _PdfViewerType) => {
  const [tips, setTips] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>();

  const { source, empty = '未能找到合适的展示文件' } = props;

  useEffect(() => {
    if (ObjectUtils.isNotEmpty(source)) {
      if (source instanceof File) {
        setFile(source);
        return;
      }
      setLoading(true);
      fetch(source, {
        method: 'get',
        // @ts-ignore
        responseType: 'arraybuffer',
      })
        // @ts-ignore
        .then((response) => response.blob())
        .then((data) => {
          const pdfFile = new File([data as any], 'pdf-view.pdf', { type: 'application/pdf' });
          setFile(pdfFile);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [source]);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setLoading(false);
  }

  const css = useEmotionCss(() => ({
    height: '70vh',
    overflow: 'scroll',
    '.pdf-content': {
      padding: 4,
      display: 'flex',
      justifyContent: 'center',
    },
    '.pdf-content-body': {
      padding: '5px 5px 0',
      background: '#eee',
      '.react-pdf__Page': {
        marginBottom: 10,
      },
      '.react-pdf__Page__canvas': {
        width: '100% !important',
        height: '100% !important',
      },
    },
  }));

  const rootCls = classNames(css, props.className);
  const extra = <Typography.Text key={'tips'}>{tips}</Typography.Text>;
  return (
    <ProCard loading={loading} extra={extra} className={rootCls}>
      <div className="pdf-content">
        {!file ? (
          <Empty description={empty} />
        ) : (
          <div className="pdf-content-body">
            <Document
              onLoadStart={() => setLoading(true)}
              onLoadError={() => {
                setLoading(false);
                setTips('PDF文件加载失败，请联系管理员');
              }}
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        )}
      </div>
    </ProCard>
  );
};

export default function PDFView(props: PdfViewerType) {
  const { modal } = App.useApp();

  const { trigger, source, ...rest } = props;

  if (!trigger) {
    return <_PdfView {...rest} source={source} />;
  }

  const disabled = _.isNil(source);

  const handleSave = () => {
    if (disabled) {
      return;
    }
    if (source instanceof File) {
      FileSaver.saveAs(source);
      return;
    }
    window.open(source);
  };
  const handleView = () => {
    if (ObjectUtils.isEmpty(props.source)) {
      return;
    }
    let modalKey: any = null;
    modalKey = modal.info({
      icon: null,
      content: <_PdfView {...rest} source={source} />,
      width: '50vw',
      footer: (
        <Space className={'modal-action-footer'}>
          <Button key={'close'} onClick={() => modalKey?.destroy()}>
            关闭
          </Button>
          <Button type={'primary'} disabled={disabled} onClick={handleSave}>
            下载
          </Button>
        </Space>
      ),
    });
  };
  return (
    <div onClick={handleView} style={{ cursor: 'pointer' }}>
      {trigger}
    </div>
  );
}
