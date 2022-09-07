// import Listof from '@/listof/listof';
// import { useAjaxPullDown, usePageTitle } from '@/service/use-service';
// import { View } from '@tarojs/components';
// import { useSelector } from 'react-redux';
//
// import './home.scss';
// import ServerImage from '@/server-image/server-image';
// import NavigationBox from '@/components/navigation/navigation-box';
// import NavigationService from '@/nice-router/navigation-service';
// import EleTabs from '@/components/elements/ele-tabs';
// import ApiConfig from '@/utils/api-config';
// import EleCarousel from '@/components/elements/ele-carousel';
//
// const defaultList = [
//   {
//     id: '10001',
//     title: '申请成都市新都区产业人才奖励办事指南',
//     brief:
//       '从2017年1月1日后新引进我区企业工作的人才（不包括国有企业人才、企业化管理的事业单 位引进从业人才、企业内部调整调动进入的人才）可按规定申请补贴。',
//   },
//   {
//     id: '10002',
//     title: '申请成都市新都区服务型制造平台补助奖励补助办事指南',
//     brief: '经认定的国家、省、市服务型制造平翎号的服务型制造平台。\n2021-07-01',
//     imageUrl: 'https://tiandtech.oss-cn-chengdu.aliyuncs.com/policy/policy-1.png',
//     displayMode: 'big-card',
//   },
//   { id: '10003', title: '申请成都市新都区服务型制造平台补助奖励补助办事指南', brief: '2021-07-01' },
// ];
//
// const ActionList = [
//   {
//     id: '4',
//     code: 'FINE_DECORATION',
//     icon: 'icon_view',
//     title: '我要查政策',
//     onClick: () => {
//       NavigationService.goPage('/pages/search/search-page', { search: '新都' });
//     },
//   },
//   {
//     id: '3',
//     code: 'BIZ_CHAIN',
//     icon: 'bizfont-docs',
//     title: '热门政策',
//     onClick: () => {
//       NavigationService.goPage('/pages/search/search-page', { search: '热门' });
//     },
//   },
// ];
//
// const defaultSlideList = [
//   { id: 1, imageUrl: 'https://tiandtech.oss-cn-chengdu.aliyuncs.com/policy/bg-1.jpg' },
//   { id: 1, imageUrl: 'https://tiandtech.oss-cn-chengdu.aliyuncs.com/policy/bg-2.jpg' },
//   { id: 1, imageUrl: 'https://tiandtech.oss-cn-chengdu.aliyuncs.com/policy/bg-3.jpg' },
// ];
//
// function HomePage(props) {
//   // @ts-ignore
//   const root = useSelector((state) => state.home);
//   usePageTitle(root);
//   useAjaxPullDown(props);
//
//   const handleSearchClick = () => {
//     NavigationService.goPage('/pages/search/search-page', { search: '热门政策' });
//   };
//
//   const { items = defaultList, slideList = defaultSlideList } = root;
//
//   const handleItemClick = (item) => {
//     NavigationService.goPage('/pages/policy/policy-detail-page', { id: item.id });
//   };
//
//   return (
//     <View className='home-page'>
//       <View className='home-header'>
//         <ServerImage
//           src='https://tiandtech.oss-cn-chengdu.aliyuncs.com/policy/header-bg.png'
//           className='home-header-bg'
//         />
//         <View className='home-header-search' onClick={handleSearchClick}>
//           <View className='home-header-search-icon'>搜索</View>
//         </View>
//       </View>
//       <NavigationBox items={ActionList} className='action-floor' />
//
//       <EleCarousel className='home-page-carousel' items={slideList} />
//
//       <View className='policy-list'>
//         <EleTabs
//           tabs={[
//             {
//               title: '最新政策',
//               id: '1',
//               selected: true,
//               onClick: () => NavigationService.ajax(ApiConfig.FooterHome, { search: '新都' }),
//             },
//             {
//               title: '最新补贴',
//               id: '2',
//               onClick: () => NavigationService.ajax(ApiConfig.FooterHome, { search: '新都' }),
//             },
//           ]}
//         />
//         <Listof items={items} displayMode='card' onItemClick={handleItemClick} />
//       </View>
//     </View>
//   );
// }
//
// export default HomePage;
