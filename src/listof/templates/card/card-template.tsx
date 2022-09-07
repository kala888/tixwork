import _ from 'lodash';
import EleCard, { EleCardMode, EleCardProps } from '@/components/elements/ele-card/ele-card';
import { isNotEmpty } from '@/utils/object-utils';

type CardTemplateItemProps = {
  documentUrl?: string;
} & EleCardProps;

type CardTemplateProps = {
  item: CardTemplateItemProps;
  mode?: EleCardMode | EleCardMode[];
};

function CardTemplate(props: CardTemplateProps) {
  const { item } = props;
  const { actionList = [], documentUrl } = item;

  // const imageUrl = ListofUtil.getImageUrl(item)
  // const hasImage = isNotEmpty(imageUrl)
  const isDocument = isNotEmpty(documentUrl);
  const extClass: any[] = _.concat(props.mode, item.mode, isDocument ? 'large' : null).filter((it) => isNotEmpty(it));

  const documentActions = isDocument
    ? [
        {
          id: 'open-document',
          type: 'open-document',
          linkToUrl: documentUrl,
          title: '查看',
        },
        {
          id: 'download-document',
          type: 'download',
          linkToUrl: documentUrl,
          title: '下载',
        },
        {
          id: 'copy-document',
          type: 'copy',
          linkToUrl: documentUrl,
          title: '复制连接',
        },
      ]
    : [];
  const cardActionList = actionList.concat(documentActions).slice(0, 4);

  return <EleCard {...item} mode={extClass} actionList={cardActionList} />;
}

CardTemplate.defaultProps = {
  items: {},
  mode: [],
};

export default CardTemplate;
