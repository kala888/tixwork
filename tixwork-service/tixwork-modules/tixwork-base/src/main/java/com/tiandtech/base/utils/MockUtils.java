package com.tiandtech.base.utils;

import cn.hutool.core.util.RandomUtil;
import com.tiandtech.base.domain.dto.EleObject;

/**
 * 简单的Mock数据生成
 */
public class MockUtils {

    /**
     * 默认图片
     *
     * @return
     */
    public static String defaultImage() {
        return SIMPLE_IMAGES[0];
    }

    /**
     * 所以一张图片
     *
     * @return
     */
    public static String image() {
        return RandomUtil.randomEle(SIMPLE_IMAGES);
    }

    /**
     * 随机一个头像
     *
     * @return
     */
    public static String avatar() {
        return RandomUtil.randomEle(AVATAR_IMAGES);
    }

    /**
     * 随机一个名字
     *
     * @return
     */
    public static String userName() {
        return RandomUtil.randomEle(LAST_NAME) + RandomUtil.randomEle(FIRST_NAME);
    }

    /**
     * 随机一个Title和对应的Brief
     *
     * @return
     */
    public static EleObject titleBrief() {
        return RandomUtil.randomEle(TITLE_BRIEF);
    }


    public static String brief() {
        return RandomUtil.randomEle(SHORT_BRIEF);
    }

    public static String nickName() {
        return RandomUtil.randomEle(NICK_NAME);
    }


    private final static String[] SIMPLE_IMAGES = {
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg",
    };

    private final static String[] AVATAR_IMAGES = {
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg",
        "https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg",
    };
    private final static String[] FIRST_NAME = {
        "奕辰", "宇轩", "子墨", "浩然", "一诺", "子涵", "可欣", "梦瑶",
        "飞", "三", "磊", "伟", "丽", "敏", "静", "洋",
        "秀英", "建国", "铁蛋", "长海"
    };

    private final static String[] LAST_NAME = {
        "李", "王", "张", "刘", "陈", "杨", "黄", "赵", "周", "吴",
        "阿不力孜•", "迪丽热巴•", "阿卜杜拉•",
    };


    private final static String[] NICK_NAME = {
        "最浪漫的事", "善待自己", "掩耳盗铃", "非诚勿扰", "forever love", "最佳隐身奖", "含笑半步颠", "追忆年华似水",
        "你是我生命里的一首歌", "回到最初", "冰河时代", "北极以北", "为你付出一切", "ら用生命回忆从前", "対你、眞綪", "嬞鍀硪ｄｅ愛", "Darling",
        "┏有你我就幸福┛", "愛笑旳眼睛", "非祢⒏嫁", "蹲墙角丶画圏", "化思念为星。", "┗从未爱过、谈何分离┓", "请ń陪wǒ走", "爱丽丝的旋律",
        "莫气少年穷", "莫再执迷不悟", "一切皆有可能", "忧思难忘", "只想要你陪", "战争与玫瑰", "短暫旳吿別", "等迩宛在水中央",
        "不要迷恋爷，爷会让你中邪", "人一定要靠自己", "青春路上、我们一起笑", "丶谢谢你给的幸福", "十指连心", "沧海一声笑", "爱与恨",
        "时光静好", "傾尽一生丶等伱つ", "覆水难收 ζ", "杞人忧天", "相依°-相随", "别无所求", "@愛如空氣@", "爱苦但亦甜", "知足是福",
        "心中有曲自然嗨", "下一站゛幸福", "只为尔沉醉╮", "我会一直等你", "為你鐘情", "此生不换的执着", "涐のloveシ伱", "艰难爱情", "真爱永存",
        "苦尽甘来", "冷暖两心知", "許╮一世安逸", "初音未来", "醉卧红尘", "百里卖麦秸", "街角·陪伴你", "时光￠很短暂", "柏拉圖的永恒",
        "难以抗拒づ", "只属于我们美好の未来", "人生如梦、似水流年",
    };

    private final static String[] SHORT_BRIEF = {
        "管理员",
        "纯情主播",
        "成人雨衣半透明，粉色佳人",
        "真五常稻花香香米",
        "美国众议长称第四轮经济救助计划至少1万亿美元",
        "欢迎打赏人气主播",
        "少女风，直播中。。。。",
        "关注我，嗯嗯嗯",
    };
    private final static EleObject[] TITLE_BRIEF = {
        new EleObject("华为 P40 Pro+ 的十倍光变是怎样实现的？",
            "从过去的数字变焦、混合变焦，再到今天的光学变焦，手机的远摄能力正如它们的性能一样在不停变化"),
        new EleObject("我退役了，要专注练习龙吸水", "退役专注龙吸水！“田径泥石流”张国伟的沙雕日常"),
        new EleObject("《你好，李焕英》",
            "影片根据同名小品及贾玲亲身经历改编，片名中的李焕英是贾玲已故的母亲，电影讲述女演员贾晓玲在经历“子欲养而亲不待”的悲痛后，穿越时空回到过去，触摸年轻的父母和他们的梦想的故事"),
        new EleObject("《多力特的奇幻冒险》BD中英双字幕",
            "失去妻子后的7年中，约翰·杜立德医生把自己关在庄园里与动物相伴。当时年轻的女王身患重病，杜立德医生不情愿出门冒险，前往神秘的岛屿寻找治疗方法，这让他重获勇气和智慧，因为他击败了老对手，还发现了奇妙的新生物。"),
        new EleObject("始动/启动/青春催落去(台)",
            "离家出走的叛逆儿泽日（朴正民饰）与盲目踏入社会并满腔热血的尚弼（丁海寅饰），在遇见长风饭馆的厨师长猛男哥（马东锡饰）后，让自己明白了什么是世间愉快与开心的故事。"),
    };


}
